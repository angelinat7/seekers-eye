import { Pressable, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../context/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonOutlined({
  title,
  iconName,
  disabled = false,
  onPress,
  size = 24,
  color,
  style,
}) {
  const { theme } = useTheme();
  const buttonColor = color ?? theme.secondary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: buttonColor,
          backgroundColor: pressed ? `${buttonColor}15` : "transparent",
          // backgroundColor: pressed ? `${theme.secondary}15` : "transparent",
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={[styles.iconContainer]}>
        {iconName && (
          <Ionicons size={size} name={iconName} color={buttonColor} />
        )}
        <Text style={[styles.title, { color: buttonColor }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 8,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
