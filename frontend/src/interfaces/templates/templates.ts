import { MeetingSummaryOptions } from "../meetings";

export type Template = {
  template_id: string;
  user_id: string;
  template_name: string;
  template_definition: string;
  template_settings: TemplateSettings;
  created_at: string;
  updated_at: string;
};

export type TemplateSetting = {
  enabled: boolean;
  description: string;
  instructions: string;
};

export type TemplateSettings = Record<MeetingSummaryOptions, TemplateSetting>;
