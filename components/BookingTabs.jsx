import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

export default function BookingTabs({ activeTab, setActiveTab }) {
  const tabs = ["Upcoming", "Completed", "Cancelled"];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        backgroundColor: "#f4f4f5",
        borderRadius: 12,
        padding: 6,
      }}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: isActive ? "#fff" : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                color: isActive ? "#000" : "#666",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
