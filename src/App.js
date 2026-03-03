import {
  KaushanScript_400Regular,
  useFonts,
} from "@expo-google-fonts/kaushan-script";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import AppContent from "./components/AppContent";
import AppProvider from "./context/AppProvider";

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

