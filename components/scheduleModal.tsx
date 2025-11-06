import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  appointments: {
    id: number;
    patientName: string;
    date: string;
    time: string;
    reason: string;
  }[];
}

export default function ScheduleModal({
  visible,
  onClose,
  appointments,
}: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateTimeSlots = () => {
    const start = 8; // 8:00 AM
    const end = 21; // 9:00 PM
    const slots = [];

    for (let hour = start; hour < end; hour++) {
      const label = `${hour}:00 ${hour < 12 ? "AM" : "PM"}`;
      const appointment = appointments.find((a) => a.time.includes(`${hour}:`));

      slots.push({
        time: label,
        booked: !!appointment,
        patient: appointment?.patientName,
        reason: appointment?.reason,
      });
    }

    return slots;
  };

  const slots = generateTimeSlots();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-5 h-[80%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              Horarios del Día
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={22} color="#0D9488" />
            </TouchableOpacity>
          </View>

          {/* Día seleccionado */}
          <Text className="text-sm text-gray-600 mb-3 text-center capitalize">
            {selectedDate.toLocaleDateString("es-MX", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>

          {/* Lista de horarios */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {slots.map((slot, idx) => (
              <View
                key={idx}
                className={`p-4 rounded-2xl mb-3 border ${
                  slot.booked
                    ? "bg-teal-100 border-teal-200"
                    : "bg-white border-gray-200"
                } shadow-sm`}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-900 font-medium">{slot.time}</Text>
                  <Text
                    className={`text-sm font-semibold ${
                      slot.booked ? "text-teal-700" : "text-gray-400"
                    }`}
                  >
                    {slot.booked ? "Reservado" : "Disponible"}
                  </Text>
                </View>

                {slot.booked && (
                  <View className="mt-2">
                    <Text className="text-gray-700 font-medium">
                      {slot.patient}
                    </Text>
                    <Text className="text-gray-500 text-sm italic">
                      {slot.reason}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
