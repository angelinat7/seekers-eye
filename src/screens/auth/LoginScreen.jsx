import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthLayout from "../../components/UI/AuthLayout";
import ButtonLink from "../../components/UI/buttons/ButtonLink";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import FormInput from "../../components/UI/FormInput";
import { LOGIN_FIELDS } from "../../constants/input-fields";
import { REDIRECT_ROUTES, RedirectTargets } from "../../constants/navigation";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { useForm } from "../../hooks/useForm";
import { validateInputField } from "../../utils/validate-input-field";

export default function LoginScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { login, error } = useAuth();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, handleInputChange, validateForm } = useForm({
    initialValues,
    fields: LOGIN_FIELDS,
    validateField: validateInputField,
  });

  const redirectTo = route.params?.redirectTo ?? RedirectTargets.HOME;

  const handleLogin = async () => {
    const formErrors = validateForm(LOGIN_FIELDS);

    if (Object.keys(formErrors).length > 0) {
      Toast.show({
        type: "error",
        text1: "Form Error",
        text2: "Please review the highlighted fields and try again",
        position: "bottom",
        bottomOffset: 200,
      });
      return;
    }

    try {
      setLoading(true);
      const user = await login(values.email, values.password);

      const targetRoute =
        REDIRECT_ROUTES[redirectTo] || REDIRECT_ROUTES[RedirectTargets.HOME];
      navigation.replace("TabNavigator", targetRoute);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: `${error?.message}` ?? "Something went wrong",
        position: "bottom",
        bottomOffset: 200,
      });
    } finally {
      setLoading(false);
    }
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
          value={values.email}
          onChangeText={(text) => handleInputChange("email", text)}
          theme={theme}
          editable={!loading}
          autoCapitalize="none"
          errorMessage={errors.email}
        />

        <FormInput
          label="Password"
          placeholder="Your password"
          value={values.password}
          onChangeText={(text) => handleInputChange("password", text)}
          theme={theme}
          editable={!loading}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="off"
          textContentType="password"
          errorMessage={errors.password}
        />
        <View style={styles.buttonPrimaryContainer}>
          <ButtonPrimary
            title="Login"
            iconName="log-in-outline"
            onPress={handleLogin}
            disabled={loading}
            loading={loading}
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
