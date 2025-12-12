import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BookingCard({ item }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 16,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700", color: "#000" }}>
        {item.service}
      </Text>

      <Text style={{ color: "#666", marginTop: 4 }}>{item.date}</Text>
      <Text style={{ color: "#666", marginTop: 2 }}>{item.address}</Text>

      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="information-circle-outline"
          size={18}
          color={
            item.status === "Completed"
              ? "#4CAF50"
              : item.status === "Cancelled"
              ? "#ff4d4d"
              : "#7A3FFF"
          }
        />

        <Text
          style={{
            marginLeft: 6,
            fontWeight: "600",
            color:
              item.status === "Completed"
                ? "#4CAF50"
                : item.status === "Cancelled"
                ? "#ff4d4d"
                : "#7A3FFF",
          }}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );
}
