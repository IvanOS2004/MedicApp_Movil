import { router, Stack } from "expo-router";
import { ArrowLeft, Calendar } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DoctorAppointmentCard from "../../../components/doctorAppointmentCard";
import DoctorBottomNavigation from "../../../components/doctorBottomNavigation";

export default function DoctorSolicitudes() {
  const [activeTab, setActiveTab] = useState("home");

  // 🗓️ Solicitudes pendientes simuladas
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "María López",
      date: "2025-10-28",
      time: "10:00 AM",
      reason: "Dolor de cabeza recurrente. Posible migraña.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 2,
      patientName: "Carlos Pérez",
      date: "2025-10-29",
      time: "12:30 PM",
      reason: "Revisión post-operatoria. Seguimiento de cicatriz.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 3,
      patientName: "Ana Torres",
      date: "2025-10-30",
      time: "3:00 PM",
      reason: "Control de diabetes y ajuste de dosis.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
  ]);

  const handleReject = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAccept = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Agenda Médica
        </Text>
        <View className="w-10" />
      </View>

      {/* 🔹 Encabezado */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <View className="flex-row items-center">
          <Calendar size={22} color="#0D9488" />
          <Text className="text-lg font-bold text-gray-900 ml-2">
            Solicitudes de Citas Médicas
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {appointments.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">
            No hay solicitudes pendientes.
          </Text>
        ) : (
          appointments.map((a) => (
            <DoctorAppointmentCard
              key={a.id}
              appointment={a}
              onCancel={handleReject}
              onReschedule={handleAccept}
            />
          ))
        )}
      </ScrollView>

      <DoctorBottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}
