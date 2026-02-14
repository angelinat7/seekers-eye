import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/async-storage";
import { VALID_MODES } from "../constants/valid-modes";

import { useEffect, useState } from "react";
export const useThemeStorage = (initialMode = "system") => {
  const [mode, setMode] = useState(initialMode);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (VALID_MODES.includes(savedMode)) {
          setMode(savedMode);
        }
      } catch (error) {
        console.warn("Failed to load theme preference", error.message);
      } finally {
        setReady(true);
      }
    };
    loadTheme();
  }, []);

  const changeMode = async (newMode) => {
    try {
      setMode(newMode);
      await AsyncStorage.setItem(STORAGE_KEY, newMode);
    } catch (error) {
      console.warn("Failed to save theme preference", error.message);
    }
  };

  return { mode, changeMode, ready };
};
