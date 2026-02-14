import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native-web";
import { useTheme } from "../context/theme/ThemeContext";
import RootNavigator from "../navigation/RootNavigator";
import SplashScreen from "../screens/SplashScreen";

export default function AppContent() {
  const { ready } = useTheme();

  if (!ready) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootNavigator />
    </NavigationContainer>
  );
}
