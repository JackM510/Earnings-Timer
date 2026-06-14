import { useState, useRef, useEffect } from "react";
import { Animated, Vibration } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import notifee, { TriggerType, TimestampTrigger } from '@notifee/react-native';
import RateScreen from "./src/screens/RateScreen";
import TimerSetupScreen from "./src/screens/TimerSetupScreen";
import TimerRunningScreen from "./src/screens/TimerRunningScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  // Fade-in on app launch
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Setup Notification channel
  useEffect(() => {
    async function setup() {
      await notifee.requestPermission();
      await notifee.createChannel({
        id: 'timer',
        name: 'Timer Notifications',
        importance: 4,
      });
    }
    setup();
  }, []);

  // User input (rate/time)
  const [rate, setRate] = useState(""); // Empty so placeholder can set '$0.00' by default
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  // Timer engine variables
  const [finishTime, setFinishTime] = useState<number | null>(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  // Pause/resume variables
  const [isPaused, setIsPaused] = useState(false);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  // Notification variables
  const [hasFired, setHasFired] = useState(false);
  const [finalEarnings, setFinalEarnings] = useState('0.00');

  // Schedule Timer Finished Notification 
  async function scheduleEndNotification(timestamp: number, earnings: string) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
    };
    await notifee.createTriggerNotification(
      {
        title: 'Timer Finished',
        body: `Total Earned: $${earnings}`,
        android: {
          channelId: 'timer',
          pressAction: { id: 'default' },
        },
      },
      trigger
    );
  }

  // Start Timer
  const startTimer = async (h: string, m: string, s: string) => {
    // Cancel any scheduled notifications
    await notifee.cancelTriggerNotifications();
    await notifee.cancelAllNotifications();
    // Get remaining seconds till timer finished
    const total =
      Number(h) * 3600 +
      Number(m) * 60 +
      Number(s);
    setTotalSeconds(total);
    setRemaining(total);
    // Set finish time
    const now = Date.now();
    const end = now + total * 1000;
    setFinishTime(end);
    setIsPaused(false);
    setPausedAt(null);
    setHasFired(false);
    // Calculate final earnings for notifications
    const earningsPerSecond = Number(rate) / 3600;
    const totalEarned = (total * earningsPerSecond).toFixed(2);
    setFinalEarnings(totalEarned);
    await scheduleEndNotification(end, totalEarned);
  };
  // Pause Timer
  const pauseTimer = async () => {
    setIsPaused(true);
    setPausedAt(Date.now());
    // Cancel any scheduled notifications
    await notifee.cancelTriggerNotifications();
    await notifee.cancelAllNotifications();
  };
  // Resume Timer
  const resumeTimer = async () => {
    if (!pausedAt || !finishTime) return;
    // Cancel any old scheduled notifications
    await notifee.cancelTriggerNotifications();
    await notifee.cancelAllNotifications();
    // Update the new finish time
    const now = Date.now();
    const pausedDuration = now - pausedAt;
    const newFinish = finishTime + pausedDuration;
    setFinishTime(newFinish);
    setIsPaused(false);
    setPausedAt(null);
    // Schedule a new timer finished notification
    await scheduleEndNotification(newFinish, finalEarnings);
  };
  // Reset the timer
  const resetAll = async () => {
    // Cancel any scheduled notifications
    await notifee.cancelTriggerNotifications();
    await notifee.cancelAllNotifications();
    // Reset user input
    setRate("");
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    // Reset time and notification variables
    setFinishTime(null);
    setTotalSeconds(0);
    setRemaining(0);
    setIsPaused(false);
    setPausedAt(null);
    setHasFired(false);
    setFinalEarnings("0.00");
  };
  // Timer Interval Function
  useEffect(() => {
    if (!finishTime || isPaused) return;
    // Run every second
    const runTick = () => {
      if (!finishTime || isPaused) return;
      const now = Date.now();
      const msRemaining = finishTime - now;
      const newRemaining = Math.max(0, Math.ceil(msRemaining / 1000));
      setRemaining(newRemaining);
      if (newRemaining === 0 && !hasFired) {
        // Fire a vibration only once when the timer is finished
        setHasFired(true);
        Vibration.vibrate(1000);
        clearInterval(interval); // Stop the timer
      }
    };
    runTick(); // Use runTick to run immediately and prevent tick jumps
    const interval = setInterval(runTick, 1000);
    return () => clearInterval(interval);
  }, [finishTime, isPaused]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
          {/* 1. Rate Screen */}
          <Stack.Screen name="Rate">
            {(props) => (
              <RateScreen
                {...props}
                rate={rate}
                setRate={setRate}
              />
            )}
          </Stack.Screen>
          {/* 2. Timer Setup Screen */}
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
          {/* 3. Timer Running Screen */}
          <Stack.Screen name="Running">
            {(props) => (
              <TimerRunningScreen
                {...props}
                rate={rate}
                totalSeconds={totalSeconds}
                remaining={remaining}
                isPaused={isPaused}
                pauseTimer={pauseTimer}
                resumeTimer={resumeTimer}
                resetAll={resetAll}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}