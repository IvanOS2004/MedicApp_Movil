import { MapPin } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface Appointment {
  id: number;
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  image: string;
  status: "upcoming" | "completed";
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (appointment: Appointment) => void;
  onReschedule?: (appointment: Appointment) => void;
  onAddReview?: (appointment: Appointment) => void;
  onBookAgain?: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onCancel,
  onReschedule,
  onAddReview,
  onBookAgain,
}) => {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 mx-4 border border-gray-200">
      {/* Date and Time */}
      <Text className="text-sm font-semibold text-gray-800 mb-4">
        {appointment.date} - {appointment.time}
      </Text>

      {/* Doctor Info */}
      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: appointment.image }}
          className="w-20 h-20 rounded-2xl bg-teal-200"
        />
        <View className="flex-1 ml-4">
          <Text className="text-base font-bold text-gray-900 mb-1">
            {appointment.doctorName}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            {appointment.specialty}
          </Text>
          <View className="flex-row items-center">
            <MapPin size={14} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1">
              {appointment.clinic}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3">
        {appointment.status === "upcoming" ? (
          <>
            <TouchableOpacity
              className="flex-1 bg-red-100 py-3.5 rounded-full items-center border border-red-200"
              onPress={() => onCancel?.(appointment)}
            >
              <Text className="text-red-600 font-semibold text-sm">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-teal-800 py-3.5 rounded-full items-center"
              onPress={() => onReschedule?.(appointment)}
            >
              <Text className="text-white font-semibold text-sm">
                Reschedule
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className="flex-1 bg-teal-400 py-3.5 rounded-full items-center"
              onPress={() => onAddReview?.(appointment)}
            >
              <Text className="text-white font-semibold text-sm">
                Add Review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-teal-800 py-3.5 rounded-full items-center"
              onPress={() => onBookAgain?.(appointment)}
            >
              <Text className="text-white font-semibold text-sm">
                Book Again
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
