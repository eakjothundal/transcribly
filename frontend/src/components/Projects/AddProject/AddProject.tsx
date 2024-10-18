import { Box, Button, Modal } from "@mantine/core";
import { useState } from "react";

export function AddProject() {
  const [addingProject, setAddingProject] = useState<boolean>(false);

  return (
    <Box>
      <Button onClick={() => setAddingProject(true)}>Add Project</Button>

      <AddProject.AddProjectModal
        opened={addingProject}
        closeModal={setAddingProject}
      />
    </Box>
  );
}

export interface AddProjectModalProps {
  opened: boolean;
  closeModal: (opened: false) => void;
}

AddProject.AddProjectModal = function AddProjectModal(
  props: AddProjectModalProps
) {
  const { opened, closeModal } = props;

  return <Modal opened={opened} onClose={() => closeModal(false)} />;
};
