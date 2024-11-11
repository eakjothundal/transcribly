import { supabase } from "../../supabase";

export const getAllTemplates = async () => {
  const { data: templates, error } = await supabase.from("templates").select();

  if (error) {
    console.error("Error fetching templates: ", error.message);
  }

  return templates;
};
