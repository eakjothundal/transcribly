import { supabase } from "../../supabase";

export const getTemplate = async (templateID: string) => {
  const { data: template, error } = await supabase
    .from("templates")
    .select()
    .eq("template_id", templateID);

  if (error) {
    console.error("Error fetching templates: ", error.message);
  }

  return template;
};
