import OpenAI from "openai";

export const summarize = async (transcript: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    project: process.env.OPENAI_PROJECT_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert meeting assistant skilled at generating comprehensive insights from plain text transcriptions of meeting recordings. I am a web developer at CharacterStrong (CS), part of the Fuji team on the tech side. We work on our curriculum product app and an internal editor tool that helps build curriculum pages. Our team uses a tech stack that includes React, AWS Lambda, S3, DynamoDB, Elasticsearch, and TypeScript. Your task is to provide detailed and structured meeting analyses, ensuring no important details are missed, even when excessive information is present.",
      },
      {
        role: "user",
        content: `---I need a detailed summary of the entire meeting. Include as many details as possible, even if they seem excessive. Break down the meeting with a bulleted outline that captures each section, and identify clear action items that emerged. Additionally, provide your opinion on the tone, mood, and overall feel of the meeting, along with your assessment of the conclusions. Offer suggestions on how the meeting could have been improved for clarity or effectiveness. Prioritize depth and specificity in every aspect.--- ---Transcript: ${transcript}`,
      },
    ],
  });

  console.log(completion.choices[0]);
};
