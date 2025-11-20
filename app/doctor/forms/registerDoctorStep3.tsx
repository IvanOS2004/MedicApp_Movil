import Checkbox from "expo-checkbox";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Camera,
  ClipboardList,
  CreditCard,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
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
    fullName,
    specialty,
    licenseNumber,
    subSpecialties,
    experience,
  } = params;

  const [formData, setFormData] = useState({
    street: "",
    number: "",
    neighborhood: "",
    postalCode: "",
    city: "",
    state: "",
    country: "México",

    services: "",
    consultationCost: "",
    workingHours: "",
    paymentMethod: "",
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    bankAccount: "",
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
    /* Lógica de selección de imagen (ya implementada) */
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

          {/* Dirección */}
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Dirección del Consultorio / Clínica
          </Text>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Input
                label="Calle"
                placeholder="Ej: Avenida Reforma"
                value={formData.street}
                onChangeText={(v) => handleInputChange("street", v)}
              />
            </View>

            <View className="flex-1">
              <Input
                label="Colonia"
                placeholder="Ej: Centro"
                value={formData.neighborhood}
                onChangeText={(v) => handleInputChange("neighborhood", v)}
              />
            </View>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Input
                label="Número"
                placeholder="Ej: 123"
                keyboardType="numeric"
                value={formData.number}
                onChangeText={(v) => handleInputChange("number", v)}
              />
            </View>

            <View className="flex-1">
              <Input
                label="Código Postal"
                placeholder="Ej: 06000"
                keyboardType="number-pad"
                maxLength={5}
                value={formData.postalCode}
                onChangeText={(v) => handleInputChange("postalCode", v)}
              />
            </View>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Input
                label="Ciudad"
                placeholder="Ej: Ciudad de México"
                value={formData.city}
                onChangeText={(v) => handleInputChange("city", v)}
              />
            </View>
            <View className="flex-1">
              <Input
                label="Estado / Región"
                placeholder="Ej: CDMX"
                value={formData.state}
                onChangeText={(v) => handleInputChange("state", v)}
              />
            </View>
          </View>

          <Input
            label="País"
            placeholder="México"
            value={formData.country}
            editable={false}
          />

          {/* Detalles del consultorio */}
          <Text className="text-lg font-bold text-gray-900 mt-6 mb-4">
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

          {/* Método de Pago */}
          <Text className="text-lg font-bold text-gray-900 mt-6 mb-2">
            Método de Pago
          </Text>

          <View className="flex-row justify-between">
            {/* Tarjeta */}
            <TouchableOpacity
              onPress={() => handleInputChange("paymentMethod", "tarjeta")}
              className={`flex-1 flex-row items-center justify-between py-4 px-4 mx-1 rounded-2xl border ${
                formData.paymentMethod === "tarjeta"
                  ? "bg-teal-600 border-teal-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <View className="flex-row items-center">
                <CreditCard
                  size={20}
                  color={
                    formData.paymentMethod === "tarjeta" ? "#FFFFFF" : "#0D9488"
                  }
                />
                <Text
                  className={`ml-2 font-semibold ${
                    formData.paymentMethod === "tarjeta"
                      ? "text-white"
                      : "text-teal-700"
                  }`}
                >
                  Tarjeta
                </Text>
              </View>

              {formData.paymentMethod === "tarjeta" ? (
                <View className="w-5 h-5 rounded-full bg-white items-center justify-center">
                  <View className="w-3 h-3 rounded-full bg-teal-600" />
                </View>
              ) : (
                <View className="w-5 h-5 rounded-full border border-gray-400" />
              )}
            </TouchableOpacity>

            {/* Transferencia */}
            <TouchableOpacity
              onPress={() =>
                handleInputChange("paymentMethod", "transferencia")
              }
              className={`flex-1 flex-row items-center justify-between py-4 px-4 mx-1 rounded-2xl border ${
                formData.paymentMethod === "transferencia"
                  ? "bg-teal-600 border-teal-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <View className="flex-row items-center">
                <ClipboardList
                  size={20}
                  color={
                    formData.paymentMethod === "transferencia"
                      ? "#FFFFFF"
                      : "#0D9488"
                  }
                />
                <Text
                  className={`ml-2 font-semibold ${
                    formData.paymentMethod === "transferencia"
                      ? "text-white"
                      : "text-teal-700"
                  }`}
                >
                  Transferencia
                </Text>
              </View>

              {formData.paymentMethod === "transferencia" ? (
                <View className="w-5 h-5 rounded-full bg-white items-center justify-center">
                  <View className="w-3 h-3 rounded-full bg-teal-600" />
                </View>
              ) : (
                <View className="w-5 h-5 rounded-full border border-gray-400" />
              )}
            </TouchableOpacity>
          </View>

          {/* Tarjeta */}
          {formData.paymentMethod === "tarjeta" && (
            <View className="bg-white rounded-2xl p-4 border border-teal-100 mb-4 mt-3">
              <Text className="text-gray-700 text-sm font-medium mb-1 ml-1">
                Nombre del Titular
              </Text>
              <TextInput
                className="bg-gray-50 rounded-xl px-3 py-3 mb-3 text-gray-900"
                placeholder="Ej: Juan Pérez"
                value={formData.cardHolderName}
                onChangeText={(value) =>
                  handleInputChange("cardHolderName", value)
                }
              />

              <Text className="text-gray-700 text-sm font-medium mb-1 ml-1">
                Número de Tarjeta
              </Text>
              <TextInput
                className="bg-gray-50 rounded-xl px-3 py-3 mb-3 text-gray-900"
                placeholder="0000 0000 0000 0000"
                keyboardType="number-pad"
                maxLength={16}
                value={formData.cardNumber}
                onChangeText={(value) => handleInputChange("cardNumber", value)}
              />

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-gray-700 text-sm font-medium mb-1 ml-1">
                    Fecha de Expiración
                  </Text>
                  <TextInput
                    className="bg-gray-50 rounded-xl px-3 py-3 text-gray-900"
                    placeholder="MM/AA"
                    keyboardType="number-pad"
                    maxLength={5}
                    value={formData.expiryDate}
                    onChangeText={(value) =>
                      handleInputChange("expiryDate", value)
                    }
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-gray-700 text-sm font-medium mb-1 ml-1">
                    CVV
                  </Text>
                  <TextInput
                    className="bg-gray-50 rounded-xl px-3 py-3 text-gray-900"
                    placeholder="000"
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                    value={formData.cvv}
                    onChangeText={(value) => handleInputChange("cvv", value)}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Transferencia */}
          {formData.paymentMethod === "transferencia" && (
            <View className="bg-white rounded-2xl p-4 border border-teal-100 mb-4 mt-3">
              <Text className="text-gray-700 text-sm font-medium mb-1 ml-1">
                Número de Cuenta o CLABE
              </Text>
              <TextInput
                className="bg-gray-50 rounded-xl px-3 py-3 text-gray-900"
                placeholder="Ej: 002910700000123456"
                keyboardType="number-pad"
                maxLength={18}
                value={formData.bankAccount}
                onChangeText={(value) =>
                  handleInputChange("bankAccount", value)
                }
              />
            </View>
          )}

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

          {/* Botón */}
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
