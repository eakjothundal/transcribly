import OpenAI from "openai";
import { eakjot as profile } from "../../profiles"; // TODO: find a better place for profiles

import { fujiPulseTranscript as tempTranscript } from "../../testData";

import deepgram from "@deepgram/sdk";
const { createClient } = deepgram;
import fs from "fs";

export const summarizeAndTranscribe = async (
  localFilePath: string,
  template: string
) => {
  const transcript = await transcribe(localFilePath);
  console.log("Transcript:   ", transcript);

  if (transcript) {
    console.log("-------- Summarizing --------");
    const summary = await summarize(transcript, template);
    console.log("Summary:   ", summary);
    return summary;
  }

  console.error("No transcript");
};

const summarize = async (transcript: string, template: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    project: process.env.OPENAI_PROJECT_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            text: "You are an expert meeting assistant specializing in creating clear, comprehensive, and actionable meeting summaries.",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: `Transcript: ${transcript}`,
            type: "text",
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 16383,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "meeting_summary",
        schema: {
          type: "object",
          required: [
            "summary",
            "notes",
            "action_items",
            "key_topics",
            "decisions",
            "next_steps",
            "improvements",
            "vibe",
          ],
          properties: {
            summary: {
              type: "object",
              required: ["value"],
              properties: {
                value: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "A long, very detailed summary of the meeting. Split paragraphs in different array indexes.",
                },
              },
              additionalProperties: false,
            },
            notes: {
              type: "object",
              required: ["value"],
              properties: {
                value: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "A comprehensive list of notes from the meeting.",
                },
              },
              additionalProperties: false,
            },
            action_items: {
              type: "object",
              required: ["value"],
              properties: {
                value: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "An in-depth, detailed list of action items identified during the meeting.",
                },
              },
              additionalProperties: false,
            },
            key_topics: {
              type: "object",
              required: ["value"],
              properties: {
                value: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "An in-depth, detailed list of key topics discussed in the meeting. Leaves no stone unturned.",
                },
              },
              additionalProperties: false,
            },
            decisions: {
              type: "object",
              required: ["value"],
              properties: {
                value: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "A list of each and every decision/agreement made during the meeting.",
                },
              },
              additionalProperties: false,
            },
            next_steps: {
              type: "object",
              required: ["value"],
              properties: {
                value: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "A list of next steps agreed upon in the meeting.",
                },
              },
              additionalProperties: false,
            },
            improvements: {
              type: "object",
              required: ["value"],
              properties: {
                value: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "A list of suggested improvements following the meeting. These improvements are on how the meeting could've gone better.",
                },
              },
              additionalProperties: false,
            },
            vibe: {
              type: "string",
              description: "The general vibe or atmosphere of the meeting.",
            },
          },
          additionalProperties: false,
        },
        strict: true,
      },
    },
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
