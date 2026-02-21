import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../context/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonLink({
  title,
  colorKey = "primary",
  size = "md",
  iconName,
  iconSize = 16,
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
      {iconName && (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={theme[colorKey]}
          style={{ marginRight: 6 }}
        />
      )}
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
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
