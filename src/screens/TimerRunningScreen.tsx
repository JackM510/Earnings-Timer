import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/global";
import Svg, { Circle } from "react-native-svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type TimerRunningProps = {
  navigation: any;
  rate: string;
  pauseTimer: () => void;
  resumeTimer: () => void;
  totalSeconds: number;
  remaining: number;
  isPaused: boolean;
  resetAll: () => void;
};

export default function TimerRunningScreen({
  navigation,
  rate,
  pauseTimer,
  resumeTimer,
  totalSeconds,
  remaining,
  isPaused,
  resetAll,
}: TimerRunningProps) {
    // Time data
    const remainingSeconds = remaining;
    const hrs = Math.floor(remainingSeconds / 3600);
    const mins = Math.floor((remainingSeconds % 3600) / 60);
    const secs = (remainingSeconds % 60);
    // Earnings data
    const earningsPerSecond = Number(rate) / 3600;
    const elapsedSeconds = Math.max(0, totalSeconds - remainingSeconds);
    const earned = (elapsedSeconds * earningsPerSecond).toFixed(2);
    // Toggle Pause
    const togglePause = () => {
        if (!isPaused) pauseTimer();
        else resumeTimer();
    };

    return (
        <View style={styles.container}>
        <View style={styles.content}>
            <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Svg width={200} height={200}>
                <Circle
                cx="100"
                cy="100"
                r="90"
                stroke="lightgrey"
                strokeWidth="12"
                fill="none"
                />
                {remaining !== totalSeconds && (
                    <Circle
                        cx="100"
                        cy="100"
                        r="90"
                        stroke="lightgreen"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 90}
                        strokeDashoffset={
                            (2 * Math.PI * 90) *
                            (remainingSeconds / (totalSeconds || 1))
                        }
                        strokeLinecap="round"
                        rotation="-90"
                        origin="100, 100"
                        />
                )} 
            </Svg>

            <View style={{ position: "absolute", top: 80 }}>
                <Text style={styles.heading}>
                {hrs.toString().padStart(2, "0")}:
                {mins.toString().padStart(2, "0")}:
                {secs.toString().padStart(2, "0")}
                </Text>
            </View>
            </View>

            <Text style={styles.text}>Total: ${earned}</Text>

            <View style={styles.row}>
            <TouchableOpacity
                style={[
                styles.button,
                isPaused ? styles.bgBlue : styles.bgGray,
                ]}
                onPress={togglePause}
            >
                <MaterialIcons
                name={isPaused ? "play-arrow" : "pause"}
                size={24}
                color="#fff"
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.bgGray]}
                onPress={() => {
                resetAll();
                navigation.navigate("Rate");
                }}
            >
                <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
        </View>
        </View>
    );
}