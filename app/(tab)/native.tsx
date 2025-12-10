// screens/Electrician.js
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

export default function Electrician() {
  const navigation = useNavigation();
  const addToCart = useCartStore((state) => state.addToCart);

  const bannerData = [
    {
      id: "e1",
      title: "Safe & Certified Electricians",
      subtitle: "Quick fixes for your home",
      btn: "Book Now",
      bg: "#0054FF",
      img: require("../../assets/images/certified-removebg-preview.png"),
    },
    {
      id: "e2",
      title: "Fan • Light • Switchboard",
      subtitle: "Installations & repairs",
      btn: "Get Service",
      bg: "#003B99",
      img: require("../../assets/images/switchboard-removebg-preview.png"),
    },
  ];

  const electricianCategories = [
    { id: "1", title: "Switches & Boards", icon: "toggle-switch" },
    { id: "2", title: "Lights & LED", icon: "lightbulb-on-outline" },
    { id: "3", title: "Fans & Exhaust", icon: "fan" },
    { id: "4", title: "Wiring Fix", icon: "electric-switch" },
    { id: "5", title: "Inverter Setup", icon: "car-battery" },
    { id: "6", title: "Appliance Fitting", icon: "tools" },
  ];

  const electricianServices = [
    {
      id: "1",
      title: "Fan Repair & Installation",
      subtitle: "Ceiling, wall & exhaust fans",
      proName: "Rahul Sharma",
      description:
        "Complete fan servicing including installation, wiring check, noise reduction and motor issues.",
      rating: 4.82,
      reviews: "650k",
      time: "30–45 mins",
      price: 249,
      img: require("../../assets/images/fan.jpg"),
      category: "3",
    },
    {
      id: "2",
      title: "Switchboard Repair",
      subtitle: "Loose connections & replacements",
      proName: "Vikas Kumar",
      description:
        "Fixing loose switches, burnt wiring, adding new sockets and ensuring shock-proof safety.",
      rating: 4.91,
      reviews: "480k",
      time: "25–40 mins",
      price: 199,
      img: require("../../assets/images/switch.png"),
      category: "1",
    },
    {
      id: "3",
      title: "LED Light Installation",
      subtitle: "Panels, tubes & ceiling lights",
      proName: "Sandeep Electric Works",
      description:
        "LED installation, tube-light fitting, decorative lights and all minor wiring fixes.",
      rating: 4.88,
      reviews: "720k",
      time: "20–30 mins",
      price: 149,
      img: require("../../assets/images/bulb.jpg"),
      category: "2",
    },
    {
      id: "4",
      title: "MCB / Fuse Issues",
      subtitle: "Short circuit troubleshooting",
      proName: "Ajay Verma",
      description:
        "Power overload fixes, fuse burnouts, MCB tripping and electrical safety inspections.",
      rating: 4.93,
      reviews: "390k",
      time: "30 mins",
      price: 299,
      img: require("../../assets/images/mcb.jpg"),
      category: "4",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LocationHeader />

      {/* PAGE TITLE */}
      <View className="px-4 mt-4 mb-2">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="power-plug-outline"
            size={26}
            color="#0054FF"
          />
          <Text className="text-[22px] font-bold ml-2 text-gray-800">
            Electrician <Text className="text-gray-500">services</Text>
          </Text>
        </View>

        {/* SEARCH BAR */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-3 mt-4">
          <Ionicons name="search-outline" size={20} color="#777" />
          <TextInput
            placeholder="Search for ‘fan repair’, ‘MCB’, ‘switch’"
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
            className="w-72 h-40 rounded-2xl mr-4 p-4 flex-row items-center"
          >
            <View style={{ flex: 1 }}>
              <Text className="text-white text-[18px] font-bold">
                {item.title}
              </Text>
              <Text className="text-white text-[13px] mt-1">
                {item.subtitle}
              </Text>

              <TouchableOpacity className="bg-yellow-400 px-3 py-1 rounded-full mt-4">
                <Text className="text-black font-semibold text-[12px]">
                  {item.btn}
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={item.img}
              className="w-24 h-28 rounded-xl ml-2"
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* CATEGORIES SECTION */}
      <View className="px-4 mt-5 flex-row flex-wrap justify-between">
        {electricianCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.8}
            className="w-[30%] bg-gray-100 rounded-2xl p-3 mb-4 items-center"
            onPress={() =>
              router.push({
                pathname: "/CategoryProducts",
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
              color="#0054FF"
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
          Popular Electrician Services
        </Text>

        {electricianServices.map((item) => (
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
                  className="bg-[#0054FF] px-4 py-2 rounded-full"
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
