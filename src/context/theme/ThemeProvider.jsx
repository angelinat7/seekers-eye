import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { STORAGE_KEY } from "../../constants/async-storage";
import { Themes } from "../../constants/Colors";
import { ThemeContext } from "./ThemeContext";
import { useThemeStorage } from "../../hooks/useThemeStorage";

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const { mode, changeMode, ready } = useThemeStorage();

  const resolvedMode = mode === "system" ? systemScheme : mode;

  const theme = useMemo(() => {
    return Themes[resolvedMode] ?? Themes.light;
  }, [resolvedMode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, changeMode, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}
