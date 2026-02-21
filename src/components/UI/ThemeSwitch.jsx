import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ThemeSwitch({ mode, onChange, theme }) {
  const options = [
    { label: "Light", value: "light", icon: "sunny-outline" },
    { label: "Dark", value: "dark", icon: "moon-outline" },
    { label: "System", value: "system", icon: "settings-outline" },
  ];
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {options.map((option) => {
        const isActive = mode === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
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
    flexDirection: "row",
    gap: 8,
  },
  option: {
    flexDirection: "row",
    padding: 6,
    borderRadius: 8,
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: 400,
  },
});
