import { TemplateSettings } from "../../../interfaces/templates/templates";

export const initialTemplateSettings: TemplateSettings = {
  summary: {
    description: "Include a concise overview of the meeting.",
    enabled: false,
    instructions: "",
  },
  notes: {
    description: "Detailed notes captured during the meeting.",
    enabled: false,
    instructions: "",
  },
  action_items: {
    description: "Tasks assigned to participants.",
    enabled: false,
    instructions: "",
  },
  key_topics: {
    description: "Main topics and points discussed.",
    enabled: false,
    instructions: "",
  },
  decisions: {
    description: "Important decisions made during the meeting.",
    enabled: false,
    instructions: "",
  },
  next_steps: {
    description: "Actions to be taken after the meeting.",
    enabled: false,
    instructions: "",
  },
  improvements: {
    description: "Suggestions for future meetings.",
    enabled: false,
    instructions: "",
  },
  vibe: {
    description: "Overall mood and atmosphere.",
    enabled: false,
    instructions: "",
  },
};
