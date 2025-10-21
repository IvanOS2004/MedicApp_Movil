import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  containerClass?: string;
}

const DropdownButtomForm: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
  placeholder = "Select an option",
  error,
  containerClass = "mb-4",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const getSelectedLabel = () => {
    return (
      options.find((option) => option.value === selectedValue)?.label ||
      placeholder
    );
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
        onPress={() => setModalVisible(true)}
      >
        <Text
          className={`${selectedValue ? "text-gray-900" : "text-gray-500"}`}
        >
          {getSelectedLabel()}
        </Text>
        <ChevronDown size={20} color="#6B7280" />
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl w-80 max-h-80">
            <Text className="text-lg font-semibold p-4 border-b border-gray-200">
              {label || "Select an option"}
            </Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`px-4 py-3 border-b border-gray-200 ${
                    selectedValue === item.value ? "bg-teal-50" : ""
                  }`}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    className={`${
                      selectedValue === item.value
                        ? "text-teal-700 font-medium"
                        : "text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              className="px-4 py-3 bg-gray-100 rounded-b-xl"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-gray-600 text-center font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropdownButtomForm;
