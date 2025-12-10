import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

const TabRoot = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 3,
          borderColor: "#E5E5E5",
          height: 60,
         
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarIcon: ({ color, focused }) => {
          // 1️⃣ UC Black Box (Active)
          if (route.name === "uc") {
            return (
              <View
                style={{
                  backgroundColor: focused ? "black" : "#F2F2F2",
                  width: 40,
                  height: 30,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: focused ? "white" : "black",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  UC
                </Text>
              </View>
            );
          }

          // 2️⃣ Beauty Icon
          if (route.name === "beauty") {
            return (
              <MaterialCommunityIcons
                name="spa-outline"
                size={26}
                color={color}
              />
            );
          }

          // 3️⃣ Homes Icon
          if (route.name === "homes") {
            return (
              <MaterialCommunityIcons name="tools" size={26} color={color} />
            );
          }

          // 4️⃣ Native Icon
          if (route.name === "native") {
            return (
             <Ionicons name="flash-outline" size={26} color={color} />

            );
          }

          // 5️⃣ Account Icon
          if (route.name === "profile") {
            return <Ionicons name="person-outline" size={26} color={color} />;
          }
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
      })}
    >
      <Tabs.Screen
        name="uc"
        options={{
          headerShown: false,
          tabBarLabel: "UC", // Keep label visible
        }}
      />

      <Tabs.Screen
        name="beauty"
        options={{ headerShown: false, tabBarLabel: "Painter" }}
      />
      <Tabs.Screen
        name="homes"
        options={{ headerShown: false, tabBarLabel: "Homes" }}
      />
      <Tabs.Screen
        name="native"
        options={{ headerShown: false, tabBarLabel: "Electrician" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, tabBarLabel: "Profile" }}
      />
    </Tabs>
  );
};

export default TabRoot;
