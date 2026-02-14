import { isLoading } from "expo-font";
import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  register() {},
  login() {},
  logout() {},
  clearError() {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuthContext must be used within a AuthProvider");
  }
  return context;
}
