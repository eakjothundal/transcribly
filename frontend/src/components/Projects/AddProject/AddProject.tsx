import { Box, Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";

import classes from "./AddProject.module.css";

export function AddProject() {
  const [addingProject, setAddingProject] = useState<boolean>(false);

  return (
    <Box>
      <Button onClick={() => setAddingProject(true)}>Add Project</Button>

      <AddProject.AddProjectModal
        opened={addingProject}
        closeModal={() => setAddingProject(false)}
      />
    </Box>
  );
}

export interface AddProjectModalProps {
  opened: boolean;
  closeModal: () => void;
}

AddProject.AddProjectModal = function AddProjectModal(
  props: AddProjectModalProps
) {
  const { opened, closeModal } = props;

  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const [projectDescription, setProjectDescription] = useState<
    string | undefined
  >(undefined);

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
          <Button variant="gradient">Add Project</Button>
        </Box>
      </Box>
    </Modal>
  );
};
