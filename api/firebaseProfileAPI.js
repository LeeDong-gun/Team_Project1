import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";

// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyBZp_G-cFEfe2B_XErz8ia5lsrdcem7EtU",
  authDomain: "teamprofile-d0f82.firebaseapp.com",
  projectId: "teamprofile-d0f82",
  storageBucket: "teamprofile-d0f82.appspot.com",
  messagingSenderId: "112520574366",
  appId: "1:112520574366:web:6b265d5d3d07c49b9d928f",
  measurementId: "G-0XFM7RGBKG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/**
 * Saves profile information to Firestore.
 * @param {Object} param0 - Profile data (destructured)
 *  - name: User's name (string)
 *  - image: Profile image URL (string)
 *  - role: User's role (string)
 *  - blogAddress: Blog or GitHub URL (string)
 *  - introduction: User introduction (string)
 *  - ipAddress: IP address (string)
 */
export async function saveProfileInfo({
  name,
  image,
  role,
  blogAddress,
  introduction,
  ipAddress,
}) {
  // Check for missing required fields
  if (!name || !image || !role || !blogAddress || !introduction || !ipAddress) {
    console.warn(
      "All required fields must be provided: name, image, role, blogAddress, introduction, ipAddress."
    );
    return; // Stop if any required field is missing
  }

  try {
    const docRef = await addDoc(collection(db, "profileInfo"), {
      name,
      image,
      role,
      blogAddress,
      introduction,
      ipAddress,
    });
    console.log("Document successfully saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving document:", error);
  }
}

/**
 * Retrieves all profile information from Firestore.
 * @returns {Array} - Array of all profile documents
 */
export async function getAllProfiles() {
  const profiles = [];
  try {
    const querySnapshot = await getDocs(collection(db, "profileInfo"));
    querySnapshot.forEach((doc) => {
      profiles.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error retrieving documents:", error);
  }
  return profiles;
}

/**
 * Retrieves a single profile by document ID.
 * @param {string} docId - The document ID of the profile
 * @returns {Object|null} - Profile data or null if not found
 */
export async function getProfileById(docId) {
  try {
    const docRef = doc(db, "profileInfo", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No document found with the provided ID.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving document:", error);
  }
}
