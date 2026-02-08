import { Pressable, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PrimaryButton({
  title,
  iconName,
  disabled = false,
  onPress,
}) {
  const [pressed, setPressed] = useState(false);
  const gradientColors = pressed
    ? [Colors.gradient.end, Colors.gradient.start]
    : [Colors.gradient.start, Colors.gradient.end];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={({ pressed }) => [
        styles.button,
        pressed && { transform: [{ scale: 0.97 }] },
        disabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, disabled && styles.disabled]}
      >
        <View style={styles.iconContainer}>
          <Ionicons size={24} name={iconName} color="white" />
          <Text style={styles.buttonTitle}>{title}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});
