import React, { useRef, useState } from "react";
import { View, FlatList, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const bannerWidth = width * 0.92;
const bannerHeight = 200;

const banners = [
  require("../assets/banner.png"),
  require("../assets/banner2.png"),
  require("../assets/banner3.png"),
];

export default function PromoBannerSlider() {
  const [index, setIndex] = useState(0);

  const onScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(scrollPosition / width);
    setIndex(selectedIndex);
  };

  return (
    <View className="mt-4 w-full items-center ">
      {/* SLIDER */}
      <FlatList
        data={banners}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <View
            style={{ width: width }}
            className="px-4"
          >
            <Image
              source={item}
              style={{
                width: bannerWidth,
                height: bannerHeight,
                borderRadius: 18,
              }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* DOT INDICATORS */}
      <View className="flex-row mt-3">
        {banners.map((_, i) => (
          <View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: i === index ? "#4B6FFF" : "#C4C4C4",
            }}
          />
        ))}
      </View>
    </View>
  );
}
