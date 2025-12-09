import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleConfirm = () => {
    router.push({
      pathname: "/otpscreen",
      params: { phoneNumber: `+${callingCode}${phoneNumber}` },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      {/* TOP IMAGE */}
      <Image
        source={require("../../assets/banner-logo.jpg")}
        style={{ width: "100%", height: 180, resizeMode: "cover" }}
      />

      {/* CONTENT */}
      <View className="px-6 mt-8">

        {/* 🔥 UC BLACK BOX + TEXT — EXACT LIKE UI */}
        <View className="items-center mb-6">

          {/* BLACK BOX UC */}
          <View
            style={{
              backgroundColor: "black",
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 10,
            }}
          >
            <Text className="text-white text-xl font-bold">UC</Text>
          </View>

          {/* TITLE TEXT */}
          <Text className="text-black text-3xl font-bold mt-3">Urban Company</Text>

          {/* SUBTITLE */}
          <Text className="text-sm font-bold mt-1">
            Your home services expert
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            Quick.Affordable.Reliable
          </Text>
        </View>

        {/* PHONE INPUT */}
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-4 bg-white">
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withFilter
            onSelect={onSelect}
            containerButtonStyle={{ marginRight: 6 }}
          />

          <Text className="text-black mr-2 text-base">+{callingCode}</Text>

          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="flex-1 text-black text-base"
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          disabled={phoneNumber.length < 10}
          onPress={handleConfirm}
          className={`mt-6 w-full py-4 rounded-xl items-center ${
            phoneNumber.length >= 10 ? "bg-black" : "bg-gray-200"
          }`}
        >
          <Text
            className={`font-semibold ${
              phoneNumber.length >= 10 ? "text-white" : "text-gray-500"
            }`}
          >
            Get Verification Code
          </Text>
        </TouchableOpacity>

        {/* SKIP */}
        {/* <View className="mt-4 items-end pr-2">
          <Text className="text-gray-600 text-sm">Skip</Text>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
}
