import { Link, Stack } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BottomNavigation from "../../components/bottomNavigation";
import DoctorCard, { Doctor } from "../../components/doctorCard";

const DoctorsList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("explore");

  const categories = [
    "All",
    "General",
    "Cardiologist",
    "Dentist",
    "Dermatologist",
  ];

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. David Patel",
      specialty: "Cardiologist",
      location: "Cardiology Center, USA",
      rating: 5,
      reviews: 1872,
      image: "https://picsum.photos/80/80?random=1",
    },
    {
      id: "2",
      name: "Dr. Maria Gomez",
      specialty: "Dermatologist",
      location: "SkinCare Clinic, USA",
      rating: 4.8,
      reviews: 964,
      image: "https://picsum.photos/80/80?random=2",
    },
    {
      id: "3",
      name: "Dr. James Wilson",
      specialty: "Neurologist",
      location: "Neuro Center, USA",
      rating: 4.9,
      reviews: 1250,
      image: "https://picsum.photos/80/80?random=3",
    },
    {
      id: "4",
      name: "Dr. Sarah Chen",
      specialty: "Dentist",
      location: "Dental Care Center, USA",
      rating: 4.7,
      reviews: 843,
      image: "https://picsum.photos/80/80?random=4",
    },
    {
      id: "5",
      name: "Dr. Robert Taylor",
      specialty: "General Physician",
      location: "General Hospital, USA",
      rating: 4.6,
      reviews: 1567,
      image: "https://picsum.photos/80/80?random=5",
    },
  ];

  // Filtro de doctores segun categoría y/o búsqueda
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesCategory =
      selectedCategory === "All" || doctor.specialty === selectedCategory;
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handleDoctorPress = (doctor: Doctor) => {
    console.log("Doctor pressed:", doctor.name);
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <Link href=".." asChild>
          <TouchableOpacity className="w-10 h-10 justify-center items-center">
            <ChevronLeft size={24} color="#374151" />
          </TouchableOpacity>
        </Link>
        <Text className="text-lg font-semibold text-gray-800">All Doctors</Text>
        <TouchableOpacity className="w-10 h-10 justify-center items-center">
          <View className="w-9 h-9 rounded-full bg-teal-100 justify-center items-center">
            <Text className="text-base">👤</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-white mx-4 mt-4 mb-3 px-3 rounded-xl border border-gray-200">
        <Search size={20} color="#9ca3af" className="absolute left-3 top-3" />
        <TextInput
          placeholder="Search Doctor, Hospital"
          placeholderTextColor="#9ca3af"
          className="w-full rounded-lg bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-800 focus:outline-none"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-12 mb-3"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`px-5 py-2.5 rounded-full mr-2 border ${
              selectedCategory === category
                ? "bg-teal-800 border-teal-800"
                : "bg-white border-gray-200"
            }`}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedCategory === category ? "text-white" : "text-gray-600"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <Text className="text-base font-semibold text-gray-800">
          {filteredDoctors.length} doctors found
        </Text>
        <TouchableOpacity className="px-3 py-1.5">
          <Text className="text-sm text-gray-600">Default ⇅</Text>
        </TouchableOpacity>
      </View>

      {/* Doctors List usando DoctorCard */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onPress={handleDoctorPress}
          />
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

export default DoctorsList;
