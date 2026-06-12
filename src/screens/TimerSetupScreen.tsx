import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "../styles/global";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TimeUnit from '../components/TimeUnit';

type TimerSetupProps = {
  navigation: any;
  hours: string;
  minutes: string;
  seconds: string;
  setHours: (v: string) => void;
  setMinutes: (v: string) => void;
  setSeconds: (v: string) => void;
  startTimer: (h: string, m: string, s: string) => void;
};

export default function TimerSetupScreen({
  navigation,
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
  startTimer
}: TimerSetupProps) {

  const timeIsValid =
    Number(hours) > 0 ||
    Number(minutes) > 0 ||
    Number(seconds) > 0;

  const resetTime = () => {
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.heading, { alignItems: "center" }]}>Set Timer</Text>

        {/* TimeUnit Row */}
        <View style={[styles.row, { paddingHorizontal: 16, paddingVertical: 8 }]}>
          <TimeUnit value={hours} setValue={setHours} max={23} />
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.heading}>:</Text>
          </View>
          <TimeUnit value={minutes} setValue={setMinutes} max={59} />
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.heading}>:</Text>
          </View>
          <TimeUnit value={seconds} setValue={setSeconds} max={59} />
        </View>

        {/* Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.bgGray]}
            onPress={() => {
              navigation.navigate("Rate");
              resetTime();
            }}
          >
            <MaterialIcons name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.bgBlue, !timeIsValid && styles.buttonDisabled]}
            disabled={!timeIsValid}
            onPress={() => {
              startTimer(hours, minutes, seconds);
              navigation.navigate("Running");
            }}
          >
            <MaterialIcons name="play-arrow" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
