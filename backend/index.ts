import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import { uploadOne } from "./utils/firebase/storage";

dotenv.config();
const app = express();

// Set up Multer for file handling
const upload = multer({ dest: "uploads/" }); // 'uploads/' is the folder where files will be temporarily stored

// Allow CORS from frontend
app.use(
  cors({
    origin: process.env.FRONTEND,
  })
);

app.post("/api/uploadOne", upload.single("file"), async (req, res) => {
  const file = req.file as Express.Multer.File;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Upload file
  uploadOne(file);

  console.log("File received:", file);
  res.json({ message: "File received", file });
});

// Route for /api (general route should come after)
app.use("/api", async (req, res) => {
  console.log("/api");
});

app.listen(3055, () => {
  console.log("Backend running on http://localhost:3055");
});
