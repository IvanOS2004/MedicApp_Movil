import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface CarouselProps {
  autoPlay?: boolean;
  interval?: number;
}

const carousel: React.FC<CarouselProps> = ({
  autoPlay = true,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const images = [
    //require('@/assets/images/banner1.jpg'),
    "https://picsum.photos/400/200?random=1",
    "https://picsum.photos/400/200?random=2",
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4",
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      goToSlide(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (screenWidth - 48));
    setCurrentIndex(index);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * (screenWidth - 32),
      animated: true,
    });
  };

  return (
    <View className="mb-6">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={{ width: screenWidth - 36 }}
            className="mx-4 overflow-hidden rounded-2xl"
            onPress={() => {
              // Links de navegación a otras pantallas
              console.log("Pressed image:", index);
            }}
          >
            <Image
              source={{ uri: image }}
              className="w-80% h-48 rounded-2xl"
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default carousel;
