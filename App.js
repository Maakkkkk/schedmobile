import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ScheduleForm from "./components/ScheduleForm";
import ScheduleList from "./components/ScheduleList";

export default function App() {
  const [editSchedule, setEditSchedule] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ScheduleForm editSchedule={editSchedule} setEditSchedule={setEditSchedule} />
        <ScheduleList setEditSchedule={setEditSchedule} />
      </ScrollView>
    </SafeAreaView>
  );
}
