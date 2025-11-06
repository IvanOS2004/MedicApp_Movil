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

import Input from "../../../components/InputForm";
import TextArea from "../../../components/TextareaForm";

const RegisterDoctorStep3 = () => {
  const params = useLocalSearchParams();
  const {
    phone,
    email,
    clinicAddress,
    fullName,
    specialty,
    licenseNumber,
    subSpecialties,
    experience,
  } = params;

  const [formData, setFormData] = useState({
    services: "",
    consultationCost: "",
    workingHours: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
    setLoading(true);
    try {
      const completeData = {
        ...formData,
        profileImage,
        phone,
        email,
        clinicAddress,
        fullName,
        specialty,
        licenseNumber,
        subSpecialties,
        experience,
      };

      console.log("Doctor registrado:", completeData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/doctor/profile/profileDoctorHome");
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
          Paso 3 de 3 - Servicios y Foto
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

          <Text className="text-lg font-bold text-gray-900 mb-4">
            Detalles del Consultorio
          </Text>

          <TextArea
            label="Servicios Médicos Ofrecidos"
            placeholder="Ej: Consultas, terapias, estudios..."
            value={formData.services}
            onChangeText={(value) => handleInputChange("services", value)}
          />

          <Input
            label="Costo Aproximado de Consulta"
            placeholder="Ej: $600 MXN"
            keyboardType="numeric"
            value={formData.consultationCost}
            onChangeText={(value) =>
              handleInputChange("consultationCost", value)
            }
          />

          <Input
            label="Horarios de Atención"
            placeholder="Ej: Lunes a Viernes 9am - 5pm"
            value={formData.workingHours}
            onChangeText={(value) => handleInputChange("workingHours", value)}
          />

          {/* Términos */}
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

          {/* Botón Registrar */}
          <TouchableOpacity
            className={`bg-teal-600 py-4 rounded-xl items-center ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white font-bold text-base">
              {loading ? "Creando Perfil..." : "Completar Registro"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterDoctorStep3;
