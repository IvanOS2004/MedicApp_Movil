import { router, Stack, useLocalSearchParams } from "expo-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(30);
  const [selectedTime, setSelectedTime] = useState("10.00 AM");

  const params = useLocalSearchParams();
  const doctor = {
    id: params.doctorId,
    name: params.doctorName,
    specialty: params.doctorSpecialty,
    image: params.doctorImage,
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, null],
  ];

  const timeSlots = [
    ["09.00 AM", "09.30 AM", "10.00 AM"],
    ["10.30 AM", "11.00 AM", "11.30 AM"],
    ["3.00 PM", "3.30 PM", "4.00 PM"],
    ["4.30 PM", "5.00 PM", "5.30 PM"],
  ];

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    router.push({
      pathname: "/paymentScreen",
      params: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.image,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      },
    });
  };

  const renderCalendarDay = (
    day: number | null,
    weekIndex: number,
    dayIndex: number
  ) => {
    if (day === null) {
      return <View key={`${weekIndex}-${dayIndex}`} className="flex-1 h-10" />;
    }

    const isSelected = day === selectedDate;
    const isDisabled = day < 15 || day > 30;

    return (
      <TouchableOpacity
        key={`${weekIndex}-${dayIndex}`}
        className={`flex-1 h-10 items-center justify-center mx-0.5 rounded-lg ${
          isSelected ? "bg-teal-800" : isDisabled ? "" : "bg-white"
        }`}
        onPress={() => !isDisabled && setSelectedDate(day)}
        disabled={isDisabled}
      >
        <Text
          className={`text-sm ${
            isSelected
              ? "text-white font-bold"
              : isDisabled
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTimeSlot = (time: string) => {
    const isSelected = time === selectedTime;
    return (
      <TouchableOpacity
        key={time}
        className={`flex-1 py-3 rounded-xl mx-1 items-center ${
          isSelected ? "bg-teal-700" : "bg-white"
        }`}
        onPress={() => setSelectedTime(time)}
      >
        <Text
          className={`text-sm font-medium ${
            isSelected ? "text-white" : "text-gray-700"
          }`}
        >
          {time}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />

      <Stack.Screen
        options={{
          headerShown: false,
          title: "appointmentCalendar",
        }}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Book Appointment
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Select Date Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Select Date
          </Text>

          {/* Calendar Card */}
          <View className="bg-white rounded-3xl p-5 shadow-sm">
            {/* Month Header */}
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity>
                <ChevronLeft size={20} color="#0F766E" />
              </TouchableOpacity>
              <Text className="text-base font-semibold text-gray-900">
                June 2023
              </Text>
              <TouchableOpacity>
                <ChevronRight size={20} color="#0F766E" />
              </TouchableOpacity>
            </View>

            {/* Week Days Header */}
            <View className="flex-row mb-2">
              {weekDays.map((day) => (
                <View key={day} className="flex-1 items-center">
                  <Text className="text-xs font-medium text-gray-500">
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            {calendarDays.map((week, weekIndex) => (
              <View key={weekIndex} className="flex-row mb-1">
                {week.map((day, dayIndex) =>
                  renderCalendarDay(day, weekIndex, dayIndex)
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Select Hour Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Select Hour
          </Text>

          <View className="space-y-3">
            {timeSlots.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row mb-3">
                {row.map((time) => renderTimeSlot(time))}
              </View>
            ))}
          </View>
        </View>

        {/* Spacing for button */}
        <View className="h-24" />
      </ScrollView>

      {/* Confirm Button */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-teal-50">
        <TouchableOpacity
          className="bg-teal-800 py-4 rounded-full items-center shadow-lg"
          onPress={handleConfirm}
        >
          <Text className="text-white font-bold text-base">Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookAppointment;
