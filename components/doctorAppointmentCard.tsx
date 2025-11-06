import { Calendar, Clock } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface DoctorAppointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  image?: string;
}

interface DoctorAppointmentCardProps {
  appointment: DoctorAppointment;
  onCancel?: (id: number) => void;
  onReschedule?: (id: number) => void;
}

const DoctorAppointmentCard: React.FC<DoctorAppointmentCardProps> = ({
  appointment,
  onCancel,
  onReschedule,
}) => {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 mx-4 border border-teal-100 shadow-sm">
      {/* Fecha y hora */}
      <View className="flex-row items-center mb-3">
        <Calendar size={16} color="#0D9488" />
        <Text className="ml-2 text-gray-800 text-sm font-semibold">
          {appointment.date}
        </Text>
        <Clock size={16} color="#0D9488" className="ml-4" />
        <Text className="ml-2 text-gray-800 text-sm font-semibold">
          {appointment.time}
        </Text>
      </View>

      {/* Paciente */}
      <View className="flex-row items-center mb-4">
        <Image
          source={{
            uri:
              appointment.image ||
              "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
          }}
          className="w-16 h-16 rounded-2xl bg-teal-100"
        />
        <View className="ml-4 flex-1">
          <Text className="text-base font-bold text-gray-900 mb-1">
            {appointment.patientName}
          </Text>
          <Text className="text-sm text-teal-700 italic">
            {appointment.reason}
          </Text>
        </View>
      </View>

      {/* Botones */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          className="flex-1 bg-red-100 py-3.5 rounded-full items-center border border-red-200"
          onPress={() => onCancel?.(appointment.id)}
        >
          <Text className="text-red-600 font-semibold text-sm">Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-teal-800 py-3.5 rounded-full items-center"
          onPress={() => onReschedule?.(appointment.id)}
        >
          <Text className="text-white font-semibold text-sm">Reagendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorAppointmentCard;
