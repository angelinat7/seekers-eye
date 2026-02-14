import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { AuthContext } from "./AuthContext";

const AUTH_STORAGE_KEY = "@auth_user";
const USERS_STORAGE_KEY = "@fake_users";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fakeUsers, setFakeUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load persisted user on app start
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        const savedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        if (savedUsers) {
          setFakeUsers(JSON.parse(savedUsers));
        }
      } catch (e) {
        console.warn("Failed to load auth data", e.message);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const register = async (userInput) => {
    try {
      setError(null);

      // Validation
      if (!userInput.email || !userInput.password || !userInput.username) {
        setError("All fields are required");
        return { success: false, message: "All fields are required" };
      }

      // Check if user already exists
      const userExists = fakeUsers.some((u) => u.email === userInput.email);
      if (userExists) {
        setError("Email already registered");
        return { success: false, message: "Email already registered" };
      }

      const userData = {
        id: uuid.v4(),
        username: userInput.username,
        email: userInput.email,
        password: userInput.password, // Temp - will be removed with real backend
        token: uuid.v4(),
      };

      const updatedUsers = [...fakeUsers, userData];

      // Persist to storage
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      await AsyncStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(updatedUsers),
      );

      setUser(userData);
      setFakeUsers(updatedUsers);

      return { success: true, user: userData };
    } catch (e) {
      const errorMessage = e.message || "Registration failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);

      if (!email || !password) {
        setError("Email and password are required");
        return { success: false, message: "Email and password are required" };
      }

      const existingUser = fakeUsers.find(
        (user) => user.email === email && user.password === password,
      );

      if (!existingUser) {
        setError("Invalid email or password");
        return { success: false, message: "Invalid email or password" };
      }

      const loggedInUser = {
        ...existingUser,
        token: uuid.v4(),
      };

      // Persist to storage
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(loggedInUser),
      );

      setUser(loggedInUser);

      return { success: true, user: loggedInUser };
    } catch (e) {
      const errorMessage = e.message || "Login failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
      setError(null);
    } catch (e) {
      console.warn("Failed to logout", e.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const authData = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const [fakeUsers, setFakeUsers] = useState([]);

//   const register = (userInput) => {
//     const userData = {
//       id: uuid.v4(),
//       username: userInput.username,
//       email: userInput.email,
//       password: userInput.password,
//       token: uuid.v4(),
//     };
//     setUser(userData);
//     setFakeUsers((prevFakeUsers) => [...prevFakeUsers, userData]);

//     return { success: true };
//   };

//   const login = (email, password) => {
//     const existingUser = fakeUsers.find(
//       (user) => user.email === email && user.password === password,
//     );

//     if (!existingUser) {
//       return { success: false, message: "Invalid email or password" };
//     }

//     const loggedInUser = {
//       ...existingUser,
//       token: uuid.v4(),
//     };
//     setUser(loggedInUser);
//     console.log(loggedInUser);

//     return { success: true };
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const authData = {
//     user,
//     isAuthenticated: !!user,
//     login,
//     register,
//     logout,
//   };
//   return (
//     <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
//   );
// }
