import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormInput({
  label,
  theme,
  editable = true,
  secureTextEntry = false,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.label }]}>{label}</Text>
      <TextInput
        {...props}
        editable={editable}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          {
            borderColor: theme.border,
            backgroundColor: theme.surface,
            color: theme.textPrimary,
          },
          !editable && styles.disabled,
        ]}
        placeholderTextColor={theme.textSecondary}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});
