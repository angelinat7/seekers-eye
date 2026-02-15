import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AuthLayout from "../components/UI/AuthLayout";
import ButtonLink from "../components/UI/buttons/ButtonLink";
import ButtonPrimary from "../components/UI/buttons/ButtonPrimary";
import FormInput from "../components/UI/FormInput";
import { REDIRECT_ROUTES, RedirectTargets } from "../constants/navigation";
import { useAuth } from "../context/auth/AuthContext";
import { useTheme } from "../context/theme/ThemeContext";

export default function RegisterScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { register, login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = route.params?.redirectTo ?? RedirectTargets.HOME;

  const handleRegisterSuccess = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // if (password.length < 6) {
    //   Alert.alert("Error", "Password must be at least 6 characters");
    //   return;
    // }

    setLoading(true);

    const registerRes = await register({ username, email, password });
    if (!registerRes.success) {
      Alert.alert("Registration Failed", registerRes.message);
      setLoading(false);
      return;
    }

    const loginRes = await login(email, password);
    setLoading(false);

    if (!loginRes.success) {
      Alert.alert("Login Failed", loginRes.message);
      return;
    }

    Alert.alert("Success", "Account created successfully!");
    const targetRoute =
      REDIRECT_ROUTES[redirectTo] || REDIRECT_ROUTES[RedirectTargets.HOME];
    navigation.replace("TabNavigator", targetRoute);
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login", { redirectTo });
  };

  return (
    <AuthLayout variant="AUTH_REGISTER">
      <View style={[styles.formContainer, { paddingHorizontal: 0 }]}>
        <FormInput
          label="Name"
          placeholder="Your name"
          value={username}
          onChangeText={setUsername}
          theme={theme}
          editable={!loading}
        />

        <FormInput
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          theme={theme}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          theme={theme}
          editable={!loading}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="off"
          textContentType="password"
        />
        <View style={styles.buttonPrimaryContainer}>
          <ButtonPrimary
            title="Register"
            iconName="person-add-outline"
            onPress={handleRegisterSuccess}
            disabled={loading}
          />
        </View>

        <View style={styles.buttonRow}>
          <Text style={[styles.info, { color: theme.textSecondary }]}>
            Already have an account?
          </Text>
          <ButtonLink
            title="Login here"
            colorKey="accent"
            onPress={handleNavigateToLogin}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

export const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 8,
  },
  info: {
    fontSize: 14,
  },
  buttonPrimaryContainer: {
    paddingTop: 14,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
  },
});
