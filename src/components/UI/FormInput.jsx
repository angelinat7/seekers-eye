import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormInput({
  label,
  theme,
  editable = true,
  secureTextEntry = false,
  multiline = false,
  style,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.label }]}>{label}</Text>
      <TextInput
        {...props}
        editable={editable}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multilineInput,
          {
            borderColor: theme.border,
            backgroundColor: theme.surface,
            color: theme.textPrimary,
          },
          !editable && styles.disabled,
          style,
        ]}
        placeholderTextColor={theme.textSecondary}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 10,
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
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  disabled: {
    opacity: 0.6,
  },
});
