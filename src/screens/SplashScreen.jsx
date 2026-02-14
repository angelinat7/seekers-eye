import { StyleSheet, View, Text, Image } from "react-native";
import { useTheme } from "../context/theme/ThemeContext";

export default function SplashScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require("../../assets/images/seeker's-eye.png")}
        style={styles.logo}
      />
      <Text style={[styles.tagline, { color: theme.primary }]}>
        See what others see
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },

  tagline: {
    fontSize: 36,
    textAlign: "center",
    fontFamily: "KaushanScript",
  },
});
