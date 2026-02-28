import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Platform } from "react-native";
import { db } from "../config/firebase-config";
import { storage } from "../config/firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//  === Firebase Storage ===

/**
 * Convert a local URI to a Blob
 * Handles iOS 'file://' and Android content URIs
 */
const uriToBlob = async (uri) => {
  try {
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    const response = await fetch(uploadUri);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("URI to blob error", error);
    throw error;
  }
};

/**
 * Upload an image to Firebase Storage
 * @param {string} uri - local URI of the image
 * @param {string} storagePath - full path in Firebase Storage
 * @returns {Promise<{downloadURL: string, storagePath: string}>}
 */
export const uploadImageToStorage = async (uri, storagePath) => {
  if (!uri) throw new Error("No image URI provided");
  if (!storagePath) throw new Error("No storage path provided");

  try {
    const storageRef = ref(storage, storagePath);

    // convert uri to blob
    const blob = await uriToBlob(uri);

    // upload to Firebase Storage
    await uploadBytes(storageRef, blob);

    // get download URL
    const downloadURL = await getDownloadURL(storageRef);

    return { downloadURL, storagePath: storagePath };
  } catch (error) {
    throw error;
  }
};

//  === FireStore === collection 'photos'

// create a new photo object in FireStore collection photo

/**
 * Adds a new photo document to the Firestore "photos" collection.
 *
 * @param {Object} photo - Photo data including downloadURL, storagePath, authorId, title, description, likes.
 * @returns {Promise<DocumentReference>} Reference to the created Firestore document.
 */
export const createPhotoDocument = async (photo) => {
  return await addDoc(collection(db, "photos"), {
    ...photo,
    createdAt: serverTimestamp(),
  });
};

// subscribeToUserPhotos
export const subscribeToUserPhotos = (uid, callback) => {
  const q = query(
    collection(db, "photos"),
    where("authorId", "==", uid),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const photos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(photos);
  });
};
