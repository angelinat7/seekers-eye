import { Pressable, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../../context/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonPrimary({
  title,
  iconName,
  disabled = false,
  onPress,
  style,
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={
            pressed
              ? [theme.gradient.end, theme.gradient.start]
              : [theme.gradient.start, theme.gradient.end]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, disabled && styles.disabled]}
        >
          <View style={styles.iconContainer}>
            {iconName && (
              <Ionicons size={18} name={iconName} color={theme.surface} />
            )}
            <Text style={[styles.title, { color: theme.surface }]}>
              {title}
            </Text>
          </View>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  gradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
