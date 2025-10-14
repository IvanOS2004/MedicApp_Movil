import { Stack, router } from "expo-router";
import { ArrowLeft, Bell } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppointmentCard, { Appointment } from "../../components/appointmentCard";
import BottomNavigation from "../../components/bottomNavigation";

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Completed">(
    "Upcoming"
  );
  const [bottomNavTab, setBottomNavTab] = useState("calendar");

  const upcomingAppointments: Appointment[] = [
    {
      id: 1,
      date: "May 22, 2023",
      time: "10:00 AM",
      doctorName: "Dr. James Robinson",
      specialty: "Orthopedic Surgery",
      clinic: "Elite Ortho Clinic, USA",
      image: "https://picsum.photos/100/100?random=1",
      status: "upcoming",
    },
    {
      id: 2,
      date: "June 15, 2023",
      time: "2:30 PM",
      doctorName: "Dr. Sarah Chen",
      specialty: "Cardiologist",
      clinic: "Heart Care Center, USA",
      image: "https://picsum.photos/100/100?random=2",
      status: "upcoming",
    },
  ];

  const completedAppointments: Appointment[] = [
    {
      id: 3,
      date: "April 10, 2023",
      time: "11:00 AM",
      doctorName: "Dr. Michael Brown",
      specialty: "Dermatologist",
      clinic: "Skin Health Clinic, USA",
      image: "https://picsum.photos/100/100?random=3",
      status: "completed",
    },
    {
      id: 4,
      date: "March 28, 2023",
      time: "9:15 AM",
      doctorName: "Dr. Maria Garcia",
      specialty: "Pediatrician",
      clinic: "Children's Hospital, USA",
      image: "https://picsum.photos/100/100?random=4",
      status: "completed",
    },
  ];

  const handleCancel = (appointment: Appointment) => {
    console.log("Cancel appointment:", appointment.id);
    alert(`Appointment with ${appointment.doctorName} cancelled`);
  };

  const handleReschedule = (appointment: Appointment) => {
    console.log("Reschedule appointment:", appointment.id);
    alert(`Reschedule appointment with ${appointment.doctorName}`);
  };

  const handleAddReview = (appointment: Appointment) => {
    console.log("Add review for appointment:", appointment.id);
    alert(`Add review for ${appointment.doctorName}`);
  };

  const handleBookAgain = (appointment: Appointment) => {
    console.log("Book again appointment:", appointment.id);
    alert(`Book again with ${appointment.doctorName}`);
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleBottomNavPress = (tabKey: string) => {
    setBottomNavTab(tabKey);
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#CCEFEF" />

      <Stack.Screen
        options={{
          headerShown: false,
          title: "My Appointments",
        }}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-teal-50">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={handleBackPress}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          My Appointments
        </Text>
        {/* Notification Badge */}
        <TouchableOpacity className="w-10 h-10 justify-center items-center relative">
          <Bell size={24} color="#1F2937" />
          <View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row px-4 mb-6">
        <TouchableOpacity
          className={`flex-1 pb-2 border-b-2 ${
            activeTab === "Upcoming" ? "border-teal-800" : "border-transparent"
          }`}
          onPress={() => setActiveTab("Upcoming")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "Upcoming" ? "text-teal-800" : "text-gray-400"
            }`}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 pb-2 border-b-2 ${
            activeTab === "Completed" ? "border-teal-800" : "border-transparent"
          }`}
          onPress={() => setActiveTab("Completed")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "Completed" ? "text-teal-800" : "text-gray-400"
            }`}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {activeTab === "Upcoming" && (
          <>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={handleCancel}
                  onReschedule={handleReschedule}
                />
              ))
            ) : (
              <View className="flex-1 justify-center items-center px-4 mt-10">
                <Text className="text-gray-400 text-center text-lg">
                  No upcoming appointments
                </Text>
                <Text className="text-gray-400 text-center mt-2">
                  Book an appointment to see it here
                </Text>
              </View>
            )}
          </>
        )}

        {activeTab === "Completed" && (
          <>
            {completedAppointments.length > 0 ? (
              completedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onAddReview={handleAddReview}
                  onBookAgain={handleBookAgain}
                />
              ))
            ) : (
              <View className="flex-1 justify-center items-center px-4 mt-10">
                <Text className="text-gray-400 text-center text-lg">
                  No completed appointments
                </Text>
                <Text className="text-gray-400 text-center mt-2">
                  Completed appointments will appear here
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={bottomNavTab}
        onTabPress={handleBottomNavPress}
      />
    </SafeAreaView>
  );
};

export default MyAppointments;
