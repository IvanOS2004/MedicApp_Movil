import { Stack, router } from "expo-router";
import { ArrowLeft, Bell } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    newMessages: true,
    medicalUpdates: false,
    promotions: false,
    systemNotifications: true,
  });

  const toggleSwitch = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const NotificationItem = ({ title, description, value, onValueChange }) => (
    <View className="bg-white rounded-2xl p-4 mb-3 flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900 mb-1">
          {title}
        </Text>
        <Text className="text-sm text-gray-600">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#f3f4f6", true: "#0d9488" }}
        thumbColor={value ? "#ffffff" : "#f3f4f6"}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-E0F7FA">
      <StatusBar barStyle="dark-content" backgroundColor="#E0F7FA" />

      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Notifications
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-4 pt-4">
          <View className="bg-white rounded-2xl p-4 mb-4">
            <View className="flex-row items-center mb-4">
              <Bell size={20} color="#0D9488" />
              <Text className="text-lg font-bold text-gray-900 ml-2">
                Notification Settings
              </Text>
            </View>

            <NotificationItem
              title="Appointment Reminders"
              description="Get reminded about upcoming appointments"
              value={notifications.appointmentReminders}
              onValueChange={() => toggleSwitch("appointmentReminders")}
            />

            <NotificationItem
              title="New Messages"
              description="Notify when you receive new messages from doctors"
              value={notifications.newMessages}
              onValueChange={() => toggleSwitch("newMessages")}
            />

            <NotificationItem
              title="Medical Updates"
              description="Important updates about your health records"
              value={notifications.medicalUpdates}
              onValueChange={() => toggleSwitch("medicalUpdates")}
            />

            <NotificationItem
              title="Promotions & Offers"
              description="Special offers and promotions from clinics"
              value={notifications.promotions}
              onValueChange={() => toggleSwitch("promotions")}
            />

            <NotificationItem
              title="System Notifications"
              description="Important updates about the app"
              value={notifications.systemNotifications}
              onValueChange={() => toggleSwitch("systemNotifications")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
