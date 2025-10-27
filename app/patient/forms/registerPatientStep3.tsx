import Checkbox from "expo-checkbox";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Camera } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
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

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
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

  const pickImage = async () => {
    /*const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso denegado", "Se requiere acceso a tus fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }*/
  };

  const handleRegister = async () => {
    /*if (!formData.firstName || !formData.lastName) {
      Alert.alert(
        "Campos faltantes",
        "Por favor completa tu nombre y apellido."
      );
      return;
    }

    if (!profileImage) {
      Alert.alert(
        "Foto de perfil requerida",
        "Por favor sube una foto de perfil."
      );
      return;
    }

    if (!termsAccepted) {
      Alert.alert(
        "Términos no aceptados",
        "Debes aceptar los términos y condiciones antes de continuar."
      );
      return;
    }*/

    setLoading(true);

    try {
      const completeData = {
        ...formData,
        phone,
        email,
        password,
        profileImage,
      };

      console.log("Registering patient:", completeData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200 bg-teal-50">
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
          {/* Imagen de perfil */}
          <View className="items-center mb-6">
            <TouchableOpacity
              onPress={pickImage}
              className="w-28 h-28 rounded-full bg-gray-100 justify-center items-center border-2 border-dashed border-gray-400"
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  className="w-28 h-28 rounded-full"
                />
              ) : (
                <View className="items-center">
                  <Camera size={28} color="#6B7280" />
                  <Text className="text-gray-500 text-sm mt-1">Subir foto</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Información Personal */}
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Información Personal
          </Text>

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

          <DatePicker
            label="Fecha de Nacimiento *"
            selectedDate={formData.dateOfBirth}
            onDateChange={handleDateChange}
            showAge={true}
          />

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

          <DropdownButtom
            label="Tipo de Alergia"
            selectedValue={formData.allergyType}
            onValueChange={(value) => handleInputChange("allergyType", value)}
            options={allergyOptions}
            placeholder="Selecciona tipo de alergia"
          />

          <TextArea
            label="Descripción de Alergias (Opcional)"
            placeholder="Describe tus alergias..."
            value={formData.allergyDescription}
            onChangeText={(value) =>
              handleInputChange("allergyDescription", value)
            }
          />

          <TextArea
            label="Condiciones Crónicas"
            placeholder="Ej: diabetes, hipertensión..."
            value={formData.chronicConditions}
            onChangeText={(value) =>
              handleInputChange("chronicConditions", value)
            }
          />

          <TextArea
            label="Medicamentos Frecuentes"
            placeholder="Medicamentos que tomas regularmente..."
            value={formData.medications}
            onChangeText={(value) => handleInputChange("medications", value)}
          />

          {/* Seguro */}
          <Text className="text-lg font-bold text-gray-900 mb-4 mt-6">
            Información del Seguro
          </Text>

          <Input
            label="Compañía de Seguros"
            placeholder="Nombre de tu aseguradora"
            value={formData.insuranceCompany}
            onChangeText={(value) =>
              handleInputChange("insuranceCompany", value)
            }
          />

          <Input
            label="Número de Póliza"
            placeholder="Tu número de póliza"
            value={formData.insuranceNumber}
            onChangeText={(value) =>
              handleInputChange("insuranceNumber", value)
            }
          />

          {/* Términos y condiciones */}
          <View className="flex-row items-center mt-6 mb-6">
            <Checkbox
              value={termsAccepted}
              onValueChange={setTermsAccepted}
              color={termsAccepted ? "#0D9488" : undefined}
              style={{ marginRight: 8 }}
            />
            <Text className="text-gray-700 flex-1">
              Acepto los{" "}
              <Text className="text-teal-600 font-semibold">
                Términos y Condiciones
              </Text>{" "}
              de la aplicación.
            </Text>
          </View>

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
