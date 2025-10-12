import { Link } from "expo-router";
import { Calendar, Home, Search, User } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export interface TabItem {
  key: string;
  icon: React.ReactNode;
  href: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  tabs?: TabItem[];
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
  tabs = [
    { key: "home", icon: <Home size={24} />, href: "/" },
    { key: "explore", icon: <Search size={24} />, href: "/patient/doctorList" },
    {
      key: "calendar",
      icon: <Calendar size={24} />,
      href: "/patient/calendar",
    },
    { key: "profile", icon: <User size={24} />, href: "/patient/profile" },
  ],
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 mx-auto flex-row justify-between rounded-t-3xl bg-teal-900 px-6 py-4">
      {tabs.map((tab) => (
        <Link key={tab.key} href={tab.href} asChild>
          <TouchableOpacity
            onPress={() => onTabPress(tab.key)}
            className={`items-center ${
              activeTab === tab.key ? "text-white" : "text-teal-400"
            }`}
          >
            {tab.icon}
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default BottomNavigation;
