import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ScheduleList({ setEditSchedule }) {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "schedules"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSchedules(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Delete Class", "Are you sure you want to delete this class?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: async () => await deleteDoc(doc(db, "schedules", id)) }
    ]);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Your Schedule</Text>
      <FlatList
        data={schedules}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8, borderRadius: 4 }}>
            <Text style={{ fontWeight: "bold" }}>Class Name: {item.className}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Days: {item.days?.join(", ")}</Text>
            <View style={{ flexDirection: "row", marginTop: 8, gap: 8 }}>
              <Button title="Edit" onPress={() => setEditSchedule(item)} color="#facc15" />
              <Button title="Delete" onPress={() => handleDelete(item.id)} color="#ef4444" />
            </View>
          </View>
        )}
      />
    </View>
  );
}
