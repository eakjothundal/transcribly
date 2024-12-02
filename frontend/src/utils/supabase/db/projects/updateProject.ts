import { Project } from "../../../../interfaces/projects";
import { supabase } from "../../supabase";

export const updateProject = async (
  projectID: string,
  updatedProjectColumns: Partial<Project>
) => {
  const { error } = await supabase
    .from("projects")
    .update({ ...updatedProjectColumns, updated_at: new Date() })
    .eq("project_id", projectID);

  if (error) {
    console.error("Error updating project: ", error.message);
  }
};
