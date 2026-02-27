import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

// FireStore collection 'users'

// create a new user in FireStore collection users
export const createUserDocument = async (user) => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    ...user,
    createdAt: serverTimestamp(),
  });
};

// fetches a user document by uid
export const getUserDocument = async (uid) => {
  const userRef = doc(db, "users", firebaseUser.uid);
  const snapshot = await getDoc(userRef);

  return snapshot.exists() ? snapshot.data() : null;
};

// update userData
export const updateUserData = async (uid, updates) => {
  if (!uid) return;
  const userRef = doc(db, "users", uid);
  const snapshot = await updateDoc(userRef, updates);
};
