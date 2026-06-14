import { useRef } from "react";
import { View, Text, ScrollView } from "react-native";

type TimeUnitProps = {
  value: string;
  setValue: (value: string) => void;
  max: number;
};

export default function TimeUnit({ value, setValue, max }: TimeUnitProps) {
  const itemHeight = 48; // Height of each row in the scroll wheel
  const scrollRef = useRef<ScrollView | null>(null); // Reference the ScrollView for manual repositioning
  // Get the base list of values (00 → max)
  const base = Array.from({ length: max + 1 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  // Triple the list to simulate infinite scrolling
  const data = [...base, ...base, ...base];
  const middleIndex = base.length; // Starting index in middle list (00)
  const selectedIndex = base.indexOf(value); // Index of selected value inside middle list
  const initialIndex = middleIndex + selectedIndex; // Place the selected value inside the middle list
  const initialOffset = initialIndex * itemHeight; // Scroll to correct position of selected value

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
          // Convert scroll position to the index in the list
          const index = Math.round(e.nativeEvent.contentOffset.y / itemHeight);
          const realIndex = index % base.length; // Convert index in the tripled list to the index in the base list
          const newValue = base[realIndex]; // Get the actual value inside the base list
          setValue(newValue);

          // If the user scrolls too far into block 1 or block 3
          // Move them back into middle block to maintain infinite looping
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
          // Determine if the item is active
          const isActive = item === value;
          return (
            <View
              key={`${item}-${i}`}
              style={{
                height: itemHeight,
                justifyContent: "center",
                alignItems: "center",
                opacity: isActive ? 1 : 0.3, // Full opacity if active
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