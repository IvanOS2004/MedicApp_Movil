import { Stack, router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const roleSelection = () => {
  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="px-6 pt-10 pb-6">
        <Text className="text-3xl font-bold text-center text-gray-900 mb-2">
          Join as a...
        </Text>
        <Text className="text-base text-center text-gray-600">
          Choose how you want to use MedicApp
        </Text>
      </View>

      {/* Cards de selección */}
      <View className="flex-1 px-6 justify-center">
        {/* Paciente */}
        <TouchableOpacity
          className="bg-teal-50 border-2 border-teal-200 rounded-3xl p-6 mb-6 active:bg-teal-100"
          onPress={() => router.push("/patient/forms/registerPatientStep1")}
        >
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-teal-100 rounded-2xl items-center justify-center mr-4">
              <Text className="text-2xl">👤</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">
                Patient
              </Text>
              <Text className="text-sm text-gray-600">
                Book appointments, manage your health records, and connect with
                doctors
              </Text>
            </View>
            <View className="w-8 h-8 bg-teal-500 rounded-full items-center justify-center">
              <Text className="text-white text-lg">→</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Doctor */}
        <TouchableOpacity
          className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 active:bg-blue-100"
          onPress={() => router.push("/doctor/forms/registerDoctorStep1")}
        >
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mr-4">
              <Text className="text-2xl">👨‍⚕️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-1">
                Doctor
              </Text>
              <Text className="text-sm text-gray-600">
                Manage your practice, connect with patients, and provide care
              </Text>
            </View>
            <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
              <Text className="text-white text-lg">→</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="px-6 pb-8">
        <Text className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Text
            className="text-teal-600 font-semibold"
            onPress={() => router.push("/patient/forms/loginPatient")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default roleSelection;
