import { Meeting } from "../../../../interfaces/meetings/meetings";
import { supabase, userId } from "../../supabase";

export const addMeeting = async (meeting: Meeting) => {
  const { error } = await supabase.from("meetings").insert({
    ...meeting,
    user_id: userId,
  });

  if (error) {
    console.error("Error inserting new meeting: ", error.message);
  }
};
