import { supabase } from "../../supabase";

export const getProject = async (projectID: string) => {
  const { data: project, error } = await supabase
    .from("projects")
    .select()
    .eq("project_id", projectID);

  if (error) {
    console.error("Error fetching projects: ", error.message);
  }

  return project;
};
