import { router, Stack, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CreditCard } from "lucide-react-native";
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

const CreditCardForm = () => {
  const [cardHolderName, setCardHolderName] = useState("John Doe");
  const [cardNumber, setCardNumber] = useState("000 000 000 00");
  const [expiryDate, setExpiryDate] = useState("04/28");
  const [cvv, setCvv] = useState("0000");
  const [loading, setLoading] = useState(false);

  const params = useLocalSearchParams();
  const doctor = {
    id: params.doctorId,
    name: params.doctorName,
    specialty: params.doctorSpecialty,
    image: params.doctorImage,
  };

  const appointment = {
    date: params.appointmentDate,
    time: params.appointmentTime,
  };

  const handleConfirm = async () => {
    if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
      Alert.alert("Error", "Please fill in all card details");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Appointment Confirmed!",
        `Your appointment with ${doctor.name} on June ${appointment.date} at ${appointment.time} has been confirmed.`,
        [
          {
            text: "OK",
            onPress: () => router.replace("/patient/appointmentList"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Payment Failed",
        "Please try again or use a different payment method."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />

      <Stack.Screen
        options={{
          headerShown: false,
          title: "paymentScreen",
        }}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Credit Card</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Appointment Summary */}
        <View className="bg-white rounded-2xl p-4 mt-4 mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Appointment Summary
          </Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Doctor</Text>
              <Text className="font-medium text-gray-900">{doctor.name}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Specialty</Text>
              <Text className="font-medium text-gray-900">
                {doctor.specialty}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Date</Text>
              <Text className="font-medium text-gray-900">
                June {appointment.date}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Time</Text>
              <Text className="font-medium text-gray-900">
                {appointment.time}
              </Text>
            </View>
            <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-200">
              <Text className="text-lg font-bold text-gray-900">Total</Text>
              <Text className="text-lg font-bold text-teal-700">$85.00</Text>
            </View>
          </View>
        </View>

        {/* Credit Card Display */}
        <View className="my-4 mx-2">
          <View className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 h-56 relative overflow-hidden">
            {/* Decorative Elements */}
            <View className="absolute -right-20 -top-20 w-64 h-64 bg-teal-500 opacity-30 rounded-full" />
            <View className="absolute right-4 top-20 w-40 h-40 bg-teal-700 opacity-40 rounded-full" />

            {/* Card Chip Icon */}
            <View className="absolute right-6 top-6">
              <View className="w-12 h-8 border-2 border-white/40 rounded" />
            </View>

            {/* Card Content */}
            <View className="flex-1 justify-between">
              <View />

              {/* Card Number */}
              <Text className="text-white text-xl font-semibold tracking-wider mb-4">
                {cardNumber}
              </Text>

              {/* Card Details Row */}
              <View className="flex-row justify-between items-end">
                <View>
                  <Text className="text-white/70 text-xs mb-1">
                    Card Holder Name
                  </Text>
                  <Text className="text-white text-sm font-semibold">
                    {cardHolderName}
                  </Text>
                </View>
                <View>
                  <Text className="text-white/70 text-xs mb-1">
                    Expiry Date
                  </Text>
                  <Text className="text-white text-sm font-semibold">
                    {expiryDate}
                  </Text>
                </View>
                <View className="bg-white/20 p-2 rounded">
                  <CreditCard size={20} color="#FFFFFF" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View className="mb-6">
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-2 ml-1">
              Card Holder Name
            </Text>
            <TextInput
              className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
              placeholder="John Doe"
              placeholderTextColor="#9CA3AF"
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />
          </View>
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-2 ml-1">
              Card Number
            </Text>
            <TextInput
              className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
              placeholder="000 000 000 00"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={14}
            />
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-gray-700 text-sm font-medium mb-2 ml-1">
                Expiry Date
              </Text>
              <TextInput
                className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
                placeholder="04/28"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-sm font-medium mb-2 ml-1">
                CVV
              </Text>
              <TextInput
                className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
                placeholder="0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                value={cvv}
                onChangeText={setCvv}
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>
        <View className="mx-4 mt-4 mb-24">
          <View className="flex-row items-center justify-center">
            <CreditCard size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2 text-center">
              Your payment is secure and encrypted
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-teal-50">
        <TouchableOpacity
          className={`bg-teal-800 py-4 rounded-full items-center shadow-lg ${
            loading ? "opacity-50" : ""
          }`}
          onPress={handleConfirm}
          disabled={loading}
        >
          <Text className="text-white font-bold text-base">
            {loading ? "Processing..." : "Confirm Payment"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreditCardForm;
