import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Platform } from "react-native";
import { storage } from "../config/firebase-config";

/**
 * Firebase Storage service
 */

/**
 * Converts a local URI to a Blob.
 * Handles iOS 'file://' and Android content URIs.
 * @param {string} uri - The local URI of the file.
 * @returns {Promise<Blob>} Resolves to a Blob representing the file.
 * @throws {Error} Throws if the URI cannot be fetched or converted.
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

    const blob = await uriToBlob(uri);

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    return { downloadURL, storagePath: storagePath };
  } catch (error) {
    throw error;
  }
};
