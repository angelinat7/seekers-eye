import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase-config";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Listen for auth state changes (autho-restored by Firebase)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // Register

  const register = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("userCredentials", userCredentials);
      return userCredentials.user;
    } catch (error) {
      console.warn(error.message);
      throw mapFirebaseError(error);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const uid = userCredential.uid;
      // const docSnap = await gerDoc(doc, (db, "users", uid));
      // const profile = docSnap.exists() ? docSnap.data() : {};
      const userData = {
        uid,
        email: userCredential.email,
        username: userCredential.username,
        photoURL: userCredential.photoURL,
      };

      setUser(userData);
      console.log(userData);
      console.log("userCredential: ", userCredential);

      return userCredential.user;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Logout failed", error);
    }
  };

  const authData = {
    user,
    isAuthenticated: !!user,
    initializing,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

function mapFirebaseError(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return new Error("Invalid email address");
    case "auth/user-disabled":
      return new Error("This account has been disabled");
    case "auth/user-not-found":
      return new Error("No account found with this email");
    case "auth/wrong-password":
      return new Error("Incorrect password");
    case "auth/email-already-in-use":
      return new Error("Email already registered");
    case "auth/weak-password":
      return new Error("Password is too weak (min 6 characters)");
    case "auth/too-many-requests":
      return new Error("Too many attempts. Try again later");
    default:
      return new Error(error.message) || "Something went wrong";
  }
}
