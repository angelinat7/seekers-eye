import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { uploadImageToStorage } from "./firebase-storage-service";
import { db } from "../config/firebase-config";

/**
 * Firestore service for 'photos' collection
 */

const photosRef = collection(db, "photos");
/**
 * Creates a new photo document.
 * @param {Object} photo - The photo data.
 * @returns {Promise<Object>} The created document reference.
 */
export const createPhotoDocument = async (photo) => {
  return await addDoc(photosRef, {
    ...photo,
    createdAt: serverTimestamp(),
  });
};

/**
 * Fetches all photo documents, ordered by newest first.
 * @returns {Promise<Array<Object>>} Array of photo objects with `id` and data.
 */
export const getAllPhotos = async () => {
  const q = query(photosRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Uploads a contest photo and creates a Firestore document.
 * @param {Object} params - Photo details.
 * @param {string} params.uri - Local URI of the image.
 * @param {string} params.authorId - UID of the author.
 * @param {string} params.authorName - Name of the author.
 * @param {string} params.title - Photo title.
 * @param {string} params.description - Photo description.
 * @returns {Promise<Object>} Returns the uploaded photo info including `photoId`, `downloadURL`, and metadata.
 * @throws {Error} Throws if `uri` is not provided.
 */
export const uploadContestPhoto = async ({
  uri,
  authorId,
  authorName,
  title,
  description,
}) => {
  if (!uri) throw new Error("No image URI provided");

  const timestamp = Date.now();
  const storagePath = `photos/${authorId}/${timestamp}.jpg`;

  const { downloadURL } = await uploadImageToStorage(uri, storagePath);

  const docRef = await createPhotoDocument({
    downloadURL,
    storagePath,
    authorId,
    authorName,
    title,
    description,
    likes: 0,
  });
  return {
    photoId: docRef.id,
    downloadURL,
    storagePath,
    authorId,
    authorName,
    title,
    description,
    likes: 0,
  };
};

/**
 * Updates a photo document by ID.
 * @param {string} docId - The ID of the photo document.
 * @param {Object} data - Fields to update.
 * @returns {Promise<void>} Resolves when the update is complete.
 */
export const updatePhotoDocument = async (docId, data) => {
  const docRef = doc(db, "photos", docId);
  return await updateDoc(docRef, data);
};

/**
 * Syncs updated user data (username, avatar) to all their photos.
 * @param {string} uid - The UID of the user.
 * @param {Object} updates - Fields to update.
 * @param {string} [updates.username] - New username.
 * @param {string} [updates.photoUrl] - New avatar URL.
 * @returns {Promise<void>} Resolves when all updates are committed.
 */
export const syncUserPhotos = async (uid, updates) => {
  if (!uid) return;

  const q = query(photosRef, where("authorId", "==", uid));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return;

  const batch = writeBatch(db);

  snapshot.forEach((docSnap) => {
    batch.update(docSnap.ref, {
      ...(updates.username && { authorName: updates.username }),
      ...(updates.photoUrl && { authorAvatar: updates.photoUrl }),
    });
  });

  await batch.commit();
};
