import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Animated,
  Keyboard,
} from "react-native";
import Header from "./Header";
import { use, useEffect, useRef } from "react";

export default function AuthLayout({ children, purpose, authVariant }) {
  const scrollRef = useRef(null);
  const keyboardHeight = use(new Animated.View(0)).current;

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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        ref={scrollRef}
      >
        <Animated.View>
          <Header purpose={purpose} authVariant={authVariant} />
        </Animated.View>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});
