import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1F1E29",
        paddingHorizontal: 15,
        paddingVertical: 12,
      }}
    >
      {/* Left side: Title */}
      <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800" }}>
        {title}
      </Text>

      {/* Center: Logo */}
      <Image
        source={require("../../assets/images/logo.png")} // update path if needed
        style={{ width: 100, height: 50, resizeMode: "contain" }}
      />

      {/* Right side: Icons */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Ionicons name="search-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
