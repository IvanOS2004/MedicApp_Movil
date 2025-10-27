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

const RegisterPatientStep1 = () => {
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
    /*
    if (!formData.phone || !formData.email) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (formData.phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    */

    router.push({
      pathname: "/patient/forms/registerPatientStep2",
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
          Step 1 of 3 - Contact Info
        </Text>
      </View>

      <View className="flex-1 px-4 pt-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Contact Information
        </Text>
        <Text className="text-gray-600 mb-8">
          We'll use this to verify your account and keep you updated.
        </Text>

        <Input
          label="Phone Number"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />

        <Input
          label="Email Address"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

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

export default RegisterPatientStep1;
