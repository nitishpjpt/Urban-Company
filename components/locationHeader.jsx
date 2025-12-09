import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import useCartStore from "../app/store/cartStore";

export default function LocationHeader() {
  const router = useRouter();

  // Cart state from Zustand
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.length;

  const [location, setLocation] = useState("Fetching...");
  const [sub, setSub] = useState("Please wait");
  const [coords, setCoords] = useState(null);

  const locationSheetRef = useRef(null);

  const openLocationSheet = () => {
    locationSheetRef.current?.expand();
    getLiveLocation();
  };

  const getLiveLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission is required!");
      return;
    }

    let pos = await Location.getCurrentPositionAsync({});
    setCoords({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });

    let geo = await Location.reverseGeocodeAsync(pos.coords);
    if (geo.length > 0) {
      const place = geo[0];
      setLocation(place.name || "Selected Location");
      setSub(`${place.street || ""}, ${place.city || ""}`);
    }
  };

  return (
    <View className="px-4 pt-4 bg-white">
      <View className="flex-row items-center justify-between">
        
        {/* LOCATION BUTTON */}
        <TouchableOpacity onPress={openLocationSheet}>
          <Text className="text-sm font-semibold text-gray-800">{location}</Text>
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-500">{sub}</Text>
            <Ionicons name="chevron-down" size={16} color="#6b7280" style={{ marginLeft: 6 }} />
          </View>
        </TouchableOpacity>

        {/* CART BUTTON */}
        <TouchableOpacity
          className="p-2 relative"
          onPress={() => router.push("/cart")} // navigate to CartScreen
        >
          <Ionicons name="cart-outline" size={24} color="#111827" />

          {/* CART COUNT BADGE */}
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
              <Text className="text-white text-[10px] font-bold">{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}
