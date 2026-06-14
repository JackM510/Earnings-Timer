import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from "../styles/global";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RateScreenProps = {
  navigation: any;
  rate: string;
  setRate: (value: string) => void;
};

export default function RateScreen({ navigation, rate, setRate }: RateScreenProps) {
  const isRateValid = rate !== "" && Number(rate) > 0;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Hourly Rate</Text>
        {/* Rate input */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="$0.00"
          placeholderTextColor="darkgray"
          value={rate ? `$${rate}` : ""}
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9.]/g, "");
            setRate(cleaned);
          }}
          onBlur={() => {
            if (!rate) return;
            const num = Number(rate);
            if (!isNaN(num)) {
              setRate(num.toFixed(2));
            }
          }}
        />
        {/* Next button */}
        <TouchableOpacity
          style={[styles.button, styles.bgBlue, !isRateValid && styles.buttonDisabled]}
          disabled={!isRateValid}
          onPress={() => isRateValid && navigation.navigate("Setup")}
        >
          <MaterialIcons name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}