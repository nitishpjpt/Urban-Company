import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function OTPScreen() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text) || text === "") {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) inputs.current[index + 1].focus();
      if (!text && index > 0) inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    router.push("/homes");
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-6 pt-28 items-center"
    >
      {/* HEADER */}
      <Text className="text-black text-3xl font-bold mb-2">
        Verify your number
      </Text>

      <Text className="text-gray-500 text-center mb-1">
        Enter the 6-digit code sent to
      </Text>

      <Text className="text-black text-lg font-semibold mb-8">
        {phoneNumber}
      </Text>

      {/* OTP INPUT BOXES */}
      <View className="flex-row justify-between w-full mb-8">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            className="text-center text-2xl text-black"
            style={{
              width: 55,
              height: 60,
              borderRadius: 14,
              backgroundColor: "#F4F4F5",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 3,
            }}
          />
        ))}
      </View>

      {/* RESEND TEXT */}
      <Text className="text-gray-600 mb-10">
        Didn’t get the code?{" "}
        <Text className="text-violet-600 font-medium underline">
          Resend
        </Text>
      </Text>

      {/* VERIFY BUTTON */}
      <TouchableOpacity
        disabled={!isComplete}
        onPress={handleVerify}
        className={`w-full py-4 rounded-2xl items-center ${
          isComplete ? "bg-black" : "bg-gray-300"
        }`}
        activeOpacity={0.8}
      >
        <Text
          className={`text-base font-semibold ${
            isComplete ? "text-white" : "text-gray-600"
          }`}
        >
          Verify Code
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
