import { supabase } from "../../supabase";

export const deleteProject = async (projectID: string) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("project_id", projectID);

  if (error) {
    console.error("Error deleting project: ", error.message);
  }
};
