import { Link } from "expo-router";
import { Heart, MapPin, Star } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  image?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onPress?: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(doctor);
    }
  };

  return (
    <Link
      href={{
        pathname: "/patient/doctorDetails",
        params: {
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          location: doctor.location,
          rating: doctor.rating.toString(),
          reviews: doctor.reviews.toString(),
          image: doctor.image || "https://picsum.photos/80/80?random=doctor",
        },
      }}
      asChild
    >
      <TouchableOpacity
        onPress={handlePress}
        className="mb-3 flex-row items-start gap-3 rounded-xl bg-white p-4 border border-gray-200 active:bg-gray-50"
      >
        {/* Avatar/Image del doctor */}
        <View className="h-20 w-20 rounded-xl bg-gradient-to-b from-pink-200 to-pink-300 items-center justify-center">
          <Text className="text-2xl">👨‍⚕️</Text>
        </View>

        {/* Información del doctor */}
        <View className="flex-1">
          <Text className="mb-1 text-lg font-bold text-gray-800">
            {doctor.name}
          </Text>
          <Text className="mb-1 text-sm text-teal-600 font-medium">
            {doctor.specialty}
          </Text>

          {/* Ubicación */}
          <View className="mb-2 flex-row items-center gap-1">
            <MapPin size={12} color="#6b7280" />
            <Text className="text-xs text-gray-500 flex-1">
              {doctor.location}
            </Text>
          </View>

          {/* Rating y reviews */}
          <View className="flex-row items-center gap-1">
            <Star size={14} color="#f97316" fill="#f97316" />
            <Text className="text-sm font-medium text-gray-700">
              {doctor.rating}
            </Text>
            <Text className="text-xs text-gray-400">
              | {doctor.reviews.toLocaleString()} Reviews
            </Text>
          </View>
        </View>

        {/* Botón de favoritos */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            console.log("Toggle favorite for:", doctor.name);
          }}
          className="p-1"
        >
          <Heart size={20} color="#d1d5db" fill="none" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

export default DoctorCard;
