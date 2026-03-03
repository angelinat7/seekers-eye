import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/theme/ThemeContext";
import ButtonPrimary from "./UI/buttons/ButtonPrimary";

export default function ProtectedScreen({ children }) {
  const { theme } = useTheme();
  const { isAuthenticated, initializing, profile } = useAuth();
  const navigation = useNavigation();

  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{ color: theme.primary }}>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated || !profile) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.textPrimary }]}>
          You need to be logged in to see this screen
        </Text>
        <ButtonPrimary
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
});
