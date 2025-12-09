// @ts-nocheck
import { View, Text, ScrollView, StatusBar } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import CustomHeader from "@/components/Header/Header";

const profile = () => {
  const [formData] = useState({
    accountNumber: "213193507633",
    username: "Nitish Prajapati",
    email: "nitishpjpt97@gmail.com",
    phoneNumber: "9871785113",
    profession: "Full Stack Developer",
    password: "Last change: 5 days ago",
    firstName: "Nitish",
    surname: "Prajapati",
    country: "India",
    cityTown: "New Delhi",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#18171D" }}>
      <StatusBar backgroundColor="#1F1E29" barStyle="light-content" />
      <CustomHeader title="Profile" />
      <ScrollView style={{ flex: 1, backgroundColor: "#18171D", padding: 20 }}>
        {/* Account Section */}
        <Text style={{ color: "#7D7C86", marginBottom: 10, fontSize: 12 }}>
          ACCOUNT
        </Text>
        <View
          style={{ backgroundColor: "#2D2C3C", borderRadius: 10, padding: 10 }}
        >
          {[
            { label: "Account Number", key: "accountNumber" },
            { label: "Username", key: "username" },
            { label: "E-mail", key: "email" },
            { label: "Phone number", key: "phoneNumber" },
            { label: "Profession", key: "profession" },
            { label: "Password", key: "password" },
          ].map((field) => (
            <View
              key={field.key}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#3B3A4A",
                paddingVertical: 12,
              }}
            >
              <Text style={{ color: "#B3B3C6", fontSize: 12 }}>
                {field.label}
              </Text>
              <Text style={{ color: "#fff", fontSize: 14, paddingTop: 5 }}>
                {formData[field.key] || "Not filled in"}
              </Text>
            </View>
          ))}
        </View>

        {/* Personal Information Section */}
        <Text style={{ color: "#7D7C86", marginVertical: 15, fontSize: 12 }}>
          PERSONAL INFORMATION
        </Text>
        <View
          style={{ backgroundColor: "#2D2C3C", borderRadius: 10, padding: 10 }}
        >
          {[
            { label: "First name", key: "firstName" },
            { label: "Surname", key: "surname" },
            { label: "Country", key: "country" },
            { label: "City/Town", key: "cityTown" },
          ].map((field) => (
            <View
              key={field.key}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#3B3A4A",
                paddingVertical: 12,
              }}
            >
              <Text style={{ color: "#B3B3C6", fontSize: 12 }}>
                {field.label}
              </Text>
              <Text style={{ color: "#fff", fontSize: 14, paddingTop: 5 }}>
                {formData[field.key] || "Not filled in"}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
