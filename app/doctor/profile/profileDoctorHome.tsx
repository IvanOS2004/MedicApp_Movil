import { CheckCircle, ClipboardList, Clock } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import DoctorBottomNavigation from "../../../components/doctorBottomNavigation";

export default function DoctorHome() {
  const [activeTab, setActiveTab] = useState("home");

  const [appointments] = useState([
    {
      id: 1,
      name: "María López",
      date: "27 Oct, 10:00 AM",
      status: "pendiente",
    },
    {
      id: 2,
      name: "Carlos Pérez",
      date: "27 Oct, 12:30 PM",
      status: "en curso",
    },
    {
      id: 3,
      name: "Ana Torres",
      date: "26 Oct, 3:00 PM",
      status: "finalizada",
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-teal-50 pb-20">
      <ScrollView className="px-4 pt-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Bienvenido, Doctor 👋
        </Text>

        <Text className="text-lg font-semibold text-teal-600 mb-2">
          Solicitudes de Cita
        </Text>
        {appointments
          .filter((a) => a.status === "pendiente")
          .map((a) => (
            <View
              key={a.id}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-teal-100"
            >
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-gray-800">{a.name}</Text>
                <Clock size={20} color="#0D9488" />
              </View>
              <Text className="text-gray-600 mt-1">{a.date}</Text>
              <Text className="text-teal-600 font-medium mt-2">
                Estado: Pendiente
              </Text>
            </View>
          ))}

        <Text className="text-lg font-semibold text-teal-600 mt-6 mb-2">
          Citas en Curso
        </Text>
        {appointments
          .filter((a) => a.status === "en curso")
          .map((a) => (
            <View
              key={a.id}
              className="bg-white rounded-xl p-4 mb-3 border border-teal-100 shadow-sm"
            >
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-gray-800">{a.name}</Text>
                <ClipboardList size={20} color="#0D9488" />
              </View>
              <Text className="text-gray-600 mt-1">{a.date}</Text>
              <Text className="text-teal-600 font-medium mt-2">
                En Progreso
              </Text>
            </View>
          ))}

        <Text className="text-lg font-semibold text-teal-600 mt-6 mb-2">
          Citas Finalizadas
        </Text>
        {appointments
          .filter((a) => a.status === "finalizada")
          .map((a) => (
            <View
              key={a.id}
              className="bg-white rounded-xl p-4 mb-3 border border-teal-100 shadow-sm"
            >
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-gray-800">{a.name}</Text>
                <CheckCircle size={20} color="#0D9488" />
              </View>
              <Text className="text-gray-600 mt-1">{a.date}</Text>
              <Text className="text-gray-500 font-medium mt-2">Finalizada</Text>
            </View>
          ))}
      </ScrollView>

      <DoctorBottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}
