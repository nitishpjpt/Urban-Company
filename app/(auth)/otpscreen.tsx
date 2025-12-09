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

      // Move to next input if valid
      if (text !== "" && index < 5) {
        inputs.current[index + 1].focus();
      }

      // Go back if empty and backspacing
      if (text === "" && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    console.log("Verifying OTP:", code);
    router.push({
      pathname: "/homes",
    });
    // Add verification logic here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-6 pt-[14rem] items-center"
    >
      <Text className="text-black text-2xl font-bold mb-2">
        Enter verification code
      </Text>
      <Text className="text-gray-400 mb-2 text-center">
        A 6-digit verification code has been sent to your mobile phone:
      </Text>
      <Text className="text-black9 font-semibold mb-6">{phoneNumber}</Text>

      {/* OTP boxes */}
      <View className="flex-row justify-between w-full px-2 mb-4">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            style={{
              width: 50,
              height: 55,
              textAlign: "center",
              borderRadius: 12,
              backgroundColor: "black",
              borderWidth: 1,
              borderColor: "#4B4B62",
              color: "white",
              fontSize: 24,
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>

      <Text className="text-gray-400 mb-6">
        Didn’t receive a code?{" "}
        <Text className="text-violet-400 underline">Request again</Text>
      </Text>

      <TouchableOpacity
        disabled={otp.some((digit) => digit === "")}
        onPress={handleVerify}
        className={`w-full py-3 rounded-xl items-center ${
          otp.every((digit) => digit !== "") ? "bg-violet-600" : "bg-black"
        }`}
      >
        <Text className="text-white font-semibold">Verify code</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}