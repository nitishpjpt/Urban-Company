import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    StatusBar,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import LocationHeader from "../../components/locationHeader";
import { MaterialIcons } from "@expo/vector-icons";

const providerData = {
    painter: [
        { id: 1, name: "Rohit Painter", rating: 4.8, experience: "5 years" },
        { id: 2, name: "Aman Painter", rating: 4.5, experience: "3 years" },
    ],
    electrician: [
        { id: 1, name: "Sanjay Electrician", rating: 4.7, experience: "4 years" },
    ],
    plumber: [
        { id: 1, name: "Ravi Plumber", rating: 4.6, experience: "6 years" },
    ],
    acservice: [
        { id: 1, name: "Mukesh Kumar", rating: 4.6, experience: "4 years" },
    ],
};

export default function ProviderList() {
    const { category } = useLocalSearchParams();

    let parsedCategory;
    try {
        parsedCategory = JSON.parse(category);
    } catch (error) {
        console.log("Error parsing category:", error);
        parsedCategory = {}
    }

    const VISIT_CHARGE = 150;

    // Animations
    const headerY = useRef(new Animated.Value(-120)).current;
    const listOpacity = useRef(new Animated.Value(0)).current;
    const listTranslate = useRef(new Animated.Value(25)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(headerY, {
                toValue: 0,
                duration: 380,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(listOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(listTranslate, {
                    toValue: 0,
                    duration: 420,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

   const handleBack = () => {
    Animated.parallel([
        Animated.timing(listOpacity, { toValue: 0, duration: 220, useNativeDriver: true }),
        Animated.timing(listTranslate, { toValue: 20, duration: 220, useNativeDriver: true }),
        Animated.timing(headerY, { toValue: -120, duration: 260, useNativeDriver: true }),
    ]).start(() => router.back());
};


    return (
        <>
            <LocationHeader />
            <View className="flex-1 bg-[#F8F8F8]">
                <StatusBar style="dark" />

                {/* Header Animation */}
                <Animated.View
                    style={{
                        height: 110,
                        backgroundColor: "#0B61FF",
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                        paddingTop: 20,
                        paddingHorizontal: 84,
                        transform: [{ translateY: headerY }],
                    }}
                >
                    <Text className="text-white text-xl font-semibold">
                        {parsedCategory.name} Experts
                    </Text>
                    <Text className="text-blue-100 mt-1 text-sm">
                        Best professionals near you · ₹{VISIT_CHARGE} visiting charge
                    </Text>
                </Animated.View>


                {/* Back Button */}
                <View style={{ position: "absolute", top: 30, left: 14, zIndex: 20 }}>
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
                        <MaterialIcons name="arrow-back" size={20}  color="#0B61FF" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        opacity: listOpacity,
                        transform: [{ translateY: listTranslate }],
                        marginTop: -10,
                        padding: 16,
                    }}
                >
                    {/* Info Card */}
                    <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
                        <Text className="text-lg font-bold">
                            Verified {parsedCategory.name} Providers
                        </Text>
                        <Text className="text-gray-500 mt-1">
                            Trained & background-verified professionals
                        </Text>

                        {/* Visiting Charge */}
                        <Text className="bg-blue-100 text-blue-700 mt-3 px-3 py-2 rounded-lg text-xs w-fit">
                            ₹{VISIT_CHARGE} Visiting Charge Applies
                        </Text>
                    </View>

                    {/* Provider Cards */}
                    {providerData[parsedCategory.id].map((p, index) => {
                        const cardOpacity = useRef(new Animated.Value(0)).current;
                        const cardTranslate = useRef(new Animated.Value(20)).current;

                        useEffect(() => {
                            const timer = setTimeout(() => {
                                Animated.parallel([
                                    Animated.timing(cardOpacity, {
                                        toValue: 1,
                                        duration: 350,
                                        useNativeDriver: true,
                                    }),
                                    Animated.timing(cardTranslate, {
                                        toValue: 0,
                                        duration: 350,
                                        useNativeDriver: true,
                                    }),
                                ]).start();
                            }, index * 120);

                            return () => clearTimeout(timer);
                        }, []);

                        return (
                            <Animated.View
                                key={p.id}
                                style={{
                                    opacity: cardOpacity,
                                    transform: [{ translateY: cardTranslate}],
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/ServiceForm",
                                            params: {
                                                provider: JSON.stringify({
                                                    id: p.id,
                                                    name: p.name,
                                                    rating: p.rating,
                                                    category: parsedCategory.name,
                                                    price: p.price || 0,
                                                }),
                                            },
                                        })
                                    }

                                    className="bg-white p-4 rounded-2xl mb-4 flex-row shadow-md"
                                    style={{ elevation: 4 }}
                                >
                                    <View className="bg-gray-100 rounded-xl p-2 mr-4">
                                        <Image
                                            source={require("../../assets/images/men.png")}
                                            className="h-20 w-20 rounded-xl"
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-lg font-semibold">{p.name}</Text>

                                        <View className="flex-row items-center mt-1">
                                            <Text className="bg-green-600 text-white px-2 py-1 rounded-md text-xs">
                                                ★ {p.rating}
                                            </Text>
                                            <Text className="text-gray-500 ml-2">
                                                {p.experience} experience
                                            </Text>
                                        </View>

                                        <Text className="bg-blue-100 text-blue-700 px-2 py-1 mt-2 rounded-md text-xs w-fit">
                                            ₹{VISIT_CHARGE} Visiting Charge
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>
            </View>
        </>
    );
}
