import { Link } from "expo-router";
import { CalendarDays, ClipboardList, Star, User } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export interface TabItem {
  key: string;
  icon: React.ReactNode;
  href: string;
}

interface DoctorBottomNavigationProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  tabs?: TabItem[];
}

const DoctorBottomNavigation: React.FC<DoctorBottomNavigationProps> = ({
  activeTab,
  onTabPress,
  tabs = [
    {
      key: "home",
      icon: <ClipboardList size={24} />,
      href: "/doctor/profile/profileDoctorHome",
    },
    {
      key: "agenda",
      icon: <CalendarDays size={24} />,
      href: "/doctor/profile/agendaDoctor",
    },
    {
      key: "profile",
      icon: <User size={24} />,
      href: "/doctor/profile/settingDoctor",
    },
    {
      key: "reviews",
      icon: <Star size={24} />,
      href: "/doctor/profile/reviewsDoctor",
    },
  ],
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 mx-auto flex-row justify-between rounded-t-3xl bg-teal-900 px-10 py-4">
      {tabs.map((tab) => (
        <Link key={tab.key} href={tab.href} asChild>
          <TouchableOpacity
            onPress={() => onTabPress(tab.key)}
            className="items-center justify-center"
          >
            <View
              className={`${
                activeTab === tab.key ? "text-white" : "text-teal-400"
              }`}
            >
              {tab.icon}
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default DoctorBottomNavigation;
