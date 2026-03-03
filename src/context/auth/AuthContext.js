import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  profile: {},
  isAuthenticated: false,
  initializing: true,
  error: null,
  tempAvatar: null,
  async register() {},
  async login() {},
  async logout() {},
  updateProfile() {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuthContext must be used within a AuthProvider");
  }
  return context;
}
