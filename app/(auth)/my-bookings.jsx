import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookingTabs from "../../components/BookingTabs.jsx";
import BookingCard from "../../components/BookingCArd.jsx";
import { bookings } from "../../components/Sample/BookingData.js";
import { router } from "expo-router";

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  // ---------- Animations ----------
  const headerY = useRef(new Animated.Value(-120)).current;
  const tabOpacity = useRef(new Animated.Value(0)).current;
  const tabTranslate = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslate = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(tabOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(tabTranslate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(listTranslate, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // BACK WITH ANIMATION
  const handleBack = () => {
    Animated.parallel([
      Animated.timing(listOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(headerY, {
        toValue: -120,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(() => router.back());
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <StatusBar style="dark" />

      {/* ---------- HEADER ---------- */}
      <Animated.View
        style={{
          height: 110,
          backgroundColor: "#0B61FF",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingTop: 15,
          paddingHorizontal: 80,
          justifyContent: "center",
          transform: [{ translateY: headerY }],
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "700" }}>
          My Bookings
        </Text>
        <Text style={{ color: "#DDE7FF", marginTop: 3 }}>
          Track all your service bookings
        </Text>
      </Animated.View>

      {/* BACK BUTTON */}
      <View style={{ position: "absolute", top: 40, left: 18, zIndex: 30 }}>
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.85}
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: 8,
            borderRadius: 10,
            elevation: 3,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#0B61FF" />
        </TouchableOpacity>
      </View>

      {/* ---------- TABS ---------- */}
      <Animated.View
        style={{

          backgroundColor: "#FFF",
          opacity: tabOpacity,
          transform: [{ translateY: tabTranslate }],
        }}
      >
        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Animated.View>

      {/* ---------- BOOKING LIST ---------- */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 16,
          paddingTop: 10,
          opacity: listOpacity,
          transform: [{ translateY: listTranslate }],
        }}
      >
        {bookings[activeTab.toLowerCase()].map((item) => (
          <BookingCard item={item} key={item.id} />
        ))}

        {/* Empty State */}
        {bookings[activeTab.toLowerCase()].length === 0 && (
          <View style={{ marginTop: 80, alignItems: "center" }}>
            <Ionicons name="calendar-outline" size={55} color="#ccc" />
            <Text style={{ marginTop: 12, fontSize: 17, color: "#666" }}>
              No {activeTab} bookings
            </Text>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}
