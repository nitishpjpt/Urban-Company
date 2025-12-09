import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import useCartStore from "../store/cartStore";
import RazorpayCheckout from "react-native-razorpay";

export default function CartScreen() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  console.log("TOTAL PRICE:", totalPrice);


  // 🔥 RAZORPAY PAYMENT FUNCTION
  const handlePayment = () => {
    const options = {
      description: "HyperDev Services Payment",
      image: "https://razorpay.com/favicon.png",
      currency: "INR",
      key: "rzp_test_4Wlysk0uPT8zwa", // replace with your real Razorpay Key
      amount: totalPrice * 100, // Convert to paise
      name: "HyperDev",
      theme: { color: "#121212" },
      prefill: {
        email: "user@example.com",
        contact: "9876543210",
        name: "Nitish",
      },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        Alert.alert("Payment Successful", `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        Alert.alert("Payment Failed", error.description);
      });
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Your Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center mb-4 bg-gray-100 p-3 rounded-2xl">

            {/* IMAGE */}
            <Image source={item.img} className="w-16 h-16 rounded-xl mr-3" />

            {/* TITLE + PRICE */}
            <View className="flex-1">
              <Text className="text-gray-800 font-semibold">{item.title}</Text>
              <Text className="text-gray-500 text-sm">₹ {item.price}</Text>
            </View>

            {/* QTY BUTTONS */}
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-300 rounded-full"
              >
                <Text className="text-lg">-</Text>
              </TouchableOpacity>

              <Text className="px-3 text-lg font-semibold">{item.qty}</Text>

              <TouchableOpacity
                onPress={() => increaseQty(item.id)}
                className="px-3 py-1 bg-gray-300 rounded-full"
              >
                <Text className="text-lg">+</Text>
              </TouchableOpacity>
            </View>

            {/* REMOVE BUTTON */}
            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              className="ml-3 bg-red-500 px-3 py-1 rounded-full"
            >
              <Text className="text-white">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* TOTAL + PAYMENT BUTTON */}
      <View className="mt-6 border-t border-gray-300 pt-4">
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl font-semibold">Total:</Text>
          <Text className="text-xl font-bold">₹ {totalPrice}</Text>
        </View>

        {/* RAZORPAY BUTTON */}
        <TouchableOpacity
          onPress={handlePayment}
          className="bg-black py-4 rounded-xl"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Pay with Razorpay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
