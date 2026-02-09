import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Header from "../components/UI/Header";
import PrimaryButton from "../components/UI/PrimaryButton";
import TextButton from "../components/UI/TextButton";
import { Colors } from "../constants/Colors";
import AuthLayout from "../components/UI/AuthLayout";

export default function LoginScreen({ navigation }) {
  return (
    <AuthLayout purpose="AUTH">
      <View style={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your email" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
          />
        </View>
        <PrimaryButton
          title="Login"
          iconName="log-in-outline"
          onPress={() => {}}
        />
        <View style={styles.buttonRow}>
          <Text style={styles.info}>Don't have an account?</Text>
          <TextButton
            title="Register here"
            color="accent"
            onPress={() => null}
          />
        </View>
        <View style={{ marginTop: 20, justifyContent: "center" }}>
          <TextButton title="Continue as guest" color="textSecondary" />
        </View>
      </View>
    </AuthLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "transparent",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textSecondary,
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
    color: Colors.textSecondary,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    justifyContent: "center",
  },
});
