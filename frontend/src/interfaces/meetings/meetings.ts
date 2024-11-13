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
  meeting_id?: string; // autoset in the database
  user_id?: string; // user_id is set at the addMeeting function
  project_id: string;
  template_id: string;
  meeting_name: string;
  meeting_date: string;
  added_context?: string;
  transcript?: string;
  summary?: string;
  notes?: ListField;
  action_items?: ListField;
  key_topics?: ListField;
  decisions?: ListField;
  next_steps?: ListField;
  improvements?: ListField;
  vibe?: string;
  updated_at?: string; // autoset in the database initially, updated by the user on edit
};
