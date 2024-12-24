import { Box, Button, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useCallback, useMemo, useState } from "react";

import classes from "./NewMeeting.module.css";
import { Template } from "../../../interfaces/templates/templates";
import { Project } from "../../../interfaces/projects";
import { UploadArea } from "../../Home/UploadArea";
import { addMeeting } from "../../../utils/supabase/db/meetings";

import { summarizeAndTranscribe } from "../../../utils/summarize";
import { Meeting } from "../../../interfaces/meetings/meetings";

export interface NewMeetingProps {
  projects: Project[];
  templates: Template[];
  fetchMeetings?: () => void;
}

export function NewMeeting(props: NewMeetingProps) {
  const { projects, templates, fetchMeetings } = props;

  const [addingMeeting, setAddingMeeting] = useState<boolean>(false);

  return (
    <Box>
      <Button
        onClick={() => setAddingMeeting(true)}
        variant="gradient"
        gradient={{ from: "blue", to: "violet", deg: 202 }}
        size="md"
        radius="md"
      >
        New Meeting
      </Button>

      <NewMeeting.NewMeetingModal
        opened={addingMeeting}
        closeModal={() => setAddingMeeting(false)}
        fetchMeetings={fetchMeetings}
        projects={projects}
        templates={templates}
      />
    </Box>
  );
}

export interface NewMeetingModalProps extends NewMeetingProps {
  opened: boolean;
  closeModal: () => void;
}

NewMeeting.NewMeetingModal = function NewMeetingModal(
  props: NewMeetingModalProps
) {
  const { opened, closeModal, projects, templates, fetchMeetings } = props;

  // MEETING FIELD STATES
  const [meetingName, setMeetingName] = useState<string | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<
    string | undefined
  >();
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >();
  const [addedContext, setAddedContext] = useState<string>("");
  // meeting date as timestampz to work with postgresql
  const [meetingDateAndTime, setMeetingDateAndTime] = useState<string>(
    new Date().toISOString()
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const disableSave = useMemo(
    () =>
      !meetingName ||
      !selectedTemplateId ||
      !selectedProjectId ||
      !uploadedFile,
    [meetingName, selectedTemplateId, selectedProjectId, uploadedFile]
  );

  // Function to clear all fields
  const clearFields = useCallback(() => {
    setMeetingName("");
    setSelectedTemplateId(undefined);
    setSelectedProjectId(undefined);
    setAddedContext("");
    setMeetingDateAndTime(new Date().toISOString());

    setTimeout(() => {
      setUploadedFile(null);
    }, 200);
  }, []);

  // Upload File
  const summarize = useCallback(async () => {
    if (!uploadedFile) {
      console.error("No file uploaded");
      return;
    }

    if (!selectedTemplateId) {
      console.error("No template ID provided");
      return;
    }

    if (!selectedProjectId) {
      console.error("No project ID provided");
      return;
    }

    if (!meetingName) {
      console.error("No meeting name provided");
      return;
    }

    setLoading(true);

    try {
      const response = await summarizeAndTranscribe(
        uploadedFile,
        selectedTemplateId,
        selectedProjectId,
        addedContext
      );

      if (!response) {
        console.error("No response from summarizeAndTranscribe");
        return;
      }

      const parsedSummary: Partial<Meeting> = JSON.parse(
        response.summary || "{}"
      );

      // Save the meeting only if transcript and summary are available
      if (response.transcript && response.summary) {
        await addMeeting({
          meeting_name: meetingName,
          project_id: selectedProjectId,
          template_id: selectedTemplateId,
          meeting_date: meetingDateAndTime,
          added_context: addedContext,
          transcript: response.transcript,
          summary: JSON.parse(response.summary).summary,
          notes: parsedSummary.notes ? parsedSummary.notes : null,
          action_items: parsedSummary.action_items
            ? parsedSummary.action_items
            : null,
          key_topics: parsedSummary.key_topics
            ? parsedSummary.key_topics
            : null,
          decisions: parsedSummary.decisions ? parsedSummary.decisions : null,
          next_steps: parsedSummary.next_steps
            ? parsedSummary.next_steps
            : null,
          improvements: parsedSummary.improvements
            ? parsedSummary.improvements
            : null,
          vibe: parsedSummary.vibe ? parsedSummary.vibe : null,
        });

        fetchMeetings?.();
        closeModal();
        clearFields();
      } else {
        console.error("Transcript or summary missing after summarization.");
      }
    } catch (error) {
      console.error("Error during summarization or saving meeting:", error);
    } finally {
      setLoading(false);
    }
  }, [
    addedContext,
    clearFields,
    closeModal,
    fetchMeetings,
    meetingDateAndTime,
    meetingName,
    selectedProjectId,
    selectedTemplateId,
    uploadedFile,
  ]);

  return (
    <Modal
      title="Summarize Meeting"
      opened={opened}
      onClose={() => {
        closeModal();
        clearFields();
      }}
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
          value={selectedProjectId}
          onChange={(value) => value && setSelectedProjectId(value)}
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
          value={selectedTemplateId}
          onChange={(value) => value && setSelectedTemplateId(value)}
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
          <UploadArea
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        </Box>

        {/* ADD PROJECT BUTTON */}
        <Box className={classes.addMeetingButton}>
          <Button
            variant="gradient"
            disabled={disableSave || loading}
            onClick={summarize}
            loading={loading}
          >
            Add Meeting
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
