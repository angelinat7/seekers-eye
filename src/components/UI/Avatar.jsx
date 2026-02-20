import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";

export default function Avatar({ size = "sm", avatar }) {
  const { user } = useAuth();
  const { theme } = useTheme();

  const uri = avatar ?? user?.avatar ?? "";

  const sizes = {
    sm: 18,
    lg: 28,
    xl: 40,
  };

  const initials = user.username?.trim()
    ? user.username
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <View>
      {uri ? (
        <View style={[styles[size], styles.avatarContainer]}>
          <Image source={{ uri: uri }} style={styles.avatarImage} />
        </View>
      ) : (
        <LinearGradient
          style={[styles[size], styles.avatarContainer]}
          colors={[theme.gradient.start, theme.gradient.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.avatarText, { fontSize: sizes[size] }]}>
            {initials ? (
              initials
            ) : (
              <Ionicons
                name="person-outline"
                size={20}
                color={theme.textPrimary}
              />
            )}
          </Text>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  sm: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  lg: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  xl: {
    width: 140,
    height: 140,
    borderRadius: 75,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarText: {
    color: "#fff",
  },
});
