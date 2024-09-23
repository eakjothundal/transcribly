import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import fs from "fs";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initalize and get storage object
const storage = getStorage(app);

// Create a reference to 'test.m4a'
const testRef = ref(storage, "test.m4a");

// Function to upload local file to Firebase Storage
const uploadLocalFile = async (file: File | Blob) => {
  try {
    // Read the local file into a buffer
    const fileBuffer = fs.readFileSync("../../testData/test.m4a");

    // Upload the buffer to Firebase Storage
    await uploadBytes(testRef, fileBuffer);

    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
