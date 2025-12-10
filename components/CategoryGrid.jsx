import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";

const categories = [
  { id: "1", title: "Motor Winding", icon: require("../assets/images/motor_8607684.png") },
  { id: "2", title: "Men's Salon\n& Massage", icon: require("../assets/men.jpg") },
  { id: "3", title: "AC & Appliances\nRepair", icon: require("../assets/worker.jpg") },
  { id: "4", title: "Cleaning & Pest\nControl", icon: require("../assets/cleaning_v_01.jpg") },
  { id: "5", title: "Plumbing &\nElectrician", icon: require("../assets/tools.jpg") },
  { id: "6", title: "Painting & Water\nProofing", icon: require("../assets/Painter.jpg") },
];

export default function CategoryGrid() {
  return (
    <View className="px-4 pt-4">
      <FlatList
        data={categories}
        keyExtractor={(i) => i.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 22,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity className="items-center w-[30%]" activeOpacity={0.7}>
            
            {/* ICON CARD */}
            <View
              className="w-28 h-38 rounded-2xl  justify-center items-center"
              style={{
                // shadowColor: "#000",
                // shadowOpacity: 0.06,
                // shadowRadius: 4,
                // shadowOffset: { width: 0, height: 2 },
                // elevation: 2,
              }}
            >
              <Image
                source={item.icon}
                style={{ width: 65, height: 55, resizeMode: "contain" }}
              />
            </View>

            {/* TEXT */}
            <Text className="text-center mt-3 text-[13px] font-semibold text-black leading-4">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
