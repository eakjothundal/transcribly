import { supabase } from "../supabase.ts";

export const getTemplate = async (templateID: string) => {
  const { data: templates, error } = await supabase
    .from("templates")
    .select()
    .eq("template_id", templateID);

  if (error) {
    console.error("Error fetching templates: ", error.message);
  }

  return templates;
};
