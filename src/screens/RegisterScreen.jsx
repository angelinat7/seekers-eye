import { StyleSheet, Text, TextInput, View } from "react-native";
import AuthLayout from "../components/UI/AuthLayout";
import PrimaryButton from "../components/UI/PrimaryButton";
import TextButton from "../components/UI/TextButton";
import { Colors } from "../constants/Colors";
import { RedirectTargets } from "../constants/navigation";

export default function RegisterScreen({ navigation, route }) {
  const redirectTo = route.params?.redirectTo;

  const handleRegisterSuccess = () => {
    switch (redirectTo) {
      case RedirectTargets.ADD_PHOTO:
        navigation.replace("TabNavigator", { screen: "Upload" });
        break;
      case RedirectTargets.PROFILE:
        navigation.replace("TabNavigator", { screen: "Profile" });
        break;
      case RedirectTargets.HOME:
        navigation.replace("TabNavigator", { screen: "Home" });
        break;
    }
  };

  return (
    <AuthLayout purpose="AUTH" authVariant={"register"}>
      <View style={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="Your name" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="your@email.com" />
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
          title="Register"
          iconName="person-add-outline"
          onPress={handleRegisterSuccess}
        />
        <View style={styles.buttonRow}>
          <Text style={styles.info}>Already have an account?</Text>
          <TextButton
            title="Login here"
            color="accent"
            onPress={() => navigation.navigate("Login", { redirectTo })}
          />
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
