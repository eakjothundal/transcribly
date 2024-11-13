import { Box, Button, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getAllTemplates } from "../../../utils/supabase/db/templates";
import { getAllProjects } from "../../../utils/supabase/db/projects";

import classes from "./NewMeeting.module.css";
import { Template } from "../../../interfaces/templates/templates";
import { Project } from "../../../interfaces/projects";
import { UploadArea } from "../../Home/UploadArea";

export function NewMeeting() {
  const [addingMeeting, setAddingMeeting] = useState<boolean>(false);

  return (
    <Box>
      <Button onClick={() => setAddingMeeting(true)} variant="gradiant">
        New Meeting
      </Button>

      <NewMeeting.NewMeetingModal
        opened={addingMeeting}
        closeModal={() => setAddingMeeting(false)}
      />
    </Box>
  );
}

export interface NewMeetingModalProps {
  opened: boolean;
  closeModal: () => void;
}

NewMeeting.NewMeetingModal = function AddProjectModal(
  props: NewMeetingModalProps
) {
  const { opened, closeModal } = props;

  // MEETING FIELD STATES
  const [meetingName, setMeetingName] = useState<string | undefined>(undefined);
  const [selectedTemplate, setSelectedTemplate] = useState<
    string | undefined
  >();
  const [selectedProject, setSelectedProject] = useState<string | undefined>();
  const [addedContext, setAddedContext] = useState<string>("");
  // meeting date as timestampz to work with postgresql
  const [meetingDateAndTime, setMeetingDateAndTime] = useState<string>(
    new Date().toISOString()
  );
  const [summary, setSummary] = useState<string | null>(null);

  // Fetch states
  const [templates, setTemplates] = useState<Template[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch all templates
  useEffect(() => {
    const fetchTemplates = async () => {
      const templatesData = await getAllTemplates();
      setTemplates(templatesData || []);
    };

    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData || []);
    };

    fetchTemplates();
    fetchProjects();
  }, []);

  const disableUpload = useMemo(
    () => !meetingName || !selectedTemplate || !selectedProject,
    [meetingName, selectedTemplate, selectedProject]
  );

  // Add Meeting
  const handleSaveMeeting = useCallback(async () => {}, []);

  return (
    <Modal
      title="Summarize Meeting"
      opened={opened}
      onClose={closeModal}
      size="xl"
      radius="md"
    >
      <Box className={classes.newMeetingModalContent}>
        {/* NAME */}
        <TextInput
          label="Meeting Name"
          placeholder="New Meeting"
          value={meetingName}
          onChange={(event) => setMeetingName(event.currentTarget.value)}
          required
          withAsterisk
        />

        {/* DATE */}
        <DateTimePicker
          label="Meeting Date and Time"
          value={new Date(meetingDateAndTime)}
          valueFormat="DD/MM/YYYY hh:mm A"
          onChange={(value) =>
            value && setMeetingDateAndTime(value.toISOString())
          }
          required
          withAsterisk
        />

        {/* PROJECT */}
        <Select
          label="Project"
          placeholder="Select a Project"
          data={projects.map((project) => ({
            value: project.project_id,
            label: project.project_name,
          }))}
          value={selectedProject}
          onChange={(value) => value && setSelectedProject(value)}
          required
          withAsterisk
        />

        {/* TEMPLATE */}
        <Select
          label="Template"
          placeholder="Select a Template"
          data={templates.map((template) => ({
            value: template.template_id,
            label: template.template_name,
          }))}
          value={selectedTemplate}
          onChange={(value) => value && setSelectedTemplate(value)}
          required
          withAsterisk
        />

        {/* ADDED CONTEXT */}
        <Textarea
          label="Added Context"
          description="This will be used as extra context in summarization, so try to be detailed here."
          value={addedContext}
          onChange={(event) => setAddedContext(event.currentTarget.value)}
          autosize
          minRows={3}
          maxRows={6}
        />

        {/* UPLOAD */}
        <Box className={classes.uploadAudioArea}>
          <UploadArea setSummary={setSummary} disabled={disableUpload} />
        </Box>

        {/* ADD PROJECT BUTTON */}
        <Box className={classes.addMeetingButton}>
          <Button variant="gradient" disabled={!summary}>
            Add Meeting
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
