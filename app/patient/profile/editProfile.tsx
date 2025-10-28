import { Stack, router } from "expo-router";
import { ArrowLeft, Edit } from "lucide-react-native";
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

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Daniel",
    lastName: "Martinez",
    email: "daniel.martinez@email.com",
    phone: "+123 856479683",
    dateOfBirth: "1990-05-15",
    gender: "Male",
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBackPress = () => router.back();

  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully!");
    router.back();
  };

  const handleChangePhoto = () => {
    Alert.alert("Change Photo", "Photo change functionality would go here");
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-50">
      <StatusBar barStyle="dark-content" backgroundColor="#99F6E4" />
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
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Profile Section */}
        <View className="items-center px-4 mb-6">
          <View className="relative mb-4">
            <Image
              source={{
                uri: "https://picsum.photos/140/140?random=profile",
              }}
              className="w-36 h-36 rounded-full bg-gray-300"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 w-10 h-10 bg-teal-800 rounded-full items-center justify-center border-4 border-teal-50 active:bg-teal-900"
              onPress={handleChangePhoto}
            >
              <Edit size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text className="text-xl font-bold text-gray-900 mb-1">
            {profileData.firstName} {profileData.lastName}
          </Text>
          <Text className="text-sm text-gray-500">{profileData.phone}</Text>
        </View>

        {/* Form */}
        <View className="px-4">
          <View className="bg-teal-50 rounded-2xl p-5 mb-6 border border-gray-200">
            <Text className="text-lg font-bold text-black mb-4">
              Personal Information
            </Text>

            {/* Name fields */}
            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-black mb-2">
                  First Name
                </Text>
                <TextInput
                  className="bg-[#CCFBF1] border border-gray-300 rounded-xl px-4 py-3 text-black"
                  value={profileData.firstName}
                  onChangeText={(value) =>
                    handleInputChange("firstName", value)
                  }
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-black mb-2">
                  Last Name
                </Text>
                <TextInput
                  className="bg-[#CCFBF1] border border-gray-300 rounded-xl px-4 py-3 text-black"
                  value={profileData.lastName}
                  onChangeText={(value) => handleInputChange("lastName", value)}
                />
              </View>
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-black mb-2">Email</Text>
              <TextInput
                className="bg-[#CCFBF1] border border-gray-300 rounded-xl px-4 py-3 text-black"
                keyboardType="email-address"
                value={profileData.email}
                onChangeText={(value) => handleInputChange("email", value)}
              />
            </View>

            {/* Phone */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-black mb-2">Phone</Text>
              <TextInput
                className="bg-[#CCFBF1] border border-gray-300 rounded-xl px-4 py-3 text-black"
                keyboardType="phone-pad"
                value={profileData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
              />
            </View>

            {/* Date of Birth */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-black mb-2">
                Date of Birth
              </Text>
              <TextInput
                className="bg-[#CCFBF1] border border-gray-300 rounded-xl px-4 py-3 text-black"
                value={profileData.dateOfBirth}
                onChangeText={(value) =>
                  handleInputChange("dateOfBirth", value)
                }
              />
            </View>

            {/* Gender */}
            <View>
              <Text className="text-sm font-medium text-black mb-2">
                Gender
              </Text>
              <TextInput
                className="bg-[#CCFBF1] border border-gray-300 rounded-xl px-4 py-3 text-black"
                value={profileData.gender}
                onChangeText={(value) => handleInputChange("gender", value)}
              />
            </View>

            <TouchableOpacity
              onPress={handleSave}
              className="bg-teal-800 rounded-xl mt-6 py-3 items-center active:bg-teal-900"
            >
              <Text className="text-white font-semibold text-base">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
