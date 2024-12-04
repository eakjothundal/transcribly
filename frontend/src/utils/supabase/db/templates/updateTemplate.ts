import { Template } from "../../../../interfaces/templates";
import { supabase } from "../../supabase";

export const updateTemplate = async (
  templateID: string,
  updatedTemplateColumns: Partial<Template>
) => {
  const { error } = await supabase
    .from("templates")
    .update({ ...updatedTemplateColumns, updated_at: new Date() })
    .eq("template_id", templateID);

  if (error) {
    console.error("Error updating template: ", error.message);
  }
};
