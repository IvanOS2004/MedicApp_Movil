import { Stack, router } from "expo-router";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Moon,
  Smartphone,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Text as RNText,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    whatsappNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const toggleSwitch = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const SettingItem = ({
    icon: Icon,
    title,
    description,
    value,
    onValueChange,
    hasSwitch = false,
    onPress,
  }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-3 flex-row justify-between items-center"
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-teal-100 rounded-lg items-center justify-center mr-3">
          <Icon size={20} color="#0D9488" />
        </View>
        <View className="flex-1">
          <RNText className="text-base font-semibold text-gray-900 mb-1">
            {title}
          </RNText>
          <RNText className="text-sm text-gray-600">{description}</RNText>
        </View>
      </View>
      {hasSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#f3f4f6", true: "#0d9488" }}
          thumbColor={value ? "#ffffff" : "#f3f4f6"}
        />
      ) : (
        <RNText className="text-gray-500">{value}</RNText>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />

      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <RNText className="text-lg font-semibold text-gray-900">
          Settings
        </RNText>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-4 pt-4">
          {/* Appearance */}
          <View className="mb-4">
            <RNText className="text-lg font-bold text-gray-900 mb-3">
              Appearance
            </RNText>
            <SettingItem
              icon={Moon}
              title="Dark Mode"
              description="Switch between light and dark theme"
              value={settings.darkMode}
              onValueChange={() => toggleSwitch("darkMode")}
              hasSwitch={true}
              onPress={() => toggleSwitch("darkMode")}
            />
          </View>

          {/* Notifications */}
          <View className="mb-4">
            <RNText className="text-lg font-bold text-gray-900 mb-3">
              Notifications
            </RNText>
            <SettingItem
              icon={MessageSquare}
              title="WhatsApp Notifications"
              description="Receive appointment reminders via WhatsApp"
              value={settings.whatsappNotifications}
              onValueChange={() => toggleSwitch("whatsappNotifications")}
              hasSwitch={true}
              onPress={() => toggleSwitch("whatsappNotifications")}
            />

            <SettingItem
              icon={Mail}
              title="Email Notifications"
              description="Receive updates and reminders via email"
              value={settings.emailNotifications}
              onValueChange={() => toggleSwitch("emailNotifications")}
              hasSwitch={true}
              onPress={() => toggleSwitch("emailNotifications")}
            />

            <SettingItem
              icon={Smartphone}
              title="SMS Notifications"
              description="Get text message alerts for appointments"
              value={settings.smsNotifications}
              onValueChange={() => toggleSwitch("smsNotifications")}
              hasSwitch={true}
              onPress={() => toggleSwitch("smsNotifications")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
