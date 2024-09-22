// COMMAND TO RUN
// npx tsx app.ts

import { transcribe } from "./transcribe";
import { summarize } from "./summarize";
import dotenv from "dotenv";

dotenv.config();

const app = async () => {
  // Transcription
  console.log("-------- Transcribing --------");
  const transcript = await transcribe();

  // Summarization
  console.log("-------- Summarizing --------");
  if (transcript) {
    const summary = await summarize(transcript);
    console.log(summary);
  }
};

app();
