import { createContext, useContext } from "react";
import { themes } from "../../constants/themes";

export const ThemeContext = createContext({
  theme: themes.light,
  modeState: "system",
  changeMode: () => {},
  ready: false,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
