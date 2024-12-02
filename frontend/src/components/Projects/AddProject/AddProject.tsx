import { Box, Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import { addProject } from "../../../utils/supabase/db";

import classes from "./AddProject.module.css";

export interface AddProjectProps {
  fetchProjects?: () => void;
}

export function AddProject(props: AddProjectProps) {
  const { fetchProjects } = props;

  const [addingProject, setAddingProject] = useState<boolean>(false);

  return (
    <Box>
      <Button
        onClick={() => setAddingProject(true)}
        variant="gradient"
        gradient={{ from: "blue", to: "violet", deg: 202 }}
        size="md"
        radius="md"
      >
        Add Project
      </Button>

      <AddProject.AddProjectModal
        opened={addingProject}
        closeModal={() => setAddingProject(false)}
        fetchProjects={fetchProjects}
      />
    </Box>
  );
}

export interface AddProjectModalProps {
  opened: boolean;
  closeModal: () => void;
  fetchProjects?: () => void;
}

AddProject.AddProjectModal = function AddProjectModal(
  props: AddProjectModalProps
) {
  const { opened, closeModal, fetchProjects } = props;

  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const [projectDescription, setProjectDescription] = useState<
    string | undefined
  >(undefined);

  const handleAddProject = useCallback(async () => {
    if (projectName && projectDescription) {
      await addProject(projectName, projectDescription);

      if (fetchProjects) {
        fetchProjects();
      }

      closeModal();
    }
  }, [projectName, projectDescription, closeModal, fetchProjects]);

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
