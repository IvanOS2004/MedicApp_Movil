import { Stack, router } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PatientLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    /*if (!formData.password) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    if (loginMethod === "email" && !formData.email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (loginMethod === "phone" && !formData.phone) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }*/

    setLoading(true);

    try {
      console.log("Logging in:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
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
          Patient Sign In
        </Text>
      </View>

      <View className="flex-1 px-4 pt-8">
        {/* Método de Login */}
        <View className="flex-row bg-teal-200 rounded-xl p-1 mb-6">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${
              loginMethod === "email" ? "bg-teal-600 shadow-sm" : ""
            }`}
            onPress={() => setLoginMethod("email")}
          >
            <Text
              className={`text-center font-medium ${
                loginMethod === "email" ? "text-white" : "text-black"
              }`}
            >
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${
              loginMethod === "phone" ? "bg-teal-600 shadow-sm" : ""
            }`}
            onPress={() => setLoginMethod("phone")}
          >
            <Text
              className={`text-center font-medium ${
                loginMethod === "phone" ? "text-white" : "text-black"
              }`}
            >
              Phone
            </Text>
          </TouchableOpacity>
        </View>

        {/* Campo de Email o Teléfono */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            {loginMethod === "email" ? "Email Address" : "Phone Number"} *
          </Text>
          <TextInput
            className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
            placeholder={
              loginMethod === "email"
                ? "Enter your email"
                : "Enter your phone number"
            }
            keyboardType={
              loginMethod === "email" ? "email-address" : "phone-pad"
            }
            autoCapitalize="none"
            value={loginMethod === "email" ? formData.email : formData.phone}
            onChangeText={(value) =>
              handleInputChange(
                loginMethod === "email" ? "email" : "phone",
                value
              )
            }
          />
        </View>

        {/* Contraseña */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Password *
          </Text>
          <View className="relative">
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 pr-12"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón de Login */}
        <TouchableOpacity
          className={`bg-teal-600 py-4 rounded-xl items-center mb-4 ${
            loading ? "opacity-50" : ""
          }`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white font-bold text-base">
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Enlaces adicionales */}
        <View className="items-center space-y-3">
          <Text
            className="text-teal-600 font-semibold"
            onPress={() =>
              Alert.alert("Info", "Forgot password feature coming soon")
            }
          >
            Forgot Password?
          </Text>

          <View className="flex-row">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Text
              className="text-teal-600 font-semibold"
              onPress={() => router.push("/patient/forms/register")}
            >
              Sign Up
            </Text>
          </View>

          <View className="flex-row mt-4">
            <Text className="text-gray-600">Want to join as a doctor? </Text>
            <Text
              className="text-teal-600 font-semibold"
              onPress={() => router.push("..")}
            >
              Switch Role
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PatientLogin;
