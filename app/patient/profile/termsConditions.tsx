import { Stack, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TermsConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using MedicApp, you accept and agree to be bound by the terms and provision of this agreement.",
    },
    {
      title: "2. Use License",
      content:
        "Permission is granted to temporarily use MedicApp for personal, non-commercial transitory viewing only.",
    },
    {
      title: "3. Medical Disclaimer",
      content:
        "MedicApp provides a platform for connecting patients with healthcare providers. It does not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician with any questions you may have regarding a medical condition.",
    },
    {
      title: "4. Privacy Policy",
      content:
        "Your privacy is important to us. We collect, use, and protect your personal and medical information in accordance with our Privacy Policy and applicable laws.",
    },
    {
      title: "5. User Account",
      content:
        "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.",
    },
    {
      title: "6. Appointments and Cancellations",
      content:
        "Appointments made through MedicApp are subject to the cancellation policies of the respective healthcare providers.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "MedicApp shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.",
    },
    {
      title: "8. Changes to Terms",
      content:
        "We reserve the right to modify these terms at any time. We will provide notice of significant changes through the app or via email.",
    },
  ];

  const handleBackPress = () => router.back();

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCFBF1" />

      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={handleBackPress}
        >
          <ArrowLeft size={24} color="#134E4A" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Terms & Conditions
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-4 pt-4">
          <View className="bg-white rounded-2xl p-4 mb-4 border border-teal-200 shadow-sm">
            <Text className="text-sm text-gray-600 mb-4">
              Last updated: December 1, 2024
            </Text>

            <Text className="text-base text-gray-800 leading-6 mb-6">
              Please read these terms and conditions carefully before using
              MedicApp operated by our company.
            </Text>

            {sections.map((section, index) => (
              <View key={index} className="mb-6 last:mb-0">
                <Text className="text-lg font-bold text-teal-800 mb-2">
                  {section.title}
                </Text>
                <Text className="text-sm text-gray-700 leading-5">
                  {section.content}
                </Text>
              </View>
            ))}

            <View className="mt-6 p-4 bg-teal-100 rounded-xl border border-teal-200">
              <Text className="text-teal-800 font-semibold mb-2">
                Contact Information
              </Text>
              <Text className="text-teal-700 text-sm">
                If you have any questions about these Terms and Conditions,
                please contact us at legal@medicapp.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsConditions;
