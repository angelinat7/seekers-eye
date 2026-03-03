import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

export default function ImageQualitySlider({ quality, setQuality, theme }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        Image Quality: {Math.round(quality * 100)}%
      </Text>
      <Slider
        minimumValue={0.1}
        maximumValue={1}
        value={quality}
        onValueChange={setQuality}
        step={0.1}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.tab.inactive}
        thumbTintColor={theme.accent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  text: {
    marginBottom: 10,
    fontWeight: 600,
    paddingLeft: 16,
  },
});
