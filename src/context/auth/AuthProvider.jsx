import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "", email: "" });

  const login = () => {
    setUser({ name: "Ang", email: "ang@ang.js" });
  };

  const logout = () => {
    setUser({});
  };

  const authData = {
    user: { name: "", email: "" },
    isGuest: !user,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
