import {
  useFonts,
  KaushanScript_400Regular,
} from "@expo-google-fonts/kaushan-script";
import { useEffect } from "react";
import AppProvider from "./context/AppProvider";
import * as ExpoSplashScreen from "expo-splash-screen";
import AppContent from "./components/AppContent";

export default function App() {
  const [loaded, error] = useFonts({
    KaushanScript: KaushanScript_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      ExpoSplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

