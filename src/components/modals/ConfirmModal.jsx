import { Modal, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/theme/ThemeContext";
import ButtonOutlined from "../UI/buttons/ButtonOutlined";
import ButtonPrimary from "../UI/buttons/ButtonPrimary";

export default function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
  title,
  message,
}) {
  const { theme } = useTheme();
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.surface }]}>
          <Text style={[styles.title, { color: theme.accent }]}>
            {title.toUpperCase()}
          </Text>
          <Text style={[styles.message, { color: theme.textPrimary }]}>
            {message}
          </Text>
          <View style={styles.buttonsContainer}>
            <ButtonOutlined
              title="Cancel"
              style={{ width: "48%" }}
              onPress={onCancel}
            />
            <ButtonPrimary
              title="Confirm"
              style={{ width: "48%" }}
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    height: "40%",
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 32,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  button: {},
});
