import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: "700", color: "#000" }}>
          Verified Customer
        </Text>
        <Text style={{ fontSize: 16, color: "#666", marginTop: 4 }}>
          +91 9871785113
        </Text>

        {/* Edit icon */}
        <TouchableOpacity style={{ position: "absolute", right: 20, top: 25 }}>
          <Feather name="edit-2" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Top Cards Grid */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <ProfileCard
          icon="clipboard-text-outline"
          label="My bookings"
          onPress={() => router.push("/my-bookings")}
        />

        <ProfileCard icon="fridge-outline" label="Native devices" />
        <ProfileCard icon="headphones" label="Help & support" />
      </View>

      {/* List Items */}
      <View style={{ marginTop: 25 }}>
        <ProfileItem icon="file-document" label="My Plans" />
        <ProfileItem icon="wallet-outline" label="Wallet" />
        <ProfileItem icon="account-star-outline" label="Plus membership" />
        <ProfileItem icon="star-outline" label="My rating" />
        <ProfileItem icon="map-marker-outline" label="Manage addresses" />
        <ProfileItem
          icon="credit-card-outline"
          label="Manage payment methods"
        />
        <ProfileItem icon="cog-outline" label="Settings" />
        <ProfileItem icon="information-outline" label="About UC" />
      </View>

      {/* Refer & Earn Card */}
      <View
        style={{
          backgroundColor: "#eee6ff",
          marginHorizontal: 20,
          marginTop: 30,
          padding: 20,
          borderRadius: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#000" }}>
          Refer & earn ₹100
        </Text>
        <Text style={{ color: "#444", marginTop: 6 }}>
          Get ₹100 when your friend completes their first booking
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#7A3FFF",
            paddingVertical: 12,
            borderRadius: 12,
            marginTop: 15,
            width: 120,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Refer now</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={{
          marginTop: 30,
          marginHorizontal: 20,
          paddingVertical: 14,
          borderRadius: 12,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ff4d4d",
        }}
        onPress={() => {
          router.replace("/"); // Redirect to main page
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#ff3b3b",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>

      {/* Version Text */}
      <Text
        style={{
          textAlign: "center",
          marginVertical: 30,
          color: "#666",
        }}
      >
        Version 7.6.28 R553
      </Text>
    </ScrollView>
  );
}

/* ---------- Components ---------- */

function ProfileCard({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "30%",
        backgroundColor: "#fff",
        paddingVertical: 25,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
      }}
    >
      <MaterialCommunityIcons name={icon} size={32} color="#333" />
      <Text
        style={{
          marginTop: 8,
          textAlign: "center",
          fontWeight: "600",
          color: "#000",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ProfileItem({ icon, label }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
      }}
    >
      <MaterialCommunityIcons name={icon} size={26} color="#333" />
      <Text
        style={{
          marginLeft: 18,
          fontSize: 16,
          fontWeight: "500",
          color: "#000",
        }}
      >
        {label}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#999"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
}
