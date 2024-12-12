import OpenAI from "openai";

import { getTemplate } from "../supabase/db/templates";
import { getProject } from "../supabase/db/projects";

import {
  Template,
  TemplateSettings,
} from "../../interfaces/templates/templates.ts";
import { Project } from "../../interfaces/projects/projects.ts";

export const summarizeAndTranscribe = async (
  audioFile: File,
  templateID: string,
  projectID: string,
  addedContext: string
) => {
  const template = await getTemplate(templateID);
  const project = await getProject(projectID);

  if (!template || template.length < 1) {
    console.error("Template is null or empty");
    return;
  }

  if (!project || project.length < 1) {
    console.error("Project is null or empty");
    return;
  }

  // STEP 4: Print the results
  console.log("Starting transcription...");
  const transcript = await transcribe(audioFile);

  if (transcript) {
    console.log("Starting summarization...");
    const summary = await summarizeTranscript(
      transcript,
      template,
      project,
      addedContext
    );
    return { transcript, summary };
  } else {
    console.error("No transcript");
  }
};

type JSONSchemaProperty = {
  type: string;
  required?: string[];
  properties?: { [key: string]: JSONSchemaProperty };
  items?: JSONSchemaProperty;
  description?: string;
  additionalProperties?: boolean;
};

const summarizeTranscript = async (
  transcript: string,
  template: Template,
  project: Project,
  addedContext: string
) => {
  // Extract template information
  const templateName = template.template_name;
  const templateDefinition = template.template_definition;
  const templateSettings: TemplateSettings = template.template_settings;

  // Extract project information
  const projectName = project.project_name;
  const projectDescription = project.project_description;

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    project: import.meta.env.VITE_OPENAI_PROJECT_KEY,
    dangerouslyAllowBrowser: true,
  });

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are an expert meeting assistant specializing in creating clear, comprehensive, and actionable meeting summaries. You are provided template information, project information, additional meeting-specific context, and finally the meeting transcript. Your goal is to use the template and project information the same as extra context. Do not repeat the template or project information, or the added context because the user is already aware of it. Your task is to create a detailed meeting summary based on the transcript provided.",
    },
    {
      role: "user",
      content: `Template Name: ${templateName}-----Template Definition: ${templateDefinition}-----Project Name: ${projectName}-----Project Description: ${projectDescription}-----Additional Context: ${addedContext}-----Transcript: ${transcript}`,
    },
  ];

  const responseFormat: OpenAI.ResponseFormatJSONSchema = {
    type: "json_schema",
    json_schema: {
      name: "meeting_summary",
      schema: {
        type: "object",
        required: [],
        properties: {},
        additionalProperties: false,
      },
      strict: true,
    },
  };

  if (!responseFormat.json_schema || !responseFormat.json_schema.schema) {
    throw new Error("Invalid response format schema");
  }
  const properties: { [key: string]: JSONSchemaProperty } =
    responseFormat.json_schema.schema.properties || Object.create(null);
  const required: string[] = Array.isArray(
    responseFormat.json_schema.schema.required
  )
    ? responseFormat.json_schema.schema.required
    : [];

  if (templateSettings.summary?.enabled) {
    properties.summary = {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "array",
          items: {
            type: "string",
          },
          description: `A long, very detailed summary of the meeting. Split paragraphs in different array indexes. ${templateSettings.summary?.instructions}`,
        },
      },
      additionalProperties: false,
    };
    required.push("summary");
  }

  if (templateSettings.notes?.enabled) {
    properties.notes = {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "array",
          items: {
            type: "string",
          },
          description: `A comprehensive list of notes from the meeting. ${templateSettings.notes?.instructions}`,
        },
      },
      additionalProperties: false,
    };
    required.push("notes");
  }

  if (templateSettings.action_items?.enabled) {
    properties.action_items = {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "array",
          items: {
            type: "string",
          },
          description: `An in-depth, detailed list of action items identified during the meeting. ${templateSettings.action_items?.instructions}`,
        },
      },
      additionalProperties: false,
    };
    required.push("action_items");
  }

  if (templateSettings.key_topics?.enabled) {
    properties.key_topics = {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "array",
          items: {
            type: "string",
          },
          description: `An in-depth, detailed list of key topics discussed in the meeting. Leaves no stone unturned. ${templateSettings.key_topics?.instructions}`,
        },
      },
      additionalProperties: false,
    };
    required.push("key_topics");
  }

  if (templateSettings.decisions?.enabled) {
    properties.decisions = {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "array",
          items: {
            type: "string",
          },
          description: `A list of each and every decision/agreement made during the meeting. ${templateSettings.decisions?.instructions}`,
        },
      },
      additionalProperties: false,
    };
    required.push("decisions");
  }

  if (templateSettings.next_steps?.enabled) {
    properties.next_steps = {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "array",
          items: {
            type: "string",
          },
          description: `A list of next steps agreed upon in the meeting. ${templateSettings.next_steps?.instructions}`,
        },
      },
      additionalProperties: false,
    };
    required.push("next_steps");
  }

  if (templateSettings.improvements?.enabled) {
    properties.improvements = {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "array",
          items: {
            type: "string",
          },
          description: `A list of suggested improvements following the meeting. These improvements are on how the meeting could've gone better. ${templateSettings.improvements?.instructions}`,
        },
      },
      additionalProperties: false,
    };
    required.push("improvements");
  }

  if (templateSettings.vibe?.enabled) {
    properties.vibe = {
      type: "string",
      description: `The general vibe or atmosphere of the meeting. ${templateSettings.vibe?.instructions}`,
    };
    required.push("vibe");
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    temperature: 0.85,
    max_tokens: 16383,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: responseFormat,
  });

  const summary = completion.choices[0].message.content;

  return summary;
};

const transcribe = async (audioFile: File) => {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
  const audioBuffer = await audioFile.arrayBuffer();

  const response = await fetch("https://api.deepgram.com/v1/listen", {
    method: "POST",
    headers: {
      "Content-Type": "audio/*", // Adjust the MIME type as necessary
      Authorization: `Token ${apiKey}`,
    },
    body: audioBuffer,
  });

  if (!response.ok) {
    console.error("Transcription error:", response.statusText);
    return null;
  }

  const result = await response.json();

  if (result && result.results && result.results.channels.length > 0) {
    const transcript = result.results.channels[0].alternatives[0].transcript;
    return transcript;
  }

  console.error("Failed to transcribe audio");
  return null;
};
