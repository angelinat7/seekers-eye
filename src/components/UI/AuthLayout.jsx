import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Header from "./Header";

export default function AuthLayout({ children, purpose }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header purpose={purpose} />
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
