// COMMAND TO RUN
// npx tsx deepgram.tsx audioFile.m4a

// TODO: move to app.ts eventually
import dotenv from "dotenv";
dotenv.config();

import deepgram from "@deepgram/sdk";
import fs from "fs";

// Get the file path
const audioFile = process.argv[2];
console.log(audioFile);

const { createClient } = deepgram;

export const transcribeFile = async () => {
  // STEP 1: Create a Deepgram client using the API key
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  // STEP 2: Call the transcribeFile method with the audio payload and options
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    // path to the audio file
    fs.readFileSync("testData/test.m4a"),
    // STEP 3: Configure Deepgram options for audio analysis
    {
      model: "nova-2",
      smart_format: true,
    }
  );

  if (error) throw error;
  // STEP 4: Print the results
  const transcript = result.results.channels[0].alternatives[0].transcript;
  console.log(transcript); // TODO: Remove log

  if (!error) return transcript;
};

transcribeFile();
