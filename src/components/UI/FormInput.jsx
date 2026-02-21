import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormInput({
  label,
  message,
  theme,
  editable = true,
  secureTextEntry = false,
  multiline = false,
  style,
  ...props
}) {
  return (
    <View>
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
      <Text style={[styles.message, { color: theme.textSecondary }]}>
        {message ? message : null}
      </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    padding: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
  },
  multilineInput: {
    height: 60,
    textAlignVertical: "top",
  },
  message: {
    fontSize: 10,
    paddingTop: 2,
    paddingLeft: 4,
  },
  disabled: {
    opacity: 0.6,
  },
});
