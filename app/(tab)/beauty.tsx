// screens/PainterHardware.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LocationHeader from "@/components/locationHeader";
import useCartStore from "../store/cartStore";
import { router } from "expo-router";

export default function PainterHardware() {
  const navigation = useNavigation();
  const addToCart = useCartStore((state) => state.addToCart);

  // Banner section
  const bannerData = [
    {
      id: "p1",
      title: "Professional Painters",
      subtitle: "Home & Office Solutions",
      btn: "Book Now",
      bg: "#FF6B00",
      img: require("../../assets/images/Painter-removebg-preview.png"), // Replace with relevant image
    },
    {
      id: "p2",
      title: "Furniture • Paint • Fixtures",
      subtitle: "Repairs & Installations",
      btn: "Get Service",
      bg: "#FF4500",
      img: require("../../assets/images/paint-removebg-preview.png"), // Replace with relevant image
    },
  ];

  // Categories
  const painterHardwareCategories = [
    { id: "1", title: "Wall Painting", icon: "format-paint" },
    { id: "2", title: "Furniture Repair", icon: "chair-rolling" },
    { id: "3", title: "Wood Work", icon: "tools" },
    { id: "4", title: "Plumbing Fix", icon: "pipe-wrench" },
    { id: "5", title: "Door & Window Setup", icon: "door" },
    { id: "6", title: "Decor & Fixtures", icon: "lamp" },
  ];

  // Service list
  const painterHardwareServices = [
    {
      id: "1",
      title: "Wall Painting",
      subtitle: "Interior & Exterior",
      proName: "Rajesh Kumar",
      description:
        "Professional painting services including primer, multiple coats, and finishing.",
      rating: 4.85,
      reviews: "320k",
      time: "2–4 hrs",
      price: 499,
      img: require("../../assets/images/home-wall-painting-114.jpg"),
      category: "1",
    },
    {
      id: "2",
      title: "Furniture Repair",
      subtitle: "Tables, Chairs, Cabinets",
      proName: "Furniture Masters",
      description:
        "Repair, polish, and restore furniture to extend lifespan and maintain aesthetics.",
      rating: 4.92,
      reviews: "210k",
      time: "1–2 hrs",
      price: 349,
      img: require("../../assets/images/furniture-repairing-services-1583389842-5325843-removebg-preview.png"),
      category: "2",
    },
    {
      id: "3",
      title: "Wood Work & Carpentry",
      subtitle: "Custom shelves, frames & more",
      proName: "Sanjay Carpenters",
      description:
        "Custom carpentry solutions including furniture, shelves, and repair services.",
      rating: 4.88,
      reviews: "150k",
      time: "3–5 hrs",
      price: 699,
      img: require("../../assets/images/carpenter-removebg-preview.png"),
      category: "3",
    },
    {
      id: "4",
      title: "Plumbing Services",
      subtitle: "Leaks, Pipes, Fixtures",
      proName: "Ajay Plumbing Co.",
      description:
        "Quick fixes for leakages, pipe replacements, and bathroom/kitchen fittings.",
      rating: 4.9,
      reviews: "180k",
      time: "30–60 mins",
      price: 299,
      img: require("../../assets/images/plumber-removebg-preview.png"),
      category: "4",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LocationHeader />

      {/* PAGE TITLE */}
      <View className="px-4 mt-4 mb-2">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="brush" size={26} color="#FF6B00" />
          <Text className="text-[22px] font-bold ml-2 text-gray-800">
            Painter & Hardware <Text className="text-gray-500">services</Text>
          </Text>
        </View>

        {/* SEARCH BAR */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-3 mt-4">
          <Ionicons name="search-outline" size={20} color="#777" />
          <TextInput
            placeholder="Search for ‘wall painting’, ‘furniture repair’"
            placeholderTextColor="#888"
            className="ml-2 flex-1"
          />
        </View>
      </View>

      {/* BANNER SECTION */}
      <FlatList
        data={bannerData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 16, paddingTop: 10 }}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: item.bg }}
            className="w-70 h-50 rounded-2xl mr-4 p-4 flex-row items-center"
          >
            <View style={{ flex: 1 }}>
              <Text className="text-white text-[18px] font-bold">
                {item.title}
              </Text>
              <Text className="text-white text-[13px] mt-1">
                {item.subtitle}
              </Text>

              <TouchableOpacity className="bg-yellow-400 w-28 py-1 rounded-full mt-4 items-center">
                <Text className="text-black font-semibold text-[12px]">
                  {item.btn}
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={item.img}
              className="w-24 h-24 rounded-lg ml-2"
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* CATEGORIES SECTION */}
      <View className="px-4 mt-5 flex-row flex-wrap justify-between">
        {painterHardwareCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.8}
            className="w-[30%] bg-gray-100 rounded-2xl p-3 mb-4 items-center"
            onPress={() =>
              router.push({
                pathname: "/CategoryProductsPainter",
                params: {
                  categoryId: cat.id,
                  title: cat.title,
                },
              })
            }
          >
            <MaterialCommunityIcons
              name={cat.icon}
              size={32}
              color="#FF6B00"
              style={{ marginBottom: 8 }}
            />
            <Text className="text-center text-[12px] font-medium text-gray-700">
              {cat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SERVICE LIST */}
      <View className="px-4 mt-2 mb-10">
        <Text className="text-[18px] font-bold text-gray-800 mb-3">
          Popular Painter & Hardware Services
        </Text>

        {painterHardwareServices.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-2xl p-3 mb-4 flex-row"
            style={{
              elevation: 2,
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Image
              source={item.img}
              className="w-24 h-24 rounded-xl mr-3"
              resizeMode="contain"
            />

            <View className="flex-1 justify-between">
              <View>
                <Text className="text-[15px] font-semibold text-gray-900">
                  {item.title}
                </Text>

                <Text className="text-[12px] text-gray-600 mt-1">
                  {item.subtitle}
                </Text>
                <Text className="text-[12px] text-blue-600 mt-1 font-medium">
                  By: {item.proName}
                </Text>

                <View className="flex-row items-center mt-2">
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text className="ml-1 text-[12px] text-gray-800">
                    {item.rating} ({item.reviews})
                  </Text>

                  <Text className="text-[12px] text-gray-500 mx-2">•</Text>

                  <Text className="text-[12px] text-gray-600">{item.time}</Text>
                </View>
              </View>

              {/* Price + Add */}
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-[15px] font-bold text-gray-900">
                  Rs. {item.price}
                </Text>

                <TouchableOpacity
                  onPress={() => addToCart(item)}
                  className="bg-[#FF6B00] px-4 py-2 rounded-full"
                >
                  <Text className="text-white text-[13px] font-semibold">
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
