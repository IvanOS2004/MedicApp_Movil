import { Stack, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DatePicker from "../../../components/DatePickerForm";
import DropdownButtom from "../../../components/DropdownButtomForm";
import Input from "../../../components/InputForm";
import TextArea from "../../../components/TextareaForm";

const RegisterPatientStep3 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    gender: "",
    allergyType: "",
    allergyDescription: "",
    chronicConditions: "",
    medications: "",
    insuranceCompany: "",
    insuranceNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const params = useLocalSearchParams();
  const { phone, email, password } = params;

  const allergyOptions = [
    { label: "Alergias Estacionales", value: "seasonal" },
    { label: "Alergias Alimentarias", value: "food" },
    { label: "Alergias a Medicamentos", value: "drug" },
    { label: "Alergias a Insectos", value: "insect" },
    { label: "Alergias al Látex", value: "latex" },
    { label: "Alergias al Moho", value: "mold" },
    { label: "Alergias a Mascotas", value: "pet" },
    { label: "Alergias al Polen", value: "pollen" },
    { label: "Otras", value: "other" },
  ];

  const genderOptions = [
    { label: "Masculino", value: "male" },
    { label: "Femenino", value: "female" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));
  };

  const handleRegister = async () => {
    /*
    if (!formData.firstName || !formData.lastName) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos");
      return;
    }
    */

    setLoading(true);

    try {
      const completeData = {
        ...formData,
        phone,
        email,
        password,
      };

      console.log("Registering patient:", completeData);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.replace("/home");
    } catch (error) {
      Alert.alert(
        "Error",
        "Error al crear la cuenta. Por favor intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
          Paso 3 de 3 - Información Médica
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-4 pt-6">
          {/* Información Personal */}
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Información Personal
          </Text>

          {/* Nombres */}
          <View className="flex-row space-x-3">
            <Input
              label="Nombres *"
              placeholder="Ingresa tus nombres"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange("firstName", value)}
              containerClass="flex-1 mb-4"
            />
            <Input
              label="Apellidos *"
              placeholder="Ingresa tus apellidos"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange("lastName", value)}
              containerClass="flex-1 mb-4"
            />
          </View>

          {/* Fecha de Nacimiento */}
          <DatePicker
            label="Fecha de Nacimiento *"
            selectedDate={formData.dateOfBirth}
            onDateChange={handleDateChange}
            showAge={true}
          />

          {/* Género */}
          <DropdownButtom
            label="Género"
            selectedValue={formData.gender}
            onValueChange={(value) => handleInputChange("gender", value)}
            options={genderOptions}
            placeholder="Selecciona tu género"
          />

          {/* Información Médica */}
          <Text className="text-lg font-bold text-gray-900 mb-4 mt-6">
            Información Médica
          </Text>

          {/* Tipo de Alergia */}
          <DropdownButtom
            label="Tipo de Alergia"
            selectedValue={formData.allergyType}
            onValueChange={(value) => handleInputChange("allergyType", value)}
            options={allergyOptions}
            placeholder="Selecciona tipo de alergia"
          />

          {/* Descripción de Alergias */}
          <TextArea
            label="Descripción de Alergias (Opcional)"
            placeholder="Describe tus alergias en detalle..."
            value={formData.allergyDescription}
            onChangeText={(value) =>
              handleInputChange("allergyDescription", value)
            }
          />

          {/* Condiciones Crónicas */}
          <TextArea
            label="Condiciones Crónicas"
            placeholder="Ej: diabetes, hipertensión, asma..."
            value={formData.chronicConditions}
            onChangeText={(value) =>
              handleInputChange("chronicConditions", value)
            }
          />

          {/* Medicamentos */}
          <TextArea
            label="Medicamentos Frecuentes"
            placeholder="Lista de medicamentos que tomas regularmente..."
            value={formData.medications}
            onChangeText={(value) => handleInputChange("medications", value)}
          />

          {/* Información del Seguro */}
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Información del Seguro
          </Text>

          {/* Compañía de Seguros */}
          <Input
            label="Compañía de Seguros"
            placeholder="Nombre de tu aseguradora"
            value={formData.insuranceCompany}
            onChangeText={(value) =>
              handleInputChange("insuranceCompany", value)
            }
          />

          {/* Número de Póliza */}
          <Input
            label="Número de Póliza"
            placeholder="Tu número de póliza"
            value={formData.insuranceNumber}
            onChangeText={(value) =>
              handleInputChange("insuranceNumber", value)
            }
          />

          {/* Botón de Registro */}
          <TouchableOpacity
            className={`bg-teal-600 py-4 rounded-xl items-center ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white font-bold text-base">
              {loading ? "Creando Cuenta..." : "Completar Registro"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPatientStep3;
