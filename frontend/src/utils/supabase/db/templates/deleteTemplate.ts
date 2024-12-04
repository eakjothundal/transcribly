import { supabase } from "../../supabase";

export const deleteTemplate = async (templateID: string) => {
  const { error } = await supabase
    .from("templates")
    .delete()
    .eq("template_id", templateID);

  if (error) {
    console.error("Error deleting template: ", error.message);
  }
};
