import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { badge } from "../../constants/themes";

export default function Badge({ state = "CLOSED" }) {
  const title = state === "CLOSED" ? "Closed" : "Open";
  return (
    <View
      style={[
        styles.container,
        state === "CLOSED" ? styles.bgClosed : styles.bgOpen,
      ]}
    >
      <Ionicons
        name={state === "CLOSED" ? "lock-closed-outline" : "lock-open-outline"}
        size={14}
        color={badge.text}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    gap: 6,
  },
  bgClosed: {
    backgroundColor: badge.bgClosed,
  },
  bgOpen: {
    backgroundColor: badge.bgOpen,
  },
  text: {
    fontSize: 10,
    fontWeight: 600,
    color: badge.text,
  },
});
