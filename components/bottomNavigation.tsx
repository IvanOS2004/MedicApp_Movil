import { Calendar, Home, Navigation, User } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export interface TabItem {
  key: string;
  icon: React.ReactNode;
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
    { key: "home", icon: <Home size={24} /> },
    { key: "explore", icon: <Navigation size={24} /> },
    { key: "calendar", icon: <Calendar size={24} /> },
    { key: "profile", icon: <User size={24} /> },
  ],
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 mx-auto flex-row justify-between rounded-t-3xl bg-teal-900 px-6 py-4">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabPress(tab.key)}
          className={`items-center ${
            activeTab === tab.key ? "text-white" : "text-teal-400"
          }`}
        >
          {tab.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;
