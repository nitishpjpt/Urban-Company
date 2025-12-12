// screens/CategoryProductsPainter.js
import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import useCartStore from "../store/cartStore";
import LocationHeader from "@/components/locationHeader";

const { width } = Dimensions.get("window");

// Mapping: categoryId -> service ids
const serviceByCategory = {
    "1": ["1"], // Wall Painting
    "2": ["2"], // Furniture Repair
    "3": ["3"], // Wood Work & Carpentry
    "4": ["4"], // Plumbing Fix
    "5": [],    // Door & Window Setup (add later if needed)
    "6": [],    // Decor & Fixtures (add later if needed)
};

const allServices = [
    {
        id: "1",
        title: "Wall Painting",
        subtitle: "Interior & Exterior",
        price: 499,
        img: require("../../assets/images/home-wall-painting-114.jpg"),
    },
    {
        id: "2",
        title: "Furniture Repair",
        subtitle: "Tables, Chairs, Cabinets",
        price: 349,
        img: require("../../assets/images/furniture-repairing-services-1583389842-5325843-removebg-preview.png"),
    },
    {
        id: "3",
        title: "Wood Work & Carpentry",
        subtitle: "Custom shelves, frames & more",
        price: 699,
        img: require("../../assets/images/carpenter-removebg-preview.png"),
    },
    {
        id: "4",
        title: "Plumbing Services",
        subtitle: "Leaks, Pipes, Fixtures",
        price: 299,
        img: require("../../assets/images/plumber-removebg-preview.png"),
    },
];

export default function CategoryProductsPainter() {
    const route = useRoute();
    const navigation = useNavigation();
    const addToCart = useCartStore((state) => state.addToCart);

    const { categoryId, title } = route.params ?? { categoryId: "1", title: "Category" };
    const filteredServices = allServices.filter((s) =>
        serviceByCategory[categoryId]?.includes(s.id)
    );

    // Animated values
    const headerY = useRef(new Animated.Value(-120)).current;
    const cardsOpacity = useRef(new Animated.Value(0)).current;
    const cardsTranslate = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(headerY, {
                toValue: 0,
                duration: 380,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(cardsOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(cardsTranslate, {
                    toValue: 0,
                    duration: 420,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [headerY, cardsOpacity, cardsTranslate]);

    const handleBack = () => {
        Animated.parallel([
            Animated.timing(cardsOpacity, { toValue: 0, duration: 220, useNativeDriver: true }),
            Animated.timing(cardsTranslate, { toValue: 20, duration: 220, useNativeDriver: true }),
            Animated.timing(headerY, { toValue: -120, duration: 260, useNativeDriver: true }),
        ]).start(() => navigation.goBack());
    };

    return (
        <>
            <LocationHeader />
            <View style={{ flex: 1, backgroundColor: "#FDF6F0" }}>
                <StatusBar barStyle="dark-content" backgroundColor="#FDF6F0" />

                {/* Animated Header */}
                <Animated.View style={{ transform: [{ translateY: headerY }], height: 150 }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, overflow: "hidden" }}>
                        <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "#FF6B00", opacity: 1 }} />
                        <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "#FFA24C", opacity: 0.18 }} />

                        <View style={{ paddingTop: 40, paddingHorizontal: 32, alignItems: 'center' }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{title}</Text>
                            <Text style={{ color: "#FFE5D0", marginTop: 6 }}>
                                Best professionals in {title.toLowerCase()}
                            </Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Back Button */}
                <View style={{ position: "absolute", top: 40, left: 14, zIndex: 20 }}>
                    <TouchableOpacity
                        onPress={handleBack}
                        activeOpacity={0.85}
                        style={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            padding: 8,
                            borderRadius: 10,
                            elevation: 4,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowOffset: { width: 0, height: 2 },
                        }}
                    >
                        <MaterialIcons name="arrow-back" size={20} color="#FF6B00" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <Animated.ScrollView
                    contentContainerStyle={{ padding: 16, paddingTop: 8 }}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: -10 }}
                >
                    <Animated.View style={{ opacity: cardsOpacity, transform: [{ translateY: cardsTranslate }] }}>
                        <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 12, elevation: 2 }}>
                            <Text style={{ fontWeight: "700", fontSize: 16 }}>{title}</Text>
                            <Text style={{ color: "#6B7280", marginTop: 6 }}>
                                Professionals available near you · Safe & Verified
                            </Text>
                        </View>

                        {filteredServices.length === 0 && (
                            <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 12, alignItems: "center" }}>
                                <Text style={{ color: "#374151", fontSize: 15, marginBottom: 8 }}>No services found in this category yet.</Text>
                                <Text style={{ color: "#9CA3AF" }}>We're adding more services shortly — try a different category.</Text>
                            </View>
                        )}

                        {filteredServices.map((item, idx) => {
                            const delay = idx * 120;
                            const itemOpacity = useRef(new Animated.Value(0)).current;
                            const itemTranslate = useRef(new Animated.Value(16)).current;

                            useEffect(() => {
                                const id = setTimeout(() => {
                                    Animated.parallel([
                                        Animated.timing(itemOpacity, { toValue: 1, duration: 360, useNativeDriver: true }),
                                        Animated.timing(itemTranslate, { toValue: 0, duration: 360, useNativeDriver: true }),
                                    ]).start();
                                }, delay);
                                return () => clearTimeout(id);
                            }, [itemOpacity, itemTranslate, delay]);

                            return (
                                <Animated.View key={item.id} style={{ marginTop: 12, opacity: itemOpacity, transform: [{ translateY: itemTranslate }] }}>
                                    <View style={{ backgroundColor: "#fff", borderRadius: 14, padding: 12, flexDirection: "row", alignItems: "center", elevation: 2 }}>
                                        <Image
                                            source={item.img}
                                            style={{ width: 80, height: 80, borderRadius: 12, marginRight: 12, resizeMode: "cover" }}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.title}</Text>
                                            <Text style={{ color: "#6B7280", marginTop: 6 }}>{item.subtitle}</Text>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                                <Text style={{ fontWeight: "800", fontSize: 15 }}>₹{item.price}</Text>
                                                <TouchableOpacity
                                                    activeOpacity={0.85}
                                                    onPress={() => addToCart(item)}
                                                    style={{ backgroundColor: "#FF6B00", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 }}
                                                >
                                                    <Text style={{ color: "#fff", fontWeight: "700" }}>Add</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Animated.View>
                            );
                        })}
                    </Animated.View>
                </Animated.ScrollView>
            </View>
        </>
    );
}
