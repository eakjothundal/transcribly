import { MeetingSummaryOptions } from "../meetings";

export type TemplateSetting = {
  description: string;
  enabled: boolean;
  instructions: string;
};

export type TemplateSettings = Record<MeetingSummaryOptions, TemplateSetting>;
