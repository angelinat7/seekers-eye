import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ThemeSwitch({
  mode,
  onChange,
  theme,
  variant = "compact",
}) {
  const options = [
    { label: "Light", value: "light", icon: "sunny-outline" },
    { label: "Dark", value: "dark", icon: "moon-outline" },
    { label: "System", value: "system", icon: "settings-outline" },
  ];
  return (
    <View
      style={[styles.container, variant === "full" && styles.fullContainer]}
    >
      {options.map((option) => {
        const isActive = mode === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
              variant === "full" && styles.optionFull,
              {
                backgroundColor: isActive ? theme.primary : theme.surface,
              },
            ]}
          >
            <Ionicons
              name={option.icon}
              size={14}
              color={isActive ? "white" : theme.primary}
            />
            <Text
              style={[
                styles.label,
                variant === "full" && styles.labelFull,
                { color: isActive ? "white" : theme.primary },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "transparent",
    flexDirection: "row",
    gap: 8,
  },
  fullContainer: {
    width: "100%",
  },
  option: {
    flexDirection: "row",
    padding: 6,
    borderRadius: 8,
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  optionFull: {
    flex: 1,
    paddingVertical: 8,
    gap: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: 400,
  },
  labelFull: {
    fontSize: 12,
  },
});
