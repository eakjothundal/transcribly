import { useEffect, useState } from "react";
import { getAllMeetings } from "../../utils/supabase/db/meetings";
import { getProject } from "../../utils/supabase/db/projects";
import { getTemplate } from "../../utils/supabase/db/templates";
import { Meeting } from "../../interfaces/meetings";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { format } from "date-fns";

import { Box, Modal, Text as MantineText } from "@mantine/core";

import { Page } from "../../components/ui/Page";
import { NewMeeting } from "../../components/Meetings";
import { getMeeting } from "../../utils/supabase/db/meetings";

import classes from "./Meetings.module.css";
import { List, Text } from "../../components/Meetings/categories";
import { Project } from "../../interfaces/projects";
import { Template } from "../../interfaces/templates";

export function Meetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const [meetingClicked, setMeetingClicked] = useState<
    Meeting["meeting_id"] | null
  >(null);

  const fetchMeetings = async () => {
    try {
      const data: Meeting[] = (await getAllMeetings()) || [];
      setMeetings(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const columnDefs: ColDef<Meeting>[] = [
    { field: "meeting_name", headerName: "Meeting Title", width: 350 },
    {
      field: "meeting_date",
      headerName: "Meeting Date",
      width: 150,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value);
        return format(date, "MM/dd/yyyy"); // Format as MM/DD/YYYY
      },
    },
    {
      field: "meeting_date",
      headerName: "Meeting Time",
      width: 150,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value);
        return format(date, "hh:mm a"); // Format as HH:MM AM/PM
      },
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
          style={{ height: "60vh" }} // the Data Grid will fill the size of the parent container
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

  const [project_name, setProjectName] = useState<string | null>(null);
  const [template_name, setTemplateName] = useState<string | null>(null);

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

  // Set project name and template name
  useEffect(() => {
    async function fetchProjectAndTemplate() {
      if (selectedMeeting) {
        const selectedProject: Project = await getProject(
          selectedMeeting.project_id
        );
        const selectedTemplate: Template = await getTemplate(
          selectedMeeting.template_id
        );

        setProjectName(selectedProject.project_name);
        setTemplateName(selectedTemplate.template_name);
      }
    }

    fetchProjectAndTemplate();
  }, [selectedMeeting]);

  const { meeting_name, meeting_date } = selectedMeeting || {};

  const {
    summary,
    key_topics,
    notes,
    action_items,
    decisions,
    next_steps,
    improvements,
    vibe,
  } = selectedMeeting || {};

  return (
    <Modal
      title={`Meeting: ${meeting_name}`}
      opened={opened && !!selectedMeeting}
      onClose={closeModal}
      size="80%"
      radius="md"
    >
      <Box className={classes.updateProjectModalContent}>
        <Box>
          <MantineText>
            {/* Date and Time */}
            {meeting_date && (
              <h4>
                Meeting Date:{" "}
                {meeting_date && format(meeting_date, "MM/dd/yyyy")}
              </h4>
            )}
            {meeting_date && (
              <h4>Meeting Time: {format(meeting_date, "hh:mm a")}</h4>
            )}

            {/* Project and Template */}
            {project_name && project_name !== "None" && (
              <h4>Project: {project_name}</h4>
            )}
            {template_name && <h4>Template: {template_name}</h4>}
          </MantineText>
        </Box>

        {/* KEY TOPICS */}
        {key_topics && (
          <Box>
            <List items={key_topics?.value} title="Key Topics" />
          </Box>
        )}

        {/* SUMMARY */}
        {summary && (
          <Box>
            <List items={summary?.value} title="Summary" />
          </Box>
        )}

        {/* NOTES */}
        {notes && (
          <Box>
            <List items={notes?.value} title="Notes" />
          </Box>
        )}

        {/* ACTION ITEMS */}
        {action_items && (
          <Box>
            <List items={action_items?.value} title="Action Items" />
          </Box>
        )}

        {/* DECISIONS */}
        {decisions && (
          <Box>
            <List items={decisions?.value} title="Decisions" />
          </Box>
        )}

        {/* NEXT STEPS */}
        {next_steps && (
          <Box>
            <List items={next_steps?.value} title="Next Steps" />
          </Box>
        )}

        {/* IMPROVEMENTS */}
        {improvements && (
          <Box>
            <List items={improvements?.value} title="Improvements" />
          </Box>
        )}

        {/* VIBE */}
        {vibe && <Text content={vibe} title="Vibe" />}
      </Box>
    </Modal>
  );
};
