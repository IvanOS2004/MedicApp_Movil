import { Stack, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DropdownButtom from "../../../components/DropdownButtomForm";
import Input from "../../../components/InputForm";

const RegisterDoctorStep2 = () => {
  const params = useLocalSearchParams();
  const { phone, email } = params;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    specialty: "",
    licenseNumber: "",
    subSpecialties: "",
    experience: "",
  });

  // Especialidades médicas principales
  const specialtyOptions = [
    { label: "Alergología", value: "allergology" },
    { label: "Cardiología", value: "cardiology" },
    { label: "Dermatología", value: "dermatology" },
    { label: "Gastroenterología", value: "gastroenterology" },
    { label: "Neurología", value: "neurology" },
    { label: "Pediatría", value: "pediatrics" },
    { label: "Psiquiatría", value: "psychiatry" },
    { label: "Traumatología", value: "traumatology" },
  ];

  // Sub-especialidades por especialidad principal
  const subSpecialtyOptions = {
    allergology: [
      { label: "Alergias Alimentarias", value: "food_allergies" },
      { label: "Alergias Respiratorias", value: "respiratory_allergies" },
      { label: "Alergias a Medicamentos", value: "drug_allergies" },
    ],
    cardiology: [
      {
        label: "Cardiología Intervencionista",
        value: "interventional_cardiology",
      },
      { label: "Electrofisiología", value: "electrophysiology" },
      { label: "Cardiología Pediátrica", value: "pediatric_cardiology" },
    ],
    dermatology: [
      { label: "Dermatología Estética", value: "aesthetic_dermatology" },
      { label: "Dermatología Oncológica", value: "oncological_dermatology" },
      { label: "Dermatología Pediátrica", value: "pediatric_dermatology" },
    ],
    gastroenterology: [
      { label: "Endoscopia Digestiva", value: "digestive_endoscopy" },
      { label: "Hepatología", value: "hepatology" },
      { label: "Nutrición Clínica", value: "clinical_nutrition" },
    ],
    neurology: [
      { label: "Neurología Pediátrica", value: "pediatric_neurology" },
      { label: "Neurofisiología Clínica", value: "clinical_neurophysiology" },
      { label: "Neurología Vascular", value: "vascular_neurology" },
    ],
    pediatrics: [
      { label: "Neonatología", value: "neonatology" },
      { label: "Pediatría Intensiva", value: "intensive_pediatrics" },
      { label: "Infectología Pediátrica", value: "pediatric_infectology" },
    ],
    psychiatry: [
      { label: "Psiquiatría Infantil", value: "child_psychiatry" },
      { label: "Psiquiatría Geriátrica", value: "geriatric_psychiatry" },
      { label: "Psicoterapia", value: "psychotherapy" },
    ],
    traumatology: [
      { label: "Cirugía Ortopédica", value: "orthopedic_surgery" },
      { label: "Medicina Deportiva", value: "sports_medicine" },
      { label: "Reemplazo Articular", value: "joint_replacement" },
    ],
  };

  // Obtener sub-especialidades basadas en la especialidad seleccionada
  const getSubSpecialtyOptions = () => {
    if (formData.specialty && subSpecialtyOptions[formData.specialty]) {
      return subSpecialtyOptions[formData.specialty];
    }
    return [];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset sub-specialty when main specialty changes
      ...(field === "specialty" && { subSpecialties: "" }),
    }));
  };

  const handleNext = () => {
    router.push({
      pathname: "/doctor/forms/registerDoctorStep3",
      params: {
        ...formData,
        phone,
        email,
        birthDate: formData.birthDate,
      },
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
          Paso 2 de 3 - Datos Profesionales
        </Text>
      </View>

      <View className="flex-1 px-4 pt-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Información Profesional
        </Text>
        <Text className="text-gray-600 mb-8">
          Completa tus datos profesionales para validar tu perfil.
        </Text>

        {/* Nombre y apellidos*/}
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

        {/* Fecha de nacimiento */}
        <Input
          label="Fecha de nacimiento"
          placeholder="YYYY-MM-DD"
          value={formData.birthDate}
          onChangeText={(value) => handleInputChange("birthDate", value)}
          containerClass="mb-4"
        />

        {/* Especialidad*/}
        <DropdownButtom
          label="Especialidad Médica"
          selectedValue={formData.specialty}
          onValueChange={(value) => handleInputChange("specialty", value)}
          options={specialtyOptions}
          placeholder="Selecciona tu especialización médica"
        />

        {/* Sub Especialidad*/}
        <DropdownButtom
          label="Sub-Especialidad Médica"
          selectedValue={formData.subSpecialties}
          onValueChange={(value) => handleInputChange("subSpecialties", value)}
          options={getSubSpecialtyOptions()}
          placeholder={
            formData.specialty
              ? "Selecciona tu sub-especialidad"
              : "Primero selecciona una especialidad"
          }
          disabled={!formData.specialty}
        />

        <Input
          label="Cédula Profesional"
          placeholder="Ej: 1234567"
          value={formData.licenseNumber}
          onChangeText={(value) => handleInputChange("licenseNumber", value)}
        />

        <Input
          label="Experiencia Profesional"
          placeholder="Ej: 10 años, Hospital Ángeles, IMSS"
          value={formData.experience}
          onChangeText={(value) => handleInputChange("experience", value)}
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

export default RegisterDoctorStep2;
