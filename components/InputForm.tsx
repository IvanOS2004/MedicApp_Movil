import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClass?: string;
}

const Inputform: React.FC<InputProps> = ({
  label,
  error,
  containerClass = "mb-4",
  className = "bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900",
  ...props
}) => {
  return (
    <View className={containerClass}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      )}
      <TextInput
        className={`${className} ${error ? "border-red-500" : ""}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};

export default Inputform;
