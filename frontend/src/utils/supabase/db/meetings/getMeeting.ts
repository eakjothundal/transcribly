import { supabase } from "../../supabase";

export const getMeeting = async (meetingID: string) => {
  const { data: meeting, error } = await supabase
    .from("meetings")
    .select()
    .eq("meeting_id", meetingID);

  if (error) {
    console.error("Error fetching meetings: ", error.message);
  }

  return meeting ? meeting[0] : null;
};
