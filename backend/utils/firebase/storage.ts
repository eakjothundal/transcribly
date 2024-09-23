import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import fs from "fs";

import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initalize and get storage object
const storage = getStorage(app);

// Create a reference to 'test.m4a'
const testRef = ref(storage, "test.m4a");

// Function to upload local file to Firebase Storage
export const upload = async (file: File | Blob) => {
  try {
    // Upload the buffer to Firebase Storage
    await uploadBytes(testRef, file);

    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
