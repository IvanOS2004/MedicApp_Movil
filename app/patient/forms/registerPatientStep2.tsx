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

import Input from "../../../components/InputForm";

const RegisterPatientStep2 = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword] = useState(false);
  const [showConfirmPassword] = useState(false);

  // Obtener parámetros del paso anterior
  const params = useLocalSearchParams();
  const { phone, email } = params;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    /*
    if (!formData.password || !formData.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Validaciones de seguridad de contraseña
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumbers = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      Alert.alert("Error", "Password must contain uppercase, lowercase, numbers and special characters");
      return;
    }
    */

    router.push({
      pathname: "/patient/forms/registerPatientStep3",
      params: {
        phone,
        email,
        password: formData.password,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" />

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
          Step 2 of 3 - Password
        </Text>
      </View>

      <View className="flex-1 px-4 pt-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Create Password
        </Text>
        <Text className="text-gray-600 mb-8">
          For your security, please create a strong password.
        </Text>

        <Input
          label="Password"
          placeholder="Create a password"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry={!showConfirmPassword}
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
        />

        {/* Información de requisitos de contraseña */}
        <View className="mb-6 p-4 bg-teal-50 rounded-xl">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Password Requirements:
          </Text>
          <Text className="text-xs text-gray-600">
            • At least 8 characters long{"\n"}• One uppercase letter{"\n"}• One
            lowercase letter{"\n"}• One number{"\n"}• One special character
          </Text>
        </View>

        {/* Botón Siguiente */}
        <TouchableOpacity
          className="bg-teal-600 py-4 rounded-xl items-center mb-4"
          onPress={handleNext}
        >
          <Text className="text-white font-bold text-base">Next</Text>
        </TouchableOpacity>

        {/* Enlace a Login */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <Text
            className="text-teal-600 font-semibold"
            onPress={() => router.push("/patient/forms/loginPatient")}
          >
            Sign In
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPatientStep2;
