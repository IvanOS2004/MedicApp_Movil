import { Stack } from "expo-router";
import {
  ArrowLeft,
  Award,
  CreditCard,
  Edit,
  MapPin,
  Star,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DoctorBottomNavigation from "../../../components/doctorBottomNavigation";

export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);

  const [doctor, setDoctor] = useState({
    name: "Dr. Alejandro Ramírez",
    specialty: "Cardiólogo",
    location: "Clínica Corazón Saludable, CDMX",
    experience: 12,
    patients: 1250,
    rating: 4.9,
    about:
      "Soy un cardiólogo con más de 12 años de experiencia ayudando a pacientes a mejorar su salud cardiovascular. Me apasiona la medicina preventiva y el bienestar integral.",
    image: "https://picsum.photos/200/200?random=doctorprofile",
    workingTime: "Lunes - Viernes, 8:00 AM - 5:00 PM",
    card: "**** **** **** 4589",
  });

  const reviews = [
    {
      id: 1,
      name: "Carlos Martínez",
      rating: 5,
      comment: "Excelente atención y trato profesional.",
      date: "Hace 2 días",
    },
    {
      id: 2,
      name: "María López",
      rating: 5,
      comment: "Muy humano y atento. Lo recomiendo ampliamente.",
      date: "Hace 1 semana",
    },
  ];

  const handleSave = () => {
    setEditing(false);
    Alert.alert(
      "Perfil actualizado",
      "Tu información fue guardada correctamente."
    );
  };

  const renderStars = (rating: number) => (
    <View className="flex-row">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          color={i < Math.round(rating) ? "#F59E0B" : "#D1D5DB"}
          fill={i < Math.round(rating) ? "#F59E0B" : "none"}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={() =>
            Alert.alert("Regresar", "Implementa la navegación según tu flujo.")
          }
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Perfil del Doctor
        </Text>
        <TouchableOpacity onPress={() => setEditing(!editing)}>
          <Edit size={22} color="#0D9488" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Card */}
        <View className="bg-white rounded-3xl mx-4 p-5 mb-4 flex-row items-center">
          <Image
            source={{ uri: doctor.image }}
            className="w-24 h-24 rounded-2xl bg-teal-200"
          />
          <View className="flex-1 ml-4">
            {editing ? (
              <TextInput
                className="text-lg font-bold text-gray-900 mb-1 border-b border-teal-300"
                value={doctor.name}
                onChangeText={(t) => setDoctor({ ...doctor, name: t })}
              />
            ) : (
              <Text className="text-lg font-bold text-gray-900 mb-1">
                {doctor.name}
              </Text>
            )}
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

        {/* Stats */}
        <View className="bg-teal-200 rounded-3xl mx-4 p-5 mb-6">
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-2">
                <Users size={22} color="#0D9488" />
              </View>
              <Text className="text-teal-900 font-bold text-base">
                {doctor.patients}+
              </Text>
              <Text className="text-teal-700 text-xs">Pacientes</Text>
            </View>
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-2">
                <Award size={22} color="#0D9488" />
              </View>
              <Text className="text-teal-900 font-bold text-base">
                {doctor.experience}+
              </Text>
              <Text className="text-teal-700 text-xs">Años</Text>
            </View>
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-2">
                <Star size={22} color="#0D9488" />
              </View>
              <Text className="text-teal-900 font-bold text-base">
                {doctor.rating}
              </Text>
              <Text className="text-teal-700 text-xs">Rating</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Sobre mí</Text>
          {editing ? (
            <TextInput
              multiline
              className="bg-white rounded-2xl p-4 text-sm text-gray-700 border border-teal-200"
              value={doctor.about}
              onChangeText={(t) => setDoctor({ ...doctor, about: t })}
            />
          ) : (
            <View className="bg-white rounded-2xl p-4">
              <Text className="text-sm text-gray-700 leading-5">
                {doctor.about}
              </Text>
            </View>
          )}
        </View>

        {/* Horario */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Horario</Text>
          {editing ? (
            <TextInput
              className="bg-white rounded-2xl p-4 text-sm text-gray-700 border border-teal-200"
              value={doctor.workingTime}
              onChangeText={(t) => setDoctor({ ...doctor, workingTime: t })}
            />
          ) : (
            <View className="bg-white rounded-2xl p-4">
              <Text className="text-sm text-gray-700">
                {doctor.workingTime}
              </Text>
            </View>
          )}
        </View>

        {/* Método de pago */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Método de pago
          </Text>
          <View className="bg-white rounded-2xl p-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <CreditCard size={22} color="#0D9488" />
              <Text className="text-gray-800 ml-3">{doctor.card}</Text>
            </View>
            {editing && (
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Editar método de pago",
                    "Conectar Stripe o agregar nueva tarjeta."
                  )
                }
              >
                <Edit size={20} color="#0D9488" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Reseñas */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Reseñas</Text>
          {reviews.map((r) => (
            <View
              key={r.id}
              className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
            >
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-gray-800 font-semibold">{r.name}</Text>
                {renderStars(r.rating)}
              </View>
              <Text className="text-gray-500 text-xs mb-1">{r.date}</Text>
              <Text className="text-sm text-gray-600">{r.comment}</Text>
            </View>
          ))}
        </View>

        {/* Guardar cambios */}
        {editing && (
          <TouchableOpacity
            className="bg-teal-800 py-4 mx-4 rounded-full items-center"
            onPress={handleSave}
          >
            <Text className="text-white font-bold text-base">
              Guardar Cambios
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      <DoctorBottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}
