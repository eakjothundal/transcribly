import { supabase } from "../../supabase";

export const getAllMeetings = async () => {
  const { data: meetings, error } = await supabase.from("meetings").select();

  if (error) {
    console.error("Error fetching meetings: ", error.message);
  }

  return meetings;
};
