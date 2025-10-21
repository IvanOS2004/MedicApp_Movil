import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DatePickerProps {
  label?: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  error?: string;
  containerClass?: string;
  showAge?: boolean;
}

const DatePickerForm: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onDateChange,
  error,
  containerClass = "mb-4",
  showAge = true,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  // Formato latino: dd/mm/aaaa
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View className={containerClass}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      )}

      <TouchableOpacity
        className={`bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 flex-row items-center justify-between ${
          error ? "border-red-500" : ""
        }`}
        onPress={() => setShowDatePicker(true)}
      >
        <Text className="text-gray-900">{formatDate(selectedDate)}</Text>
        <Calendar size={20} color="#6B7280" />
      </TouchableOpacity>

      {showAge && (
        <Text className="text-xs text-gray-500 mt-1">
          Edad: {calculateAge(selectedDate)} años
        </Text>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};

export default DatePickerForm;
