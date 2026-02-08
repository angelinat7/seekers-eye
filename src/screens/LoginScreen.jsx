import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import Header from "../components/UI/Header";
import { Colors } from "../constants/Colors";

export default function LoginScreen({ navigation }) {
  return (
    <>
      <Header purpose="AUTH" />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your email" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••" />
        </View>

        <Button title="Login" onPress={() => {}} />
        <Text style={styles.info}>Don't have an account? Register here</Text>
        <Text style={styles.info}>Continue as guest</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.inputLabel,
    marginBottom: 8,
    textAlign: "left",
  },
  input: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#inputBorder",
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    marginBottom: 16,
  },
  info: {
    marginTop: 16,
    fontSize: 14,
    textAlign: "center",
  },
});
