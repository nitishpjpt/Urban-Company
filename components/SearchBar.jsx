import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
    return (
        <View className="px-4 mt-3 mb-4">
            <View className="
                flex-row items-center 
                border border-gray-300 
                rounded-full 
                px-4 
                h-12 
                bg-white 
                overflow-hidden
            ">
                <Ionicons name="search-outline" size={20} color="#6b7280" />

                <TextInput
                    placeholder="Search for electrician, plumber, cleaner..."
                    placeholderTextColor="#6b7280"
                    className="ml-2 flex-1 text-gray-700"
                />
            </View>
        </View>
    );
}
