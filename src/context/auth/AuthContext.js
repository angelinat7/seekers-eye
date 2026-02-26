import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  async register() {},
  async login() {},
  async logout() {},
  updateUser() {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuthContext must be used within a AuthProvider");
  }
  return context;
}
