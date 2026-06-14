import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/global";
import Svg, { Circle } from "react-native-svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type TimerRunningProps = {
    navigation: any;
    rate: string;
    totalSeconds: number;
    remaining: number;
    isPaused: boolean;
    pauseTimer: () => void;
    resumeTimer: () => void;
    resetAll: () => void;
};

export default function TimerRunningScreen({
    navigation,
    rate,
    totalSeconds,
    remaining,
    isPaused,
    pauseTimer,
    resumeTimer,
    resetAll,
}: TimerRunningProps) {
    // Get time data and calculate remaining seconds
    const remainingSeconds = remaining;
    const hrs = Math.floor(remainingSeconds / 3600);
    const mins = Math.floor((remainingSeconds % 3600) / 60);
    const secs = (remainingSeconds % 60);
    // Determine the value of earned
    const earningsPerSecond = Number(rate) / 3600;
    const elapsedSeconds = Math.max(0, totalSeconds - remainingSeconds);
    const earned = (elapsedSeconds * earningsPerSecond).toFixed(2);
    // Toggle Pause function
    const togglePause = () => {
        if (!isPaused) pauseTimer();
        else resumeTimer();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Timer Countdown */}
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <Svg width={200} height={200}>
                        {/* Grey Circle */}
                        <Circle
                            cx="100"
                            cy="100"
                            r="90"
                            stroke="lightgrey"
                            strokeWidth="12"
                            fill="none"
                        />
                        {/* Render Green Circle if timer has started */}
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
                                transform="rotate(-90, 100, 100)"
                            />
                        )}
                    </Svg>
                    {/* Remaining Time */}
                    <View style={{ position: "absolute", top: 80 }}>
                        <Text style={styles.heading}>
                            {hrs.toString().padStart(2, "0")}:
                            {mins.toString().padStart(2, "0")}:
                            {secs.toString().padStart(2, "0")}
                        </Text>
                    </View>
                </View>
                {/* Total Earned */}
                <Text style={styles.text}>Total: ${earned}</Text>
                {/* Buttons */}
                <View style={styles.row}>
                    {/* Pause/Resume Button */}
                    <TouchableOpacity
                        style={[styles.button, isPaused ? styles.bgBlue : styles.bgGray,]}
                        onPress={togglePause}
                    >
                        <MaterialIcons
                            name={isPaused ? "play-arrow" : "pause"} // Update icon state
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    {/* Stop Button */}
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