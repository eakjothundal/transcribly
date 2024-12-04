import { useEffect, useState } from "react";
import { getAllMeetings } from "../../utils/supabase/db/meetings";
import { Meeting } from "../../interfaces/meetings";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Box } from "@mantine/core";
import { Page } from "../../components/ui/Page";
import { NewMeeting } from "../../components/Meetings";

import classes from "./Meetings.module.css";

export function Meetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      const data: Meeting[] = (await getAllMeetings()) || [];
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (meetings.length === 0 && !loading) {
    return <div>No meetings found.</div>;
  }

  const columnDefs: ColDef<Meeting>[] = [
    { field: "meeting_name", headerName: "Meeting Title", width: 350 },
    // {
    //   field: "meeting_description",
    //   headerName: "Project Description",
    //   width: 500,
    // },
  ];
  return (
    <Page>
      <Box className={classes.container}>
        {/* NEW MEETING BUTTON */}
        <Box className={classes.newMeeting}>
          <NewMeeting fetchMeetings={fetchMeetings} />
        </Box>

        {/* TABLE */}
        <Box
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact columnDefs={columnDefs} rowData={meetings} />
        </Box>
      </Box>
    </Page>
  );
}
