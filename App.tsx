import { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RateScreen from "./src/screens/RateScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Rate state only
  const [rate, setRate] = useState("");

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name="Rate">
            {(props) => (
              <RateScreen
                {...props}
                rate={rate}
                setRate={setRate}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}
