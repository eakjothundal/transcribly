export type MeetingSummaryOptions =
  | "summary"
  | "notes"
  | "action_items"
  | "key_topics"
  | "decisions"
  | "next_steps"
  | "improvements"
  | "vibe";

type ListField = {
  value: string[];
};

export type Meeting = {
  meeting_id: string;
  user_id: string;
  project_id: string;
  template_id: string;
  meeting_name: string;
  meeting_date: string;
  added_context: string;
  transcript: string;
  summary: string;
  notes: ListField;
  action_items: ListField;
  key_topics: ListField;
  decisions: ListField;
  next_steps: ListField;
  improvements: ListField;
  vibe: string;
  created_at: string;
  updated_at: string;
};
