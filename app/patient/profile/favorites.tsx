import { Stack, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DoctorCard from "../../../components/doctorCard";

const Favorites = () => {
  const favoriteDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      specialty: "Dermatologist",
      rating: 4.9,
      reviews: 1247,
      image: "https://picsum.photos/80/80?random=doctor1",
      location: "SkinCare Clinic, NY",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      rating: 4.8,
      reviews: 892,
      image: "https://picsum.photos/80/80?random=doctor2",
      location: "Heart Center, LA",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      rating: 4.7,
      reviews: 567,
      image: "https://picsum.photos/80/80?random=doctor3",
      location: "Children's Hospital, TX",
    },
  ];

  const handleDoctorPress = (doctor) => {
    router.push({
      pathname: "/patient/doctorDetails",
      params: doctor,
    });
  };

  const handleBackPress = () => router.back();

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" />

      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={handleBackPress}
        >
          <ArrowLeft size={24} color="#134E4A" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Profile</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-4 pt-4">
          {favoriteDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onPress={handleDoctorPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;
