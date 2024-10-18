import { supabase, userId } from "../../supabase";

export const addProject = async (name: string, description: string) => {
  const { error } = await supabase.from("projects").insert({
    user_id: userId,
    project_name: name,
    project_description: description,
  });

  if (error) {
    console.error("Error inserting new project: ", error.message);
  }
};
