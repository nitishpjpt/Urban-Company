import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons"; // You can use Ionicons or any other icon set
import { useRouter } from "expo-router";

export default function JoinScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isTouchedEmail, setIsTouchedEmail] = useState(false);
  const [isTouchedPassword, setIsTouchedPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleJoin = () => {
    setIsTouchedEmail(true);
    setIsTouchedPassword(true);

    // Check if both email and password are filled
    if (!email || !password) {
      return; // Optionally show an error message here
    }

    router.push({
      pathname: "/startingBanner",
    });
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("DOB:", dob);
    // Proceed with join logic or API call
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#1A1A2E] px-6 pt-20"
    >
      <Text className="text-white text-2xl font-bold text-center mb-10">
        Final step to join
      </Text>

      <View className="mb-10">
        <Text className="text-white mb-2">Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setIsTouchedEmail(true)}
          keyboardType="email-address"
          autoCapitalize="none"
          className={`bg-[#2C2C3A] text-white border rounded-xl px-4 py-4 ${
            !email && isTouchedEmail ? "border-red-500" : "border-violet-500"
          }`}
        />
        {!email && isTouchedEmail && (
          <Text className="text-red-500 text-sm mt-2">Email is required.</Text>
        )}
      </View>

      <View className="mb-10">
        <Text className="text-white mb-2">Create Password</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: !password && isTouchedPassword ? "red" : "#4B4B62",
            borderRadius: 12,
            backgroundColor: "#2C2C3A",
          }}
        >
          <TextInput
            placeholder="Create strong password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            onBlur={() => setIsTouchedPassword(true)}
            secureTextEntry={!passwordVisible}
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 12,
              color: "white",
            }}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#999"
              style={{ paddingRight: 12 }}
            />
          </TouchableOpacity>
        </View>
        {!password && isTouchedPassword && (
          <Text className="text-red-500 text-sm mt-2">
            Password is required.
          </Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-white mb-1">Date of Birth</Text>
        <Pressable onPress={() => setShowPicker(true)}>
          <View className="bg-[#2C2C3A] border border-[#4B4B62] rounded-xl px-4 py-3">
            <Text className="text-white">{formatDate(dob)}</Text>
          </View>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={handleJoin}
        className="bg-violet-600 py-6 rounded-xl items-center"
      >
        <Text className="text-white font-semibold">Join</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
