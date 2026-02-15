import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "../../constants/themes";
import { useTheme } from "@react-navigation/native";

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
              size={18}
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
    gap: 10,
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 10,
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
  },
});
