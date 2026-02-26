import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = JSON.parse(process.env.EXPO_PUBLIC_FIREBASE_CONFIG);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth =
  Platform.OS === "web"
    ? (() => {
        const webAuth = getAuth(app);
        setPersistence(webAuth, browserLocalPersistence);
        return webAuth;
      })()
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
