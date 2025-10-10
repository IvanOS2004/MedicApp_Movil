import {
  Calendar,
  ChevronRight,
  Heart,
  Home,
  MapPin,
  Navigation,
  Search,
  Star,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MedicalAppUI() {
  const [activeTab, setActiveTab] = useState("home");

  const categories = [
    { name: "Dentistry", icon: "🦷", color: "bg-rose-200" },
    { name: "Cardio...", icon: "💚", color: "bg-emerald-200" },
    { name: "Pulmono...", icon: "🫁", color: "bg-orange-200" },
    { name: "General", icon: "💜", color: "bg-purple-200" },
    { name: "Neurology", icon: "🧠", color: "bg-indigo-900" },
    { name: "Gastroen...", icon: "🫃", color: "bg-indigo-700" },
    { name: "Laborato...", icon: "👶", color: "bg-rose-300" },
    { name: "Vaccinat...", icon: "💉", color: "bg-cyan-200" },
  ];

  const doctors = [
    {
      name: "Dr. David Patel",
      specialty: "Cardiologist",
      location: "Cardiology Center, USA",
      rating: 5,
      reviews: 1872,
    },
    {
      name: "Dr. Maria Gomez",
      specialty: "Dermatologist",
      location: "SkinCare Clinic, USA",
      rating: 4.8,
      reviews: 964,
    },
  ];

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
            <View className="relative h-8 w-8 items-center justify-center rounded-full bg-teal-700">
              <View className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
              <Text className="text-xs text-white">👤</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View className="relative">
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

        {/* Hero Banner */}
        <View className="relative mx-4 mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700 to-teal-600 p-5">
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="mb-1 text-xs text-white">
                Trusted doctor on your schedule ✓
              </Text>
              <Text className="mb-3 text-2xl font-bold text-white">
                Consult A Doctor{"\n"}— Book Today!
              </Text>
              <View className="flex-row items-center gap-2">
                <View className="flex-row -space-x-2">
                  <View className="h-7 w-7 rounded-full border-2 border-white bg-pink-300" />
                  <View className="h-7 w-7 rounded-full border-2 border-white bg-blue-300" />
                  <View className="h-7 w-7 rounded-full border-2 border-white bg-purple-300" />
                </View>
                <Text className="text-xs text-white">
                  <Text className="font-bold">40,000+</Text>
                  {"\n"}Happy Patients
                </Text>
              </View>
            </View>
            <View className="h-32 w-28 items-center justify-end rounded-xl bg-teal-500">
              <Text className="mb-2 text-6xl">👨‍⚕️</Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6 px-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-800">Categories</Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-teal-600">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {categories.map((cat, idx) => (
              <View key={idx} className="w-[22%] mb-4 items-center">
                <View
                  className={`h-16 w-16 ${cat.color} mb-2 items-center justify-center rounded-xl`}
                >
                  <Text className="text-2xl">{cat.icon}</Text>
                </View>
                <Text className="text-center text-xs text-gray-700">
                  {cat.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

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

          {doctors.map((doctor, idx) => (
            <View
              key={idx}
              className="mb-3 flex-row items-start gap-3 rounded-xl bg-white p-4 shadow"
            >
              <View className="h-20 w-20 rounded-xl bg-gradient-to-b from-pink-200 to-pink-300" />
              <View className="flex-1">
                <Text className="mb-1 font-bold text-gray-800">
                  {doctor.name}
                </Text>
                <Text className="mb-1 text-sm text-teal-600">
                  {doctor.specialty}
                </Text>
                <View className="mb-2 flex-row items-center gap-1">
                  <MapPin size={12} color="#6b7280" />
                  <Text className="text-xs text-gray-500">
                    {doctor.location}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Star size={14} color="#f97316" fill="#f97316" />
                  <Text className="text-sm font-medium text-gray-700">
                    {doctor.rating}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    | {doctor.reviews} Reviews
                  </Text>
                </View>
              </View>
              <Heart size={20} color="#d1d5db" />
            </View>
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
      <View className="absolute bottom-0 left-0 right-0 mx-auto flex-row justify-between rounded-t-3xl bg-teal-900 px-6 py-4">
        {[
          { key: "home", icon: <Home size={24} /> },
          { key: "explore", icon: <Navigation size={24} /> },
          { key: "calendar", icon: <Calendar size={24} /> },
          { key: "profile", icon: <User size={24} /> },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            className={`items-center ${
              activeTab === tab.key ? "text-white" : "text-teal-400"
            }`}
          >
            {tab.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
