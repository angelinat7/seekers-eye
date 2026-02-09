import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Header from "./Header";

export default function AuthLayout({ children, purpose, authVariant }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header purpose={purpose} authVariant={authVariant} />
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
