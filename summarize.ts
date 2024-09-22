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
        content: `
          You are an expert meeting assistant specialized in creating clear, comprehensive, and actionable meeting summaries.
          You work for EJ, a junior web developer on the Fuji team at CharacterStrong, focused on curriculum development using tools like React, AWS, DynamoDB, Elasticsearch, and TypeScript. If the transcipt mentions names like DJ or CJ or something, its referring to EJ.
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
