import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.8;
const spacing = 16;

const banners = [
  {
    id: "b1",
    text: "Save up to ₹3,000 on electricity Bills",
    subtitle: "AC Servicing",
    colors: ["#0f172a", "#1e293b"],
    icon: <MaterialCommunityIcons name="air-conditioner" size={40} color="white" />
  },
  {
    id: "b2",
    text: "Elevate your look with us",
    subtitle: "Affordable Paints",
    colors: ["#f97316", "#fcd34d"],
    icon: <FontAwesome5 name="paint-roller" size={40} color="white" />
  },
  {
    id: "b3",
    text: "Refresh your home today",
    subtitle: "Home Cleaning",
    colors: ["#6366f1", "#818cf8"],
    icon: <Entypo name="bucket" size={40} color="white" />
  }
];

export default function BannerCarousel() {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
      <FlatList
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={cardWidth + spacing}
        decelerationRate="fast"
        contentContainerStyle={{ paddingRight: spacing }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { width: cardWidth, marginRight: spacing }]}
          >
            <LinearGradient
              colors={item.colors}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            {/* Vector Icon */}
            <View style={styles.icon}>{item.icon}</View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.text}</Text>
              <View style={styles.subtitleBadge}>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
  },
  textContainer: {
    padding: 16,
    zIndex: 2,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitleBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#ffcc00',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
});
