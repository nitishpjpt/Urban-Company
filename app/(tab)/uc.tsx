import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import LocationHeader from "../../components/locationHeader";
import { MaterialIcons } from "@expo/vector-icons";

const categories = [
  {
    id: "painter",
    name: "Painter",
    image: require("../../assets/images/Painter-removebg-preview.png"),
  },
  {
    id: "electrician",
    name: "Electrician",
    image: require("../../assets/images/bulb-removebg-preview.png"),
  },
  {
    id: "plumber",
    name: "Plumber",
    image: require("../../assets/images/plumber.jpg"),
  },
  {
    id: "acservice",
    name: "AC Service",
    image: require("../.././assets/images/worker-removebg-preview.png"),
  },
];

export default function BookService() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-[#F6F7FB]">
      <LocationHeader />

      {/* Header Title */}
      <View className="px-5 mt-5">
        <Text className="text-3xl font-bold text-[#1A1A1A]">Book a Service</Text>
        <Text className="text-gray-500 mt-2 text-base">
          Choose a category to continue
        </Text>
      </View>

      {/* Category Cards */}
      <View className="flex-row flex-wrap justify-between px-4 pt-6 pb-10">
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            className="w-[48%] bg-white rounded-2xl mb-10"
            style={{
              elevation: 6,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 6,
              padding: 16,
            }}
            onPress={() =>
              router.push({
                pathname: "/ProviderList",
                params: { category: JSON.stringify(item) },
              })
            }
          >
            {/* Image Container */}
            <View className="bg-[#F0F4FF] rounded-2xl items-center justify-center p-4">
              <Image
                source={item.image}
                className="h-48 w-full"
                resizeMode="center"
              />
            </View>

            {/* Text */}
            <View className="mt-4 flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold text-[#1A1A1A]">{item.name}</Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Trusted & Verified Experts
                </Text>
              </View>

            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
