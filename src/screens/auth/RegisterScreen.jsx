import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthLayout from "../../components/UI/AuthLayout";
import ButtonLink from "../../components/UI/buttons/ButtonLink";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import FormInput from "../../components/UI/FormInput";
import { REGISTER_FIELDS } from "../../constants/input-fields";
import { REDIRECT_ROUTES, RedirectTargets } from "../../constants/navigation";
import { useAuth } from "../../context/auth/AuthContext";
import { useTheme } from "../../context/theme/ThemeContext";
import { useForm } from "../../hooks/useForm";
import { validateInputField } from "../../utils/validate-input-field";

export default function RegisterScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { register, error } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const { values, errors, handleInputChange, validateForm } = useForm({
    initialValues,
    fields: REGISTER_FIELDS,
    validateField: validateInputField,
  });

  const redirectTo = route.params?.redirectTo ?? RedirectTargets.HOME;

  const handleRegister = async () => {
    const formErrors = validateForm(REGISTER_FIELDS);

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

      const user = await register(
        values.email,
        values.password,
        values.username,
      );

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
  const handleNavigateToLogin = () => {
    navigation.navigate("Login", { redirectTo });
  };

  return (
    <AuthLayout variant="AUTH_REGISTER">
      <View style={[styles.formContainer, { paddingHorizontal: 0 }]}>
        <FormInput
          label="Name"
          placeholder="Your name"
          value={values.username}
          onChangeText={(text) => handleInputChange("username", text)}
          theme={theme}
          editable={!loading}
          errorMessage={errors.username}
        />

        <FormInput
          label="Email"
          placeholder="your@email.com"
          value={values.email}
          onChangeText={(text) => handleInputChange("email", text)}
          theme={theme}
          editable={!loading}
          keyboardType="email-address"
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

        <FormInput
          label="Confirm password"
          placeholder="Confirm password"
          value={values.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
          theme={theme}
          editable={!loading}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="off"
          textContentType="password"
          errorMessage={errors.confirmPassword}
        />
        <View style={styles.buttonPrimaryContainer}>
          <ButtonPrimary
            title="Register"
            iconName="person-add-outline"
            onPress={handleRegister}
            disabled={loading}
            loading={loading}
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

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
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
