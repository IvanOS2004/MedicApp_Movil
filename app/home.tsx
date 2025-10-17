import { Calendar, ChevronRight, MapPin, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BottomNavigation from "../components/bottomNavigation";
import Carousel from "../components/carousel";
import Categories, { Category } from "../components/categories";
import DoctorCard, { Doctor } from "../components/doctorCard";

export default function home() {
  const [activeTab, setActiveTab] = useState("home");

  const categories: Category[] = [
    {
      name: "Dentistry",
      icon: "🦷",
      color: "bg-rose-200",
    },
    {
      name: "Cardio...",
      icon: "💚",
      color: "bg-emerald-200",
    },
    {
      name: "Pulmono...",
      icon: "🫁",
      color: "bg-orange-200",
    },
    {
      name: "General",
      icon: "💜",
      color: "bg-purple-200",
    },
    {
      name: "Neurology",
      icon: "🧠",
      color: "bg-indigo-900",
    },
    {
      name: "Gastroen...",
      icon: "🫃",
      color: "bg-indigo-700",
    },
    {
      name: "Laborato...",
      icon: "👶",
      color: "bg-rose-300",
    },
    {
      name: "Vaccinat...",
      icon: "💉",
      color: "bg-cyan-200",
    },
  ];

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. David Patel",
      specialty: "Cardiologist",
      location: "Cardiology Center, USA",
      rating: 5,
      reviews: 1872,
    },
    {
      id: "2",
      name: "Dr. Maria Gomez",
      specialty: "Dermatologist",
      location: "SkinCare Clinic, USA",
      rating: 4.8,
      reviews: 964,
    },
  ];

  // Función press de doctores
  const handleDoctorPress = (doctor: Doctor) => {
    console.log("Doctor pressed:", doctor.name);
  };

  // Función press de categorías
  const handleCategoryPress = (category: Category) => {
    console.log("Category pressed:", category.name);
  };

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    console.log("Tab pressed:", tabKey);
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-teal-50 to-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="bg-white p-4 pb-6">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <MapPin size={18} color="#0f766e" />
              <Text className="text-sm font-medium text-gray-800">
                Seattle, USA
              </Text>
              <ChevronRight size={16} color="#9ca3af" />
            </View>
            {/* Notificationes */}
            <View className="relative h-8 w-8 items-center justify-center rounded-full bg-teal-700">
              <View className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
              <Text className="text-xs text-white">👤</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white mx-4 mt-4 mb-3 px-3 rounded-xl border border-gray-200">
            <Search
              size={20}
              color="#9ca3af"
              className="absolute left-3 top-3"
            />
            <TextInput
              placeholder="Search Doctor, Hospital"
              placeholderTextColor="#9ca3af"
              className="w-full rounded-lg bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-800 focus:outline-none"
            />
          </View>
        </View>

        {/* Carousel */}
        <Carousel autoPlay={true} interval={4000} />

        {/* Categories */}
        <Categories
          categories={categories}
          showHeader={true}
          onCategoryPress={handleCategoryPress}
        />

        {/* Nearby Medical Centers */}
        <View className="mb-6 px-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-800">
              Nearby Medical Centers
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-teal-600">See All</Text>
            </TouchableOpacity>
          </View>

          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onPress={handleDoctorPress}
            />
          ))}
        </View>

        {/* Upcoming Appointments */}
        <View className="mb-6 px-4">
          <View className="rounded-2xl bg-gradient-to-br from-teal-800 to-teal-700 p-5">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-white">
                Upcoming Appointments
              </Text>
              <ChevronRight size={20} color="#fff" />
            </View>

            <View className="mb-4 flex-row justify-between gap-4">
              <View className="flex-1 flex-row items-center gap-3 rounded-xl bg-teal-900/40 p-3">
                <Calendar size={24} color="#fff" />
                <View>
                  <Text className="text-xs text-white">Mon, 11 June 2024</Text>
                  <Text className="text-xs text-teal-200">
                    Appointment Date
                  </Text>
                </View>
              </View>
              <View className="flex-1 flex-row items-center gap-3 rounded-xl bg-teal-900/40 p-3">
                <Text className="text-2xl text-white">🕐</Text>
                <View>
                  <Text className="text-xs text-white">08:00 - 12:00</Text>
                  <Text className="text-xs text-teal-200">Time</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-xl bg-white p-3">
              <View className="h-12 w-12 rounded-full bg-teal-100" />
              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-800">
                  Dr. Strange Walker
                </Text>
                <Text className="text-xs text-gray-500">
                  Internal Specialist Doctor
                </Text>
              </View>
              <TouchableOpacity className="h-8 w-8 items-center justify-center rounded-lg border-2 border-teal-600">
                <Text className="text-lg text-teal-600">💬</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}
