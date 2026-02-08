import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export default function TextButton({
  title,
  color,
  onPress,
  disabled = false,
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Text style={[styles.button, styles[color], disabled && styles.disabled]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    fontWeight: "bold",
  },
  primary: {
    color: Colors.primary,
  },
  accent: {
    color: Colors.accent,
  },
  secondary: {
    color: Colors.secondary,
  },
  textSecondary: {
    color: Colors.textSecondary,
  },
  disabled: {
    opacity: 0.6,
  },
});
