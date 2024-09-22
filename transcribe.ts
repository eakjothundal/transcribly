import deepgram from "@deepgram/sdk";
import fs from "fs";

const { createClient } = deepgram;

export const transcribe = async () => {
  // STEP 1: Create a Deepgram client using the API key
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  // STEP 2: Call the transcribeFile method with the audio payload and options
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    // path to the audio file
    fs.readFileSync("testData/settingEvent_46min.m4a"),
    // STEP 3: Configure Deepgram options for audio analysis
    {
      model: "nova-2",
      smart_format: true,
    }
  );

  if (error) throw error;
  // STEP 4: Print the results
  const transcript = result.results.channels[0].alternatives[0].transcript;

  if (!error) return transcript;
};
