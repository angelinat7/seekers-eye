import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  View,
  Animated,
  Keyboard,
} from "react-native";
import { useTheme } from "../../context/theme/ThemeContext";
import Header from "./Header";
import { useEffect, useRef } from "react";

export default function AuthLayout({ children, variant = "AUTH_LOGIN" }) {
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        scrollRef.current?.scrollTo({ y: 100, animated: true });
      });
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <Animated.View>
          <Header variant={variant} />
        </Animated.View>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 16,
  },
});
