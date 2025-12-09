import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Electrician() {
  const [selectedService, setSelectedService] = useState(null);

  const electricianServices = [
    {
      id: "1",
      title: "Fan Repair & Installation",
      subtitle: "Ceiling, wall & exhaust fans",
      proName: "Rahul Sharma",
      description:
        "Complete fan servicing including installation, wiring check, speed issues, noise reduction, and replacement of faulty parts. Our professionals handle ceiling, wall-mounted, table, pedestal and exhaust fans with precision.",
      rating: 4.82,
      reviews: "650k",
      time: "30–45 mins",
      price: 249,
      img: require("../../assets/images/game10.png"),
    },
    {
      id: "2",
      title: "Switchboard Repair",
      subtitle: "Loose connections & replacements",
      proName: "Vikas Kumar",
      description:
        "Switchboard repair includes fixing loose contacts, replacing broken switches, installing new sockets, repairing burnt wiring, and ensuring shock-proof safety. Standard materials used.",
      rating: 4.91,
      reviews: "480k",
      time: "25–40 mins",
      price: 199,
      img: require("../../assets/images/game2.jpg"),
    },
    {
      id: "3",
      title: "Tube Light/LED Light Installation",
      subtitle: "New fitting or replacement",
      proName: "Sandeep Electric Works",
      description:
        "Tube-light installation, LED panel fitting, CFL replacement, decorative light installation, and resolving flickering issues. Includes professional mounting and wiring.",
      rating: 4.88,
      reviews: "720k",
      time: "20–30 mins",
      price: 149,
      img: require("../../assets/images/game6.jpg"),
    },
    {
      id: "4",
      title: "MCB/ Fuse Issues",
      subtitle: "Short circuit & overload fixes",
      proName: "Ajay Verma",
      description:
        "MCB tripping, fuse burnouts, power overload troubleshooting, loose wiring fixes, and main line inspection. Helps ensure safety from short circuits and power fluctuations.",
      rating: 4.93,
      reviews: "390k",
      time: "30 mins",
      price: 299,
      img: require("../../assets/images/game11.jpg"),
    },
    {
      id: "5",
      title: "Inverter Checking",
      subtitle: "Power backup inspection",
      proName: "Vishnu Electricals",
      description:
        "Inverter not working, battery draining fast, low backup time, wiring problems, and voltage fluctuation issues. Full diagnostic by certified technicians.",
      rating: 4.85,
      reviews: "210k",
      time: "45 mins",
      price: 399,
      img: require("../../assets/images/game14.jpg"),
    },
  ];

  return (
    <View className="px-4 mt-4">
      <FlatList
        data={electricianServices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            className="bg-white rounded-2xl p-3 mb-4 flex-row"
            style={{
              elevation: 2,
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            {/* IMAGE */}
            <Image
              source={item.img}
              className="w-24 h-24 rounded-xl mr-3"
              resizeMode="cover"
            />

            {/* CONTENT */}
            <View className="flex-1 justify-between">
              <View>
                <Text className="text-[15px] font-semibold text-gray-900">
                  {item.title}
                </Text>

                <Text className="text-[12px] text-gray-600 mt-1">
                  {item.subtitle}
                </Text>

                {/* ELECTRICIAN NAME */}
                <Text className="text-[12px] text-purple-600 mt-1 font-medium">
                  By: {item.proName}
                </Text>

                {/* RATING + TIME */}
                <View className="flex-row items-center mt-2">
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text className="ml-1 text-[12px] text-gray-800">
                    {item.rating} ({item.reviews})
                  </Text>

                  <Text className="text-[12px] text-gray-500 mx-2">•</Text>

                  <Text className="text-[12px] text-gray-600">{item.time}</Text>
                </View>
              </View>

              {/* PRICE + ADD BUTTON */}
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-[15px] font-bold text-gray-900">
                  ₹ {item.price}
                </Text>

                <TouchableOpacity className="bg-[#8A00FF] px-4 py-2 rounded-full">
                  <Text className="text-white text-[13px] font-semibold">
                    Add
                  </Text>
                </TouchableOpacity>
              </View>

              {/* VIEW DETAILS */}
              <TouchableOpacity onPress={() => setSelectedService(item)}>
                <Text className="text-[#8A00FF] text-[12px] font-medium mt-2">
                  View details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* DETAILS MODAL */}
      <Modal visible={!!selectedService} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/40 justify-center items-center p-4">
          <View className="bg-white w-full rounded-2xl p-5 max-h-[80%]">
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setSelectedService(null)}
            >
              <Text className="text-[18px] text-gray-600">✕</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
              {selectedService && (
                <>
                  <Text className="text-xl font-bold text-gray-900">
                    {selectedService.title}
                  </Text>

                  <Text className="text-[13px] text-gray-500 mt-1">
                    {selectedService.subtitle}
                  </Text>

                  <Text className="text-[13px] text-purple-700 mt-1 font-medium">
                    Electrician: {selectedService.proName}
                  </Text>

                  <Image
                    source={selectedService.img}
                    className="w-full h-48 rounded-xl mt-4"
                    resizeMode="cover"
                  />

                  <Text className="mt-4 text-gray-700 leading-5">
                    {selectedService.description}
                  </Text>

                  <View className="flex-row items-center mt-4">
                    <MaterialIcons name="star" size={18} color="#FFD700" />
                    <Text className="ml-1 text-[13px] text-gray-800">
                      {selectedService.rating} ({selectedService.reviews})
                    </Text>
                  </View>

                  <Text className="mt-2 text-[13px] text-gray-600">
                    Duration: {selectedService.time}
                  </Text>

                  <Text className="mt-3 text-lg font-bold text-gray-900">
                    Price: ₹ {selectedService.price}
                  </Text>
                </>
              )}
            </ScrollView>

            <TouchableOpacity className="bg-[#8A00FF] w-full py-3 rounded-full mt-4">
              <Text className="text-center text-white text-[15px] font-semibold">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
