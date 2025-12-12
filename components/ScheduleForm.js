import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ScheduleForm({ editSchedule, setEditSchedule, onSave }) {
  const [className, setClassName] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const availableDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    if (editSchedule) {
      setClassName(editSchedule.className);
      setTime(editSchedule.time);
      setDays(editSchedule.days || []);
    }
  }, [editSchedule]);

  const handleDayToggle = (day) => {
    if (days.includes(day)) setDays(days.filter(d => d !== day));
    else setDays([...days, day]);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowPicker(Platform.OS === "ios"); // keep open on iOS
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    }
  };

  const handleSubmit = async () => {
    if (!className || !time || days.length === 0) {
      alert("Please fill all fields and select at least one day.");
      return;
    }

    try {
      if (editSchedule) {
        const scheduleRef = doc(db, "schedules", editSchedule.id);
        await updateDoc(scheduleRef, { className, time, days });
        setEditSchedule(null);
        alert("Class updated!");
      } else {
        await addDoc(collection(db, "schedules"), { className, time, days, createdAt: new Date() });
        alert("Class added!");
      }

      setClassName("");
      setTime("");
      setDays([]);
      if (onSave) onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ padding: 16, backgroundColor: "#fff", borderRadius: 8, marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {editSchedule ? "Edit Class" : "Add Class"}
      </Text>

      <Text>Class Name:</Text>
      <TextInput
        value={className}
        onChangeText={setClassName}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12, borderRadius: 4 }}
      />

      <Text>Class Time:</Text>

      {Platform.OS === "web" ? (
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ border: "1px solid #ccc", padding: 8, marginBottom: 12, borderRadius: 4 }}
        />
      ) : (
        <View style={{ marginBottom: 12 }}>
          <Button title={time || "Select Time"} onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
      )}

      <Text>Select Days:</Text>
      {availableDays.map(day => (
        <Pressable
          key={day}
          onPress={() => handleDayToggle(day)}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#333",
              marginRight: 8,
              backgroundColor: days.includes(day) ? "#4f46e5" : "transparent"
            }}
          />
          <Text>{day}</Text>
        </Pressable>
      ))}

      <Button title={editSchedule ? "Update Class" : "Add Class"} onPress={handleSubmit} />
      {editSchedule && <Button title="Cancel" color="gray" onPress={() => setEditSchedule(null)} />}
    </ScrollView>
  );
}
