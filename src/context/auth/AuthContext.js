import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login() {},
  logout() {},
});

export function UseAuth() {
  const context = useContext(AuthContext);
  if (!AuthContext) {
    throw new Error("UseAuthContext must be used within a AuthProvider");
  }
  return context;
}
