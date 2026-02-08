import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login() {},
  logout() {},
});

export function UseAuthContext() {
  const context = useContext(AuthContext);
  if (!AuthContext) {
    throw new Error("UseAuthContext must be used within a AuthProvider");
  }
  return context;
}
