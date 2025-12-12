import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* TOP IMAGE with overlay */}
          <View className="relative">
            <Image
              source={require("../../assets/banner-logo.jpg")}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
          </View>

          {/* CONTENT */}
          <View className="flex-1 px-6 pt-4 pb-8">
            {/* BRAND SECTION */}
            <View className="items-center mb-10">
              <View className="flex-row items-center mb-4">
                <View className="bg-black w-12 h-12 rounded-xl items-center justify-center mr-3 shadow-lg">
                  <Text className="text-white text-xl font-bold">E2G</Text>
                </View>
                <View>
                  <Text className="text-3xl font-bold text-gray-900">
                    Easy 2 Get
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Your home services expert
                  </Text>
                </View>
              </View>
              
              <View className="bg-blue-50 px-4 py-2 rounded-full">
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <Text className="text-xs font-semibold text-gray-700">
                    Quick • Affordable • Reliable
                  </Text>
                </View>
              </View>
            </View>

            {/* FORM SECTION */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Get Started
              </Text>
              <Text className="text-gray-600 mb-6">
                Enter your mobile number to continue
              </Text>

              {/* PHONE INPUT CONTAINER */}
              <View
                className={`border-2 rounded-xl px-4 py-3 bg-white flex-row items-center ${
                  isFocused
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center border-r border-gray-200 pr-3">
                  <CountryPicker
                    countryCode={countryCode}
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    onSelect={onSelect}
                    containerButtonStyle={{ paddingVertical: 4 }}
                  />
                  {/* <Text className="text-gray-800 font-medium ml-2">
                    +{callingCode}
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color="#6b7280"
                    style={{ marginLeft: 4 }}
                  /> */}
                </View>

                <TextInput
                  placeholder="Enter mobile number"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="flex-1 text-gray-900 text-base ml-3 py-1"
                  selectionColor="#3b82f6"
                />
                
                {phoneNumber.length > 0 && (
                  <TouchableOpacity onPress={() => setPhoneNumber("")}>
                    <Ionicons name="close-circle" size={20} color="#9ca3af" />
                  </TouchableOpacity>
                )}
              </View>

              <Text className="text-gray-500 text-xs mt-3 px-1">
                We'll send a verification code to this number
              </Text>
            </View>

          {/* BUTTON */}
<TouchableOpacity
  disabled={phoneNumber.length < 10}
  onPress={handleConfirm}
  className={`w-full py-4 rounded-xl items-center justify-center ${
    phoneNumber.length >= 10 ? "bg-black" : "bg-gray-200"
  }`}
  activeOpacity={0.9}
>
  <View className="flex-row items-center">
    <Text
      className={`font-semibold text-base ${
        phoneNumber.length >= 10 ? "text-white" : "text-gray-500"
      }`}
    >
      Continue
    </Text>

    {phoneNumber.length >= 10 && (
      <Ionicons
        name="arrow-forward"
        size={20}
        color="white"
        style={{ marginLeft: 8 }}
      />
    )}
  </View>
</TouchableOpacity>


            {/* TERMS */}
            <Text className="text-center text-gray-500 text-xs mt-6 px-4 leading-5">
              By continuing, you agree to our{" "}
              <Text className="text-blue-600 font-medium">Terms of Service</Text>{" "}
              and{" "}
              <Text className="text-blue-600 font-medium">Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}