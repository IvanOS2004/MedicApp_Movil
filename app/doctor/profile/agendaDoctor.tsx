import { router, Stack } from "expo-router";
import { ArrowLeft, CalendarDays } from "lucide-react-native";
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
import ScheduleModal from "../../../components/scheduleModal";

export default function DoctorAgenda() {
  const [activeTab, setActiveTab] = useState("agenda");
  const [modalVisible, setModalVisible] = useState(false);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Lucía Martínez",
      date: "2025-10-28",
      time: "10:00 AM",
      reason: "Consulta general",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 2,
      patientName: "Miguel Gómez",
      date: "2025-10-29",
      time: "11:30 AM",
      reason: "Chequeo anual",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ]);

  const cancelAppointment = (id: number) =>
    setAppointments((prev) => prev.filter((a) => a.id !== id));

  const rescheduleAppointment = (id: number) => {
    console.log("Reagendar cita con ID:", id);
    // Aquí podrías abrir un modal o pantalla para seleccionar nueva hora.
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
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

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Banner */}
        <View className="bg-teal-100 rounded-3xl p-5 mb-6 mx-4 flex-row items-center justify-between shadow-sm">
          <View className="flex-1 pr-4">
            <Text className="text-teal-800 font-semibold text-lg mb-1">
              Mantén tu agenda actualizada
            </Text>
            <Text className="text-gray-600 text-sm leading-5">
              Visualiza tus horarios, administra tu disponibilidad y revisa tus
              citas fácilmente.
            </Text>
          </View>
          <CalendarDays size={42} color="#0D9488" />
        </View>

        {/* Próximas citas */}
        <Text className="text-lg font-bold text-gray-900 mb-4 mx-4">
          Próximas citas
        </Text>

        {appointments.length === 0 ? (
          <Text className="text-gray-500 text-center mt-4">
            No tienes citas programadas aún.
          </Text>
        ) : (
          appointments.map((a) => (
            <DoctorAppointmentCard
              key={a.id}
              appointment={a}
              onCancel={cancelAppointment}
              onReschedule={rescheduleAppointment}
            />
          ))
        )}

        {/* Ver horarios */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-teal-700 rounded-full px-4 py-3 flex-row items-center justify-center mb-4 mx-4"
        >
          <CalendarDays size={20} color="#fff" />
          <Text className="text-white font-semibold ml-2">
            Ver horarios del día
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <ScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        appointments={appointments}
      />

      {/* Bottom Nav */}
      <DoctorBottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}
