import { ChevronDown, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
  placeholder = "Selecciona una opción",
  error,
  containerClass = "mb-4",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <View className={containerClass}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      )}

      {/* Botón principal */}
      <TouchableOpacity
        className={`bg-gray-50 border rounded-xl px-4 py-3 flex-row items-center justify-between ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text
          className={`${
            selectedValue ? "text-gray-900" : "text-gray-400"
          } text-base`}
        >
          {selectedLabel}
        </Text>
        <ChevronDown size={20} color="#6B7280" />
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <Pressable
            className="flex-1"
            onPress={() => setModalVisible(false)}
          />

          <View className="bg-white rounded-t-3xl p-4 shadow-lg">
            {/* Header del modal */}
            <View className="flex-row items-center justify-between mb-3 border-b border-gray-200 pb-2">
              <Text className="text-lg font-semibold text-gray-800">
                {label || "Selecciona una opción"}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={22} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {/* Lista de opciones */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => (
                <View className="h-[1px] bg-gray-100 mx-2" />
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`px-4 py-4 rounded-xl ${
                    selectedValue === item.value
                      ? "bg-teal-50"
                      : "bg-transparent"
                  }`}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    className={`text-base ${
                      selectedValue === item.value
                        ? "text-teal-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 300 }}
              showsVerticalScrollIndicator={false}
            />

            {/* Botón cancelar */}
            <TouchableOpacity
              className="mt-3 bg-gray-100 py-3 rounded-xl"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center text-gray-700 font-medium">
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropdownButtomForm;
