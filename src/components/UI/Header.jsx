import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/theme/ThemeContext";

import { HEADER_VARIANTS } from "../../constants/header-variants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ variant = "HOME" }) {
  const { theme } = useTheme();
  const config = HEADER_VARIANTS[variant] || HEADER_VARIANTS.HOME;
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[theme.gradient.start, theme.gradient.end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: theme.header.title }]}>
          Seeker's Eye
        </Text>
        {config.showSettings && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <Ionicons
              color={theme.header.title}
              name="settings-outline"
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      {config.showSubtitle && (
        <Text
          style={[
            styles.subtitle,
            getSubtitleStyle(variant),
            { color: theme.header.subtitle },
          ]}
        >
          PHOTO CONTEST
        </Text>
      )}

      {config.showTagline && (
        <Text style={[styles.tagline, { color: theme.header.title }]}>
          See what others see!
        </Text>
      )}

      {config.showMessage && (
        <Text style={[styles.message, { color: theme.header.title }]}>
          {config.message}
        </Text>
      )}
    </LinearGradient>
  );
}

const getSubtitleStyle = (variant) => {
  const styles = StyleSheet.create({
    home: {
      lineHeight: 14,
      marginBottom: 5,
    },
    auth: {
      lineHeight: 24,
      marginVertical: 10,
    },
  });

  return variant === "HOME" ? styles.home : styles.auth;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  title: {
    marginTop: 30,
    letterSpacing: 2,
    fontFamily: "KaushanScript",
    fontSize: 40,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.8,
    paddingLeft: 10,
  },
  tagline: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "KaushanScript",
    letterSpacing: 2.5,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});
