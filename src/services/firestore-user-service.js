import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

/**
 * Firestore service for 'users' collection
 */

/**
 * Creates a new user document in Firestore 'users' collection.
 * @param {Object} user - User object containing uid, email, username, etc.
 */
export const createUserDocument = async (user) => {
  if (!user?.uid) throw new Error("User UID is required");

  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    ...user,
    createdAt: serverTimestamp(),
  });
};

/**
 * Fetches a user document by UID.
 * @param {string} uid - The UID of the user.
 * @returns {Promise<Object|null>} Returns user data if found, otherwise null.
 */
export const getUserDocument = async (uid) => {
  if (!uid) return null;

  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  return snapshot.exists() ? snapshot.data() : null;
};

/**
 * Updates a user document in Firestore.
 * @param {string} uid - The UID of the user.
 * @param {Object} updates - Object containing fields to update.
 */
export const updateUserData = async (uid, updates) => {
  if (!uid || !updates) return;

  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updates);
};
