import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../../config/firebase-config";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../services/firebase-auth-service";
import {
  createUserDocument,
  updateUserData,
} from "../../services/firestore-user-service";
import { AuthContext } from "./AuthContext";
import { syncUserPhotos } from "../../services/firestore-photos-service";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [tempAvatar, setTempAvatar] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Listen for auth state changes (auto-restored by Firebase)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile({});
        setIsAuthenticated(false);
        setInitializing(false);
        return;
      }

      try {
        setUser(firebaseUser.uid);

        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(firebaseUser.uid);
          setProfile(userSnap.data());
          setIsAuthenticated(true);
        } else {
          setProfile({});
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.warn(err.message);
      } finally {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Register
  const register = async (email, password, username) => {
    try {
      const { user } = await registerUser(email, password);

      const userData = {
        uid: user.uid,
        email: user.email,
        username: username,
        photoUrl: null,
        likes: [],
      };

      await createUserDocument(userData);
      return user;
    } catch (error) {
      console.warn(error.message);
      throw mapFirebaseError(error);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      return await loginUser(email, password);
    } catch (error) {
      throw mapFirebaseError(error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn("Logout failed", error);
    }
  };

  const updateProfile = async (uid, updates) => {
    try {
      // Update user document in Firestore
      await updateUserData(uid, updates);
      // Sync user profile changes (username, avatar) to all user photos
      await syncUserPhotos(uid, updates);
      // Update local auth state
      setProfile((prev) => ({
        ...prev,
        ...updates,
      }));
    } catch (err) {
      console.warn(err);
    }
  };

  const authData = useMemo(
    () => ({
      user,
      profile,
      isAuthenticated,
      initializing,
      tempAvatar,
      setTempAvatar,
      login,
      register,
      logout,
      updateProfile,
    }),
    [
      user,
      profile,
      isAuthenticated,
      initializing,
      login,
      register,
      logout,
      updateProfile,
    ],
  );

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
