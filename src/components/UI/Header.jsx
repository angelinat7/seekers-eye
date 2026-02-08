import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";

export default function Header({ purpose }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.gradient.start, Colors.gradient.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 16, borderRadius: 8 }}
      >
        <Text style={styles.title}>Seeker's Eye</Text>
        <Text
          style={[
            styles.subtitle,
            purpose === "HOME" && styles.home.subtitle,
            purpose === "AUTH" && styles.auth.subtitle,
          ]}
        >
          PHOTO CONTEST
        </Text>
        {purpose === "AUTH" && (
          <>
            <Text style={styles.tagline}>See what others see!</Text>
            <Text style={styles.message}>Login to continue voting</Text>
          </>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  imageContainer: {
    paddingLeft: 20,
    paddingTop: 30,
  },
  title: {
    marginTop: 30,
    letterSpacing: 2,
    color: "#fff",
    fontFamily: "KaushanScript",
    fontSize: 40,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
    letterSpacing: 1.8,
    paddingLeft: 5,
  },
  home: {
    subtitle: {
      lineHeight: 14,
      marginBottom: 5,
    },
  },
  auth: {
    subtitle: {
      lineHeight: 24,
      marginVertical: 10,
    },
  },
  tagline: {
    fontSize: 24,
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
    fontFamily: "KaushanScript",
    letterSpacing: 2.5,
  },
  message: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});
