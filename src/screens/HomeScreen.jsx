import { View, Text, StyleSheet } from "react-native";
import Header from "../components/UI/Header";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header purpose="HOME" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});

