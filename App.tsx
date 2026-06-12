import { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RateScreen from "./src/screens/RateScreen";
import TimerSetupScreen from "./src/screens/TimerSetupScreen";
import TimerRunningScreen from "./src/screens/TimerRunningScreen";

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
  // Setup values
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  // Timer engine state
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finishTime, setFinishTime] = useState<number | null>(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);

  // Pause/resume
  const [isPaused, setIsPaused] = useState(false);
  const [pausedAt, setPausedAt] = useState<number | null>(null);


  // -----------------------------
  // ⭐ START TIMER
  // -----------------------------
  const startTimer = (h: string, m: string, s: string) => {
    const total =
      Number(h) * 3600 +
      Number(m) * 60 +
      Number(s);

    setTotalSeconds(total);
    setRemaining(total);

    const now = Date.now();
    setStartTime(now);
    setFinishTime(now + total * 1000);

    setIsPaused(false);
    setPausedAt(null);
  };

  // -----------------------------
  // ⭐ PAUSE TIMER
  // -----------------------------
  const pauseTimer = () => {
    setIsPaused(true);
    setPausedAt(Date.now());
  };

  // -----------------------------
  // ⭐ RESUME TIMER
  // -----------------------------
  const resumeTimer = () => {
    if (!pausedAt || !finishTime) return;

    const now = Date.now();
    const pausedDuration = now - pausedAt;
    const newFinish = finishTime + pausedDuration;

    setFinishTime(newFinish);
    setIsPaused(false);
    setPausedAt(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!finishTime || isPaused) return;

      const now = Date.now();
      const msRemaining = finishTime - now;
      const newRemaining = Math.max(0, Math.floor(msRemaining / 1000));

      setRemaining(newRemaining);

      if (newRemaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [finishTime, isPaused]);


  // -----------------------------
  // ⭐ RESET
  // -----------------------------
  const resetAll = () => {
    setRate("");
    setHours("00");
    setMinutes("00");
    setSeconds("00");

    setStartTime(null);
    setFinishTime(null);
    setTotalSeconds(0);
    setRemaining(0);

    setIsPaused(false);
    setPausedAt(null);
  };

  // -----------------------------
  // NAVIGATION
  // -----------------------------
  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name="Rate">
            {(props) => (
              <RateScreen {...props} rate={rate} setRate={setRate} />
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

          <Stack.Screen name="Running">
            {(props) => (
              <TimerRunningScreen
                {...props}
                rate={rate}
                startTime={startTime}
                finishTime={finishTime}
                pauseTimer={pauseTimer}
                resumeTimer={resumeTimer}
                totalSeconds={totalSeconds}
                remaining={remaining}
                setRemaining={setRemaining}
                isPaused={isPaused}
                resetAll={resetAll}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}
