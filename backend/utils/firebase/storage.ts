import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import fs from "fs";

import { firebaseAdminServiceAccount } from "./config";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    firebaseAdminServiceAccount as ServiceAccount
  ),
  storageBucket: "audio-transcribe-ee80a.appspot.com",
});

// Initialize Firebase Storage
const bucket = getStorage().bucket();

// Function to upload local file to Firebase Storage
export const uploadOne = async (file: Express.Multer.File) => {
  try {
    const destination = `uploads/${file.filename}`; // Destination path in Firebase Storage

    // Upload the local file from the file system to Firebase Storage
    await bucket.upload(file.path, {
      destination,
      metadata: {
        contentType: file.mimetype, // Set the correct MIME type
      },
    });

    console.log(`File uploaded successfully to Firebase: ${destination}`);
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    // Optionally delete the file from the local server
    fs.unlinkSync(file.path);
  }
};
