import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import LocationHeader from "../../components/locationHeader";
import SearchBar from "../../components/SearchBar";
import CategoryGrid from "../../components/CategoryGrid";
import BannerCarousel from "../../components/BannerCarousel";
import NewAndNoteworthy from "../../components/NewAndNoteworthy";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <LocationHeader />
        <SearchBar />
        <CategoryGrid />
        <BannerCarousel />
        <NewAndNoteworthy />
      </ScrollView>
    </SafeAreaView>
  );
}
