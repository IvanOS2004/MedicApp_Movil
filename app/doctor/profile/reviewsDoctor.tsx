import { router, Stack } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReviewsDoctor() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const [reviews] = useState([
    {
      id: 1,
      name: "Lucía Martínez",
      rating: 5,
      comment: "Excelente atención, el doctor fue muy amable y profesional.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "Carlos Gómez",
      rating: 4,
      comment:
        "Muy buena consulta, explicó todo con claridad. Solo tardó un poco en comenzar.",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      id: 3,
      name: "Andrea López",
      rating: 5,
      comment: "Súper recomendable, me ayudó mucho con mi tratamiento.",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: 4,
      name: "Luis Torres",
      rating: 3,
      comment: "Buena atención pero la sala de espera estaba muy llena.",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      id: 5,
      name: "Fernanda Ruiz",
      rating: 5,
      comment: "El mejor doctor que he visitado, muy profesional.",
      image: "https://randomuser.me/api/portraits/women/41.jpg",
    },
  ]);

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const ratingCounts = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => counts[r.rating]++);
    return counts;
  }, [reviews]);

  const maxCount = Math.max(...Object.values(ratingCounts));

  const filteredReviews =
    selectedRating === null
      ? reviews
      : reviews.filter((r) => r.rating === selectedRating);

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Reseñas y Valoraciones
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Promedio de estrellas */}
        <View className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-teal-100 items-center">
          <Text className="text-5xl font-bold text-teal-700 mb-1">
            {averageRating.toFixed(1)}
          </Text>
          <View className="flex-row mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                color={i < Math.round(averageRating) ? "#0D9488" : "#D1D5DB"}
                fill={i < Math.round(averageRating) ? "#0D9488" : "none"}
              />
            ))}
          </View>
          <Text className="text-gray-500 text-sm">
            Basado en {reviews.length} reseñas de pacientes
          </Text>
        </View>

        {/* Distribución de reseñas */}
        <View className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-teal-100">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Distribución de Reseñas
          </Text>

          {([5, 4, 3, 2, 1] as const).map((stars) => {
            const count = ratingCounts[stars];
            const barWidth = (count / maxCount) * 100 || 0;
            const isSelected = selectedRating === stars;

            return (
              <TouchableOpacity
                key={stars}
                className={`flex-row items-center mb-2 p-2 rounded-xl ${
                  isSelected ? "bg-teal-50 border border-teal-200" : ""
                }`}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedRating((prev) => (prev === stars ? null : stars))
                }
              >
                {/* Estrellas */}
                <View className="w-14 flex-row items-center justify-center">
                  <Text className="text-gray-700 text-sm font-semibold mr-1">
                    {stars}
                  </Text>
                  <Star size={16} color="#0D9488" fill="#0D9488" />
                </View>

                {/* Barra */}
                <View className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-3 bg-teal-600 rounded-full"
                    style={{ width: `${barWidth}%` }}
                  />
                </View>

                {/* Cantidad */}
                <Text className="w-8 text-right text-gray-700 font-medium ml-2">
                  {count}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Comentarios */}
        {filteredReviews.length > 0 ? (
          filteredReviews.map((r) => (
            <View
              key={r.id}
              className="bg-white rounded-2xl p-4 mb-4 border border-teal-100 shadow-sm"
            >
              <View className="flex-row items-center mb-2">
                <Image
                  source={{ uri: r.image }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">{r.name}</Text>
                  <View className="flex-row">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        color={i < r.rating ? "#0D9488" : "#D1D5DB"}
                        fill={i < r.rating ? "#0D9488" : "none"}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text className="text-gray-600">{r.comment}</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-500 text-center italic mb-10">
            No hay reseñas con {selectedRating} estrellas.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
