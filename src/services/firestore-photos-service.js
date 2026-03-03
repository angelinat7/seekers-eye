import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../config/firebase-config";
import { uploadImageToStorage } from "./firebase-storage-service";

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
 * Fetches photo documents created by specific user.
 *  @param {string} uid - The user's unique ID.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of photo objects.
 */
export const getPhotosByUser = async (uid) => {
  const q = query(photosRef, where("authorId", "==", uid));
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
  // unique storage path for the image
  const storagePath = `photos/${authorId}/${timestamp}.jpg`;

  // upload image to storage
  const { downloadURL } = await uploadImageToStorage(uri, storagePath);
  // current time
  const now = new Date();
  // voting ends in 7 days
  const votingEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  // create firestore doc
  const docRef = await createPhotoDocument({
    downloadURL,
    storagePath,
    authorId,
    authorName,
    title,
    description,
    likes: 0,
    likedBy: [],
    createdAt: serverTimestamp(),
    votingEndsAt,
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
    likedBy: [],
    createdAt: now,
    votingEndsAt,
  };
};

/**
 * Updates a photo document by ID.
 * @param {string} photoId - The ID of the photo document.
 * @param {Object} updates - Fields to update.
 * @returns {Promise<void>} Resolves when the update is complete.
 */
export const updatePhotoDocument = async (photoId, updates) => {
  const photoDocRef = doc(db, "photos", photoId);
  return await updateDoc(photoDocRef, updates);
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

/**
 * Toggles the like status of a photo for a specific user.
 *
 * If the user has already liked the photo, their like is removed
 * and the like count is decremented.
 * If the user has not liked the photo, their ID is added to the
 * likedBy array and the like count is incremented.
 *
 * Uses Firestore atomic operations (arrayUnion, arrayRemove, increment)
 * to safely update the document.
 *
 * @param {string} photoId - The ID of the photo document.
 * @param {string} userId - The UID of the user liking or unliking the photo.
 * @param {string[]} likedBy - Current array of user IDs who liked the photo.
 * @returns {Promise<void>} Resolves when the Firestore update completes.
 */
export const toggleLike = async (photoId, userId) => {
  const photoRef = doc(db, "photos", photoId);

  await runTransaction(db, async (transaction) => {
    const photoSnap = await transaction.get(photoRef);

    if (!photoSnap.exists()) {
      throw new Error("Photo does not exist");
    }

    const data = photoSnap.data();
    const likedBy = data.likedBy || [];

    if (likedBy.includes(userId)) {
      transaction.update(photoRef, {
        likedBy: arrayRemove(userId),
        likes: increment(-1),
      });
    } else {
      transaction.update(photoRef, {
        likedBy: arrayUnion(userId),
        likes: increment(1),
      });
    }
  });
};

/**
 * Deletes a photo document and its associated image from Firebase Storage.
 *
 * @param {string} photoId - Firestore document ID of the photo.
 * @param {string} imageUrl - Full download URL of the photo in Firebase Storage.
 * @returns {Promise<void>}
 */
export const deletePhoto = async (photoId, downloadUrl) => {
  if (!photoId) throw new Error("Photo ID is required.");
  if (!downloadUrl) throw new Error("downloadUrl is required.");

  try {
    // delete from FirebaseStorage
    const fileRef = ref(storage, downloadUrl);
    await deleteObject(fileRef);
    // delete Firestore document

    await deleteDoc(doc(db, "photos", photoId));
  } catch (error) {
    console.error("Error deleting photo", error);
    throw error;
  }
};
