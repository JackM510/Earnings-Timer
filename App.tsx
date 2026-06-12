import { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RateScreen from "./src/screens/RateScreen";
import TimerSetupScreen from "./src/screens/TimerSetupScreen";

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

  // Rate
  const [rate, setRate] = useState("");

  // Timer setup state
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  // Placeholder startTimer
  const startTimer = (h: string, m: string, s: string) => {
    console.log("startTimer called with:", h, m, s);
  };

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

          <Stack.Screen name="Setup">
            {(props) => (
              <TimerSetupScreen
                {...props}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                setHours={setHours}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
                startTimer={startTimer}
              />
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}
