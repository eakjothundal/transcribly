import { Box, Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import { addProject } from "../../../utils/supabase/db";

import classes from "./NewMeeting.module.css";

// TODO: THIS IS MOSTLY COPIED FROM ADDPROJECT - UPDATE BEFORE USING

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

  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const [projectDescription, setProjectDescription] = useState<
    string | undefined
  >(undefined);

  const handleAddProject = useCallback(() => {
    if (projectName && projectDescription) {
      addProject(projectName, projectDescription);
      closeModal();
    }
  }, [projectName, projectDescription, closeModal]);

  return (
    <Modal
      title="Add a New Project"
      opened={opened}
      onClose={closeModal}
      size="lg"
      radius="md"
    >
      <Box className={classes.addProjectModalContent}>
        {/* NAME */}
        <TextInput
          label="Project Name"
          placeholder="New Project"
          value={projectName}
          onChange={(event) => setProjectName(event.currentTarget.value)}
        />

        {/* DESCRIPTION */}
        <Textarea
          label="Project Description"
          description="This will be used as extra context in summarization, so try to be detailed here."
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.currentTarget.value)}
          autosize
          minRows={3}
          maxRows={6}
        />

        {/* ADD PROJECT BUTTON */}
        <Box className={classes.addProjectButton}>
          <Button variant="gradient" onClick={handleAddProject}>
            Add Project
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
