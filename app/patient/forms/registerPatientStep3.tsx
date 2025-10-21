import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Calendar } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const RegisterPatientStep3 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: new Date(),
    gender: "",
    allergies: "",
    chronicConditions: "",
    medications: "",
    medicalHistory: "",
    insuranceCompany: "",
    insuranceNumber: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useLocalSearchParams();
  const { phone, email, password } = params;

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
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: selectedDate,
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    /*
    if (!formData.fullName) {
      Alert.alert("Error", "Please fill in all required fields");
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

      // Simular registro
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navegar directamente a home
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900 ml-2">
          Step 3 of 3 - Medical Info
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
            Personal Information
          </Text>

          {/* Nombre Completo */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange("fullName", value)}
            />
          </View>

          {/* Fecha de Nacimiento */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </Text>
            <TouchableOpacity
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 flex-row items-center justify-between"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-gray-900">
                {formatDate(formData.dateOfBirth)}
              </Text>
              <Calendar size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text className="text-xs text-gray-500 mt-1">
              Age: {calculateAge(formData.dateOfBirth)} years
            </Text>

            {showDatePicker && (
              <DateTimePicker
                value={formData.dateOfBirth}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          {/* Género */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Gender
            </Text>
            <View className="flex-row space-x-3">
              {["Male", "Female", "Other"].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  className={`flex-1 py-3 rounded-xl border ${
                    formData.gender === gender
                      ? "bg-teal-50 border-teal-500"
                      : "bg-gray-50 border-gray-300"
                  }`}
                  onPress={() => handleInputChange("gender", gender)}
                >
                  <Text
                    className={`text-center font-medium ${
                      formData.gender === gender
                        ? "text-teal-700"
                        : "text-gray-600"
                    }`}
                  >
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Información Médica */}
          <Text className="text-lg font-bold text-gray-900 mb-4 mt-6">
            Medical Information
          </Text>

          {/* Alergias */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Relevant Allergies
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              placeholder="List any relevant allergies"
              multiline
              numberOfLines={3}
              value={formData.allergies}
              onChangeText={(value) => handleInputChange("allergies", value)}
            />
          </View>

          {/* Condiciones Crónicas */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Chronic Conditions
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              placeholder="e.g., diabetes, hypertension"
              multiline
              numberOfLines={3}
              value={formData.chronicConditions}
              onChangeText={(value) =>
                handleInputChange("chronicConditions", value)
              }
            />
          </View>

          {/* Medicamentos */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Frequent Medications
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              placeholder="List medications you take regularly"
              multiline
              numberOfLines={3}
              value={formData.medications}
              onChangeText={(value) => handleInputChange("medications", value)}
            />
          </View>

          {/* Antecedentes Médicos */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Medical History (Optional)
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              placeholder="Any relevant medical history"
              multiline
              numberOfLines={4}
              value={formData.medicalHistory}
              onChangeText={(value) =>
                handleInputChange("medicalHistory", value)
              }
            />
          </View>

          {/* Información del Seguro */}
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Insurance Information
          </Text>

          {/* Compañía de Seguros */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Insurance Company
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              placeholder="Enter insurance company name"
              value={formData.insuranceCompany}
              onChangeText={(value) =>
                handleInputChange("insuranceCompany", value)
              }
            />
          </View>

          {/* Número de Póliza */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Policy Number
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
              placeholder="Enter your policy number"
              value={formData.insuranceNumber}
              onChangeText={(value) =>
                handleInputChange("insuranceNumber", value)
              }
            />
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
              {loading ? "Creating Account..." : "Complete Registration"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPatientStep3;
