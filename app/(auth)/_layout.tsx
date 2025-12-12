import { View, Text } from "react-native";
import React from "react";
import "../../global.css";
import { Stack } from "expo-router";
import CategoryProductsAnimated from "./CategoryProducts";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1A1A2E" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otpscreen" />
      <Stack.Screen
        name="CategoryProducts"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryProductsPainter"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProviderList"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ServiceForm" options={{ headerShown: false }} />

      <Stack.Screen name="cart" />

      <Stack.Screen name="home" />
    </Stack>
  );
};

export default RootLayout;
