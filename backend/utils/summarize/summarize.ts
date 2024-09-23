import OpenAI from "openai";
import { eakjot as profile } from "../../profiles"; // TODO: find a better place for profiles

import { fujiPulseTranscript as tempTranscript } from "../../testData";

import deepgram from "@deepgram/sdk";
const { createClient } = deepgram;
import fs from "fs";

export const summarizeAndTranscribe = async (localFilePath: string) => {
  // const transcript = await transcribe(localFilePath);
  // console.log("Transcript:   ", transcript); // TODO: uncomment after testing

  if (tempTranscript) {
    console.log("-------- Summarizing --------");
    const summary = await summarize(tempTranscript);
    console.log("Summary:   ", summary);
    return summary;
  }

  console.error("No transcript");
};

const summarize = async (transcript: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    project: process.env.OPENAI_PROJECT_KEY,
  });

  const completion = await openai.chat.completions.create({
    /**
     * gpt-4o is significantly better than gpt-4o-mini
     * gpt-4o-mini might be good for just testing to reduce costs
     *
     * I will want to try out Claude 3.5 Sonnet at some point once there
     * is persistant data storage and there is a good amount of data to test against.
     *
     * gpt-o1 is not currently available via API for my tier (Tier 1).
     * It's only available on Tier 5 at the moment with very low limits and very expensive.
     */
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        // TODO: move out content to make summarize function reusable
        content: `
          You are an expert meeting assistant specialized in creating clear, comprehensive, and actionable meeting summaries.
          
          Your boss: ${profile}

          Your task is to extract detailed insights from meeting transcriptions, making sure to prioritize readability and key actionable items.
          The summary must be structured, visually clear, and use Markdown-friendly formatting including colors, whitespace, headings, and lists for easy digestion.

          The structure should be as follows:

          1. **Meeting Overview**: A brief 2-3 sentence overview summarizing the meeting purpose.
          2. **Key Topics and Discussions**:
              - Use headings for each major discussion topic.
              - Break down subtopics clearly with bullet points or short paragraphs.
          3. **Decisions Made**: List key decisions, along with rationale.
          4. **Action Items**:
              - Clearly assign owners, deadlines, and note any risks or dependencies for each task.
              - Use callouts or highlights for urgent tasks (e.g., bold, color-coded).
          5. **Sentiment & Tone Analysis**: Analyze the mood and tone of the meeting, noting any signs of tension, collaboration, or areas for improvement.
          6. **Suggestions for Improvement**: Provide concrete suggestions to improve meeting structure, engagement, or decision-making.
          7. **Detailed Notes**: Provide a deep, paragraph-level summary that covers all detailed discussions for record-keeping purposes.

          Ensure the formatting uses whitespace effectively to separate sections, and use Markdown for:
          - **Headings** for structure.
          - **Bullet points** for clarity.
          - **Bold** or **italicized** text to highlight key items.

          Transcript: ${transcript}
        `,
      },
      {
        role: "user",
        // TODO: move out content to make summarize function reusable
        content: `
          Please summarize the meeting based on the provided transcript using the structured format outlined. 
          Ensure all key points, decisions, action items, and suggestions are captured clearly and exhaustively.
        `,
      },
    ],
  });

  const summary = completion.choices[0].message.content;

  return summary;
};

const transcribe = async (localFilePath: string) => {
  // STEP 1: Create a Deepgram client using the API key
  console.log(process.env.DEEPGRAM_API_KEY);
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  // STEP 2: Call the transcribeFile method with the audio payload and options
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    // path to the audio file
    fs.readFileSync(localFilePath),
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
