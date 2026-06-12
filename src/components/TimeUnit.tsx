import React, { useRef } from "react";
import { View, Text, ScrollView } from "react-native";

type TimeUnitProps = {
  value: string;
  setValue: (v: string) => void;
  max: number;
};

export default function TimeUnit({ value, setValue, max }: TimeUnitProps) {
  const itemHeight = 48;
  const scrollRef = useRef<ScrollView | null>(null);

  // Base values: "00", "01", ..., max
  const base = Array.from({ length: max + 1 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const middleIndex = base.length;
  const data = [...base, ...base, ...base];

  const selectedIndex = base.indexOf(value);
  const initialIndex = middleIndex + selectedIndex;

  // Correct initial offset
  const initialOffset = initialIndex * itemHeight;

  return (
    <View style={{ height: itemHeight * 3, overflow: "hidden" }}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: itemHeight }}
        contentOffset={{ y: initialOffset, x: 0 }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / itemHeight);
          const realIndex = index % base.length;
          const newValue = base[realIndex];

          setValue(newValue);

          // Re-center if scrolled too far up or down
          if (index < base.length || index >= base.length * 2) {
            const newCenter = middleIndex + realIndex;
            scrollRef.current?.scrollTo({
              y: newCenter * itemHeight,
              animated: false,
            });
          }
        }}
      >
        {data.map((item, i) => {
          const isActive = item === value;
          return (
            <View
              key={`${item}-${i}`}
              style={{
                height: itemHeight,
                justifyContent: "center",
                alignItems: "center",
                opacity: isActive ? 1 : 0.3,
              }}
            >
              <Text style={{ fontSize: 32 }}>{item}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}