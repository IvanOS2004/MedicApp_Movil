import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Award,
  Heart,
  MapPin,
  MessageCircle,
  Star,
  Users,
} from "lucide-react-native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  image?: string;
  patients?: number;
  experience?: number;
  about?: string;
  workingTime?: string;
}

const DoctorDetails = () => {
  const [bottomNavTab, setBottomNavTab] = React.useState("profile");
  const params = useLocalSearchParams();

  const doctor: Doctor = {
    id: (params.id as string) || "1",
    name: (params.name as string) || "Dr. David Patel",
    specialty: (params.specialty as string) || "Cardiologist",
    location: (params.location as string) || "Golden Cardiology Center",
    rating: params.rating ? parseFloat(params.rating as string) : 5,
    reviews: params.reviews ? parseInt(params.reviews as string) : 1872,
    image:
      (params.image as string) || "https://picsum.photos/80/80?random=doctor",
    patients: 2000,
    experience: 10,
    about:
      "Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in sunny CA. With over 10 years of experience, he specializes in interventional cardiology and has helped thousands of patients achieve better heart health.",
    workingTime: "Monday-Friday, 08:00 AM-18:00 PM",
  };

  const stats = [
    {
      icon: Users,
      label: "patients",
      value: `${doctor.patients?.toLocaleString()}+`,
      color: "#0D9488",
    },
    {
      icon: Award,
      label: "experience",
      value: `${doctor.experience}+`,
      color: "#0D9488",
    },
    {
      icon: Star,
      label: "rating",
      value: doctor.rating.toString(),
      color: "#0D9488",
    },
    {
      icon: MessageCircle,
      label: "reviews",
      value: doctor.reviews.toLocaleString(),
      color: "#0D9488",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Emily Anderson",
      rating: 5,
      date: "3 days ago",
      comment:
        "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
      avatar: "https://picsum.photos/40/40?random=review1",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      date: "1 week ago",
      comment:
        "Outstanding care and attention to detail. Dr. Patel took the time to explain everything clearly and made me feel comfortable throughout the process.",
      avatar: "https://picsum.photos/40/40?random=review2",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "The best cardiologist I've ever visited. Professional, knowledgeable, and very caring. My heart health has improved significantly under his care.",
      avatar: "https://picsum.photos/40/40?random=review3",
    },
  ];

  const handleBackPress = () => {
    router.back();
  };

  // Función favoritos
  const handleFavoritePress = () => {
    console.log("Toggle favorite for:", doctor.name);
  };

  // Función reserva de cita
  const handleBookAppointment = () => {
    console.log("Book appointment with:", doctor.name);
  };

  const renderStat = (stat: any, index: number) => {
    const Icon = stat.icon;
    return (
      <View key={index} className="items-center flex-1">
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-2">
          <Icon size={24} color={stat.color} />
        </View>
        <Text className="text-teal-900 font-bold text-base mb-0.5">
          {stat.value}
        </Text>
        <Text className="text-teal-700 text-xs capitalize">{stat.label}</Text>
      </View>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            color={i < rating ? "#F59E0B" : "#D1D5DB"}
            fill={i < rating ? "#F59E0B" : "none"}
          />
        ))}
      </View>
    );
  };

  const renderReview = (review: any) => (
    <View key={review.id} className="bg-white rounded-2xl p-4 mb-3">
      <View className="flex-row items-start mb-3">
        <Image
          source={{ uri: review.avatar }}
          className="w-10 h-10 rounded-full bg-pink-200"
        />
        <View className="flex-1 ml-3">
          <Text className="text-base font-bold text-gray-900 mb-1">
            {review.name}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-teal-800 font-semibold text-sm mr-2">
              {review.rating}.0
            </Text>
            {renderStars(review.rating)}
          </View>
        </View>
        <Text className="text-xs text-gray-400">{review.date}</Text>
      </View>
      <Text className="text-sm text-gray-600 leading-5">{review.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />

      <Stack.Screen
        options={{
          headerShown: false,
          title: "Doctor Details",
        }}
      />

      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={handleBackPress}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Doctor Details
        </Text>
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={handleFavoritePress}
        >
          <Heart size={24} color="#1F2937" fill="none" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Doctor Profile Card */}
        <View className="mx-4 mb-4">
          <View className="bg-white rounded-3xl p-4 flex-row items-center">
            <Image
              source={{ uri: doctor.image }}
              className="w-20 h-20 rounded-2xl bg-pink-200"
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-gray-900 mb-1">
                {doctor.name}
              </Text>
              <Text className="text-sm text-teal-700 mb-1">
                {doctor.specialty}
              </Text>
              <View className="flex-row items-center">
                <MapPin size={14} color="#6B7280" />
                <Text className="text-xs text-gray-500 ml-1">
                  {doctor.location}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Dinámicas */}
        <View className="mx-4 mb-6">
          <View className="bg-teal-200 rounded-3xl p-5">
            <View className="flex-row justify-between">
              {stats.map((stat, index) => renderStat(stat, index))}
            </View>
          </View>
        </View>

        {/* About Me */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">About me</Text>
          <View className="bg-white rounded-2xl p-4">
            <Text className="text-sm text-gray-600 leading-5">
              {doctor.about}
            </Text>
          </View>
        </View>

        {/* Working Time */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Working Time
          </Text>
          <View className="bg-white rounded-2xl p-4">
            <Text className="text-sm text-gray-700">{doctor.workingTime}</Text>
          </View>
        </View>

        {/* Reviews */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-900">Reviews</Text>
            <TouchableOpacity>
              <Text className="text-sm text-teal-700 font-semibold">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          {reviews.map((review) => renderReview(review))}
        </View>

        {/* Spacing para el botón */}
        <View className="h-12" />
      </ScrollView>

      <View className="absolute bottom-1 left-0 right-0 px-4 pb-3 bg-transparent">
        <TouchableOpacity
          className="bg-teal-800 py-4 rounded-full items-center shadow-lg"
          onPress={handleBookAppointment}
        >
          <Text className="text-white font-bold text-base">
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetails;
