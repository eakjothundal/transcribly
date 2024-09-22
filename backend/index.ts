import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { summarizeAndTranscribe } from "./utils/summarize";

dotenv.config();
const app = express();

// Allow CORS from frontend
app.use(
  cors({
    origin: process.env.FRONTEND,
  })
);

app.use("/api", async (req, res) => {
  // Transcribe
  const summary = await summarizeAndTranscribe();

  res.json({ message: summary });
});

app.listen(3055, () => {
  console.log("Backend running on http://localhost:3055");
});
