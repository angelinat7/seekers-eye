import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../context/theme/ThemeContext";

export default function ButtonLink({
  title,
  colorKey = "primary",
  size = "md",
  disabled = false,
  onPress,
}) {
  const { theme } = useTheme();

  const sizes = {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { fontSize: sizes[size] },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={{ color: theme[colorKey], fontWeight: "bold" }}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    fontWeight: "bold",
    paddingVertical: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
