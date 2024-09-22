import OpenAI from "openai";

export const summarize = async (transcript: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    project: process.env.OPENAI_PROJECT_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an expert meeting assistant specialized in extracting critical insights from detailed meeting transcriptions. Your role is to generate structured, comprehensive summaries, capturing key discussion points, decisions, and action items. You work for EJ, a junior web developer the Fuji team at CharacterStrong, focused on curriculum development using tools like React, AWS, DynamoDB, Elasticsearch, and TypeScript. Ensure the summary is detailed and formatted in Markdown with appropriate headings, bullet points, and lists.",
      },
      {
        role: "user",
        content: `Please generate a thorough summary of the meeting transcript provided. Focus on capturing: 
        1. Key topics and discussions, categorized by sections.
        2. Action items with clear owners and deadlines.
        3. Decisions made during the meeting.
        4. Suggestions for improving meeting clarity or structure.
        5. Tone, mood, and overall effectiveness of the meeting.
        6. An exhaustive walkthrough of the meeting in a "Notes" or "Summary" section at the end, where the most detailed aspects of the discussions should be captured.
        
        Be exhaustive and precise. Format the output in Markdown using headings, bullet points, and subheadings where appropriate. Transcript: ${transcript}`,
      },
    ],
  });

  const summary = completion.choices[0].message.content;

  return summary;
};
