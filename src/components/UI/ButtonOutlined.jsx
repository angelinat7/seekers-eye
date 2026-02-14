import { Pressable, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonOutlined({
  title,
  iconName,
  disabled = false,
  onPress,
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: theme.secondary,
          backgroundColor: pressed ? `${theme.secondary}15` : "transparent",
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.iconContainer}>
        {iconName && (
          <Ionicons size={24} name={iconName} color={theme.secondary} />
        )}
        <Text style={[styles.title, { color: theme.secondary }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
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
