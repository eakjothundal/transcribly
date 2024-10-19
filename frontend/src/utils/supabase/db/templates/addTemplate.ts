import { TemplateSettings } from "../../../../interfaces/templates/templates";
import { supabase, userId } from "../../supabase";

export const addTemplate = async (
  name: string,
  definition: string,
  settings: TemplateSettings
) => {
  const { error } = await supabase.from("templates").insert({
    user_id: userId,
    template_name: name,
    template_definition: definition,
    template_settings: settings,
  });

  if (error) {
    console.error("Error inserting new template: ", error.message);
  }
};
