import { supabase } from "../../supabase";

export const getAllProjects = async () => {
  const { data: projects, error } = await supabase.from("projects").select();

  if (error) {
    console.error("Error fetching projects: ", error.message);
  }

  return projects;
};
