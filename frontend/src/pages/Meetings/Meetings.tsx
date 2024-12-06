import { useEffect, useState } from "react";
import { getAllMeetings } from "../../utils/supabase/db/meetings";
import { Meeting } from "../../interfaces/meetings";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { Box, Modal, Text } from "@mantine/core";

import { Page } from "../../components/ui/Page";
import { NewMeeting } from "../../components/Meetings";
import { getMeeting } from "../../utils/supabase/db/meetings";

import classes from "./Meetings.module.css";
import { Summary } from "../../components/Meetings/categories";

export function Meetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const [meetingClicked, setMeetingClicked] = useState<
    Meeting["meeting_id"] | null
  >(null);

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
    return <Text>No meetings found.</Text>;
  }

  const columnDefs: ColDef<Meeting>[] = [
    { field: "meeting_name", headerName: "Meeting Title", width: 350 },
    {
      field: "added_context",
      headerName: "Meeting Context",
      width: 500,
    },
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
          <AgGridReact
            columnDefs={columnDefs}
            rowData={meetings}
            onRowClicked={(event) => {
              if (event.data) {
                setMeetingClicked(event.data.meeting_id);
              }
            }}
          />
        </Box>

        {/* VIEW MEETING MODAL */}
        <Meetings.ViewMeeting
          opened={!!meetingClicked}
          closeModal={() => setMeetingClicked(null)}
          meetingID={meetingClicked || ""}
        />
      </Box>
    </Page>
  );
}

export interface ViewMeetingProps {
  opened: boolean;
  closeModal: () => void;
  meetingID: string;
}

Meetings.ViewMeeting = function ViewMeeting(props: ViewMeetingProps) {
  const { opened, closeModal, meetingID } = props;

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Fetch project data when the modal opens and projectID changes
  useEffect(() => {
    async function fetchProject() {
      if (meetingID) {
        const project: Meeting | null = await getMeeting(meetingID);
        setSelectedMeeting(project || null);
      }
    }

    fetchProject();
  }, [meetingID]);

  const { meeting_name } = selectedMeeting || {};

  const { summary } = selectedMeeting || {};

  return (
    <Modal
      title={meeting_name}
      opened={opened && !!selectedMeeting}
      onClose={closeModal}
      size="80%"
      radius="md"
    >
      <Box className={classes.updateProjectModalContent}>
        {/* SUMMARY */}
        <Box>
          <Summary items={summary?.value} />
        </Box>
      </Box>
    </Modal>
  );
};
