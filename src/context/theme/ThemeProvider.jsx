import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { themes } from "../../constants/themes";
import { useThemeStorage } from "../../hooks/useThemeStorage";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const { mode, changeMode, ready } = useThemeStorage();

  const resolvedMode = mode === "system" ? systemScheme : mode;

  const theme = useMemo(() => {
    return themes[resolvedMode] ?? themes.light;
  }, [resolvedMode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, changeMode, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}
