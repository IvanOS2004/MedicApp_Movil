import { Stack, router } from "expo-router";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Heart,
  LogOut,
  MessageCircle,
  Settings,
  Shield,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BottomNavigation from "../../components/bottomNavigation";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { icon: User, label: "Edit Profile", color: "#0D9488" },
    { icon: Heart, label: "Favorite", color: "#0D9488" },
    { icon: Bell, label: "Notifications", color: "#0D9488" },
    { icon: Settings, label: "Settings", color: "#0D9488" },
    { icon: MessageCircle, label: "Help and Support", color: "#0D9488" },
    { icon: Shield, label: "Terms and Conditions", color: "#0D9488" },
  ];

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    console.log("Tab pressed:", tabKey);
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleMenuItemPress = (itemLabel: string) => {
    console.log(`${itemLabel} pressed`);
    switch (itemLabel) {
      case "Edit Profile":
        router.push("/patient/profile/editProfile");
        break;
      case "Favorite":
        router.push("/patient/profile/favorites");
        break;
      case "Notifications":
        router.push("/patient/profile/notifications");
        break;
      case "Settings":
        router.push("/patient/profile/settings");
        break;
      case "Help and Support":
        router.push("/patient/profile/helpSupport");
        break;
      case "Terms and Conditions":
        router.push("/patient/profile/termsConditions");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    console.log("Logout pressed");
    alert("Logout functionality would go here");
  };

  const renderMenuItem = (item: any, index: number) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        key={index}
        className="flex-row items-center justify-between bg-white px-4 py-4 mb-2 rounded-2xl active:bg-gray-50"
        onPress={() => handleMenuItemPress(item.label)}
      >
        <View className="flex-row items-center">
          <Icon size={22} color={item.color} />
          <Text className="text-gray-700 text-base ml-3">{item.label}</Text>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={handleBackPress}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Profile</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Section */}
        <View className="items-center px-4 mb-6">
          <View className="relative mb-4">
            <Image
              source={{
                uri: "https://picsum.photos/140/140?random=profile",
              }}
              className="w-36 h-36 rounded-full bg-gray-300"
            />
          </View>

          <Text className="text-xl font-bold text-gray-900 mb-1">
            Daniel Martinez
          </Text>
          <Text className="text-sm text-gray-500">+123 856479683</Text>
        </View>

        {/* Menu Items */}
        <View className="px-4">
          {menuItems.map((item, index) => renderMenuItem(item, index))}

          {/* Log Out Button */}
          <TouchableOpacity
            className="flex-row items-center justify-between bg-white px-4 py-4 rounded-2xl active:bg-red-50"
            onPress={handleLogout}
          >
            <View className="flex-row items-center">
              <LogOut size={22} color="#EF4444" />
              <Text className="text-red-500 text-base ml-3">Log Out</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
