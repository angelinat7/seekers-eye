import { StyleSheet, Text, TextInput, View } from "react-native";
import AuthLayout from "../components/UI/AuthLayout";
import PrimaryButton from "../components/UI/PrimaryButton";
import TextButton from "../components/UI/TextButton";
import { Colors } from "../constants/Colors";
import { RedirectTargets } from "../constants/navigation";

export default function LoginScreen({ navigation, route }) {
  const redirectTo = route.params?.redirectTo ?? RedirectTargets.HOME;

  const handleLoginSuccess = () => {
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
    <AuthLayout purpose="AUTH" authVariant={"login"}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            // keyboardType="email-address"
            autoCapitalize="none"
          />
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
          onPress={handleLoginSuccess}
        />
        <View style={styles.buttonRow}>
          <Text style={styles.info}>Don't have an account?</Text>
          <TextButton
            title="Register here"
            color="accent"
            onPress={() =>
              navigation.navigate("Register", {
                redirectTo,
              })
            }
          />
        </View>
        <View style={styles.textButtonContainer}>
          <TextButton
            title="Continue as guest"
            color="textSecondary"
            onPress={() => navigation.navigate("Register", { redirectTo })}
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
  formContainer: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.label,
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 8,
    color: Colors.textPrimary,
  },
  info: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    justifyContent: "center",
    marginTop: 16,
  },
  textButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
