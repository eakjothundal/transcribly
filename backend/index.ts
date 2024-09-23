import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import { upload } from "./utils/firebase/storage";
import { summarizeAndTranscribe } from "./utils/summarize";

dotenv.config();
const app = express();

// Set up Multer for file handling
const multerUpload = multer({ dest: "uploads/" }); // 'uploads/' is the folder where files will be temporarily stored

// Allow CORS from frontend
app.use(
  cors({
    origin: process.env.FRONTEND,
  })
);

app.post("/api/summarize", multerUpload.single("file"), async (req, res) => {
  const file = req.file as Express.Multer.File;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Transcribe
  const summary = await summarizeAndTranscribe(file.path);

  res.json({ message: "File received", summary });
});

// Route for /api (general route should come after)
app.use("/api", async (req, res) => {
  console.log("/api");
});

app.listen(3055, () => {
  console.log("Backend running on http://localhost:3055");
});
