import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../context/theme/ThemeContext";
import { useAuth } from "../../context/auth/AuthContext";
import AuthLayout from "../../components/UI/AuthLayout";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import ButtonLink from "../../components/UI/buttons/ButtonLink";
import { REDIRECT_ROUTES, RedirectTargets } from "../../constants/navigation";
import { useState } from "react";
import FormInput from "../../components/UI/FormInput";

export default function LoginScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = route.params?.redirectTo ?? RedirectTargets.HOME;

  const handleLoginSuccess = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (!res.success) {
      Alert.alert("Login Failed", res.message);
      return;
    }

    const targetRoute =
      REDIRECT_ROUTES[redirectTo] || REDIRECT_ROUTES[RedirectTargets.HOME];
    navigation.replace("TabNavigator", targetRoute);
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register", { redirectTo });
  };

  const handleContinueAsGuest = () => {
    navigation.replace("TabNavigator", { screen: "Home" });
  };

  return (
    <AuthLayout variant="AUTH_LOGIN">
      <View style={[styles.formContainer, { paddingHorizontal: 0 }]}>
        <FormInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          theme={theme}
          editable={!loading}
          autoCapitalize="none"
        />

        <FormInput
          label="Password"
          placeholder="Your password"
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
            title="Login"
            iconName="log-in-outline"
            onPress={handleLoginSuccess}
            disabled={loading}
          />
        </View>

        <View style={styles.buttonRow}>
          <Text style={[styles.info, { color: theme.textSecondary }]}>
            Don't have an account?
          </Text>
          <ButtonLink
            title="Register here"
            colorKey="accent"
            onPress={handleNavigateToRegister}
          />
        </View>

        <View style={styles.buttonLinkContainer}>
          <ButtonLink
            title="Continue as guest"
            colorKey="textSecondary"
            onPress={handleContinueAsGuest}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 8,
  },
  info: {
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    justifyContent: "center",
    marginTop: 14,
  },
  buttonPrimaryContainer: {
    paddingTop: 14,
  },
  buttonLinkContainer: {
    alignItems: "center",
  },
});
