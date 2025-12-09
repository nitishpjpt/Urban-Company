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
import LocationHeader from "@/components/locationHeader";
import useCartStore from "../store/cartStore";

export default function Beauty() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: "1",
      title: "Cleanup & Bleach",
      subtitle: "For a brighter skin",
      description:
        "Our Cleanup & Bleach service deeply cleanses the skin, removes tan, brightens complexion, and gives an instant glow. This includes face cleanup, scrubbing, steaming, extraction (if needed), and professional bleaching with safe products.",
      rating: 4.76,
      reviews: "978k",
      time: "55 mins",
      price: 1299,
      img: require("../../assets/images/game8.png"),
    },
    {
      id: "2",
      title: "Ayurvedic Herbal Facials",
      subtitle: "For glowing & toned skin",
      description:
        "A soothing herbal facial using ancient Ayurvedic formulations blended with modern skincare. Helps in skin tightening, glow enhancement, pigmentation reduction, and deep relaxation.",
      rating: 4.92,
      reviews: "786k",
      time: "1 hr 20 mins",
      price: 1789,
      img: require("../../assets/images/game12.jpg"),
    },
    {
      id: "3",
      title: "Threading",
      subtitle: "For desired eyebrow shape",
      description:
        "Perfect eyebrow shaping using safe threading techniques. Zero chemical usage, precise shaping, and gentle on sensitive skin.",
      rating: 4.6,
      reviews: "898k",
      time: "15 mins",
      price: 169,
      img: require("../../assets/images/game18.jpg"),
    },
    {
      id: "4",
      title: "Full Body Wax",
      subtitle: "Smooth & shiny skin",
      description:
        "Full-body waxing using premium wax for long-lasting smoothness. Removes tan, dead skin cells, and ensures a clean and polished appearance.",
      rating: 4.83,
      reviews: "652k",
      time: "1 hr",
      price: 1299,
      img: require("../../assets/images/game2.jpg"),
    },
    {
      id: "5",
      title: "Manicure & Pedicure",
      subtitle: "For soft & nourished hands/feet",
      description:
        "Relaxing manicure and pedicure including nail trimming, shaping, cuticle care, exfoliation, massage, and polish application. Ideal for dry or cracked skin.",
      rating: 4.89,
      reviews: "540k",
      time: "1 hr 15 mins",
      price: 899,
      img: require("../../assets/images/game14.jpg"),
    },
    {
      id: "6",
      title: "Hair Spa",
      subtitle: "For smooth & strong hair",
      description:
        "Deep nourishment hair spa that restores shine, improves hair strength, reduces frizz, and hydrates the scalp. Includes oil massage, steaming, mask application & wash.",
      rating: 4.95,
      reviews: "720k",
      time: "45 mins",
      price: 699,
      img: require("../../assets/images/game2.jpg"),
    },
  ];

  // add to cart
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <LocationHeader />
      <View className="px-4 mt-4">
        <FlatList
          data={services}
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
              <Image
                source={item.img}
                className="w-24 h-24 rounded-xl mr-3"
                resizeMode="cover"
              />

              <View className="flex-1 justify-between">
                <View>
                  <Text className="text-[15px] font-semibold text-gray-900">
                    {item.title}
                  </Text>

                  <Text className="text-[12px] text-gray-600 mt-1">
                    {item.subtitle}
                  </Text>

                  <View className="flex-row items-center mt-2">
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                    <Text className="ml-1 text-[12px] text-gray-800">
                      {item.rating} ({item.reviews})
                    </Text>

                    <Text className="text-[12px] text-gray-500 mx-2">•</Text>

                    <Text className="text-[12px] text-gray-600">
                      {item.time}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-[15px] font-bold text-gray-900">
                    Rs. {item.price}
                  </Text>

                  <TouchableOpacity
                    onPress={() => addToCart(item)} // use the current item directly
                    className="bg-[#8A00FF] px-4 py-2 rounded-full"
                  >
                    <Text className="text-white text-[13px] font-semibold">
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>

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
        <Modal
          visible={!!selectedService}
          animationType="slide"
          transparent={true}
        >
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
    </>
  );
}
