import { Stack, router } from "expo-router";
import { ArrowLeft, Mail, Phone } from "lucide-react-native";
import React from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HelpSupport = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our support team",
      action: () => Linking.openURL("tel:+18005551234"),
      color: "#0D9488",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      action: () => Linking.openURL("mailto:support@medicapp.com"),
      color: "#0D9488",
    },
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Go to the doctor's profile and click 'Book Appointment' to select date and time.",
    },
    {
      question: "Can I cancel my appointment?",
      answer:
        "Yes, you can cancel appointments up to 24 hours before the scheduled time.",
    },
    {
      question: "How do I update my medical information?",
      answer:
        "Go to your profile and edit your medical information in the settings.",
    },
  ];

  const ContactMethod = ({ icon: Icon, title, description, action, color }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-3 flex-row items-center border border-teal-200"
      onPress={action}
    >
      <View className="w-12 h-12 bg-teal-100 rounded-lg items-center justify-center mr-4">
        <Icon size={24} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900 mb-1">
          {title}
        </Text>
        <Text className="text-sm text-gray-600">{description}</Text>
      </View>
    </TouchableOpacity>
  );

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
          Help & Support
        </Text>
        <View className="w-10" />
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-4 pt-4">
          <Text className="text-lg font-bold text-teal-800 mb-3">
            Contact Us
          </Text>
          {contactMethods.map((method, index) => (
            <ContactMethod key={index} {...method} />
          ))}

          <Text className="text-lg font-bold text-teal-800 mb-3 mt-6">FAQ</Text>
          <View className="bg-white rounded-2xl p-4 border border-teal-200">
            {faqs.map((faq, index) => (
              <View key={index} className="mb-4 last:mb-0">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                  {faq.question}
                </Text>
                <Text className="text-sm text-gray-700">{faq.answer}</Text>
                {index < faqs.length - 1 && (
                  <View className="border-b border-teal-100 my-3" />
                )}
              </View>
            ))}
          </View>

          <View className="bg-teal-100 border border-teal-200 rounded-2xl p-4 mt-4">
            <Text className="text-teal-800 font-semibold mb-2">
              Emergency Notice
            </Text>
            <Text className="text-teal-700 text-sm">
              If this is a medical emergency, please call emergency services
              immediately. Do not use this app for urgent medical needs.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;
