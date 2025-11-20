import { Stack, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Input from "../../../components/InputForm";

const RegisterDoctorStep1 = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    router.push({
      pathname: "/doctor/forms/registerDoctorStep2",
      params: formData,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" />

      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900 ml-2">
          Paso 1 de 3 - Contacto
        </Text>
      </View>

      {/* Formulario */}
      <View className="flex-1 px-4 pt-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Información de Contacto
        </Text>
        <Text className="text-gray-600 mb-8">
          Usa esta información para registrar tu perfil médico.
        </Text>

        <Input
          label="Teléfono de Contacto"
          placeholder="Ej: +52 1234567890"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />

        <Input
          label="Correo Electrónico"
          placeholder="Ej: medico@correo.com"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

        <TouchableOpacity
          className="bg-teal-600 py-4 rounded-xl items-center mt-6"
          onPress={handleNext}
        >
          <Text className="text-white font-bold text-base">Siguiente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterDoctorStep1;
