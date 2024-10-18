import { Box, Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import { addTemplate } from "../../../utils/supabase/db";

import classes from "./AddTemplate.module.css";

// TODO: NEED TO FIGURE OUT HOW TO CONTROL TEMPLATE FIELDS - SHOULD BE A OBJECT THAT ARE ENABLED
// ONCE ENABLED, SHOULD ACCEPT TEXT INSTRUCTIONS FOR THAT FIELD (SUMMARY ENABLED -> TEXT AREA APPEARS)
// THIS ABILITY NEEDS TO BE SUPPORTED IN THE DATABASE - CURRENTLY ISN'T

export function AddTemplate() {
  const [addingTemplate, setAddingTemplate] = useState<boolean>(false);

  return (
    <Box>
      <Button onClick={() => setAddingTemplate(true)}>Add Template</Button>

      <AddTemplate.AddTemplateModal
        opened={addingTemplate}
        closeModal={() => setAddingTemplate(false)}
      />
    </Box>
  );
}

export interface AddTemplateModalProps {
  opened: boolean;
  closeModal: () => void;
}

AddTemplate.AddTemplateModal = function AddTemplateModal(
  props: AddTemplateModalProps
) {
  const { opened, closeModal } = props;

  const [templateName, setTemplateName] = useState<string | undefined>(
    undefined
  );
  const [templateDefinition, setTemplateDescription] = useState<
    string | undefined
  >(undefined);

  const handleAddTemplate = useCallback(() => {
    if (templateName && templateDefinition) {
      addTemplate(templateName, templateDefinition);
      closeModal();
    }
  }, [templateName, templateDefinition, closeModal]);

  return (
    <Modal
      title="Add a New Template"
      opened={opened}
      onClose={closeModal}
      size="lg"
      radius="md"
    >
      <Box className={classes.addTemplateModalContent}>
        {/* NAME */}
        <TextInput
          label="Template Name"
          placeholder="New Template"
          value={templateName}
          onChange={(event) => setTemplateName(event.currentTarget.value)}
        />

        {/* DEFINITION */}
        <Textarea
          label="Template Definition"
          description="This will be used as extra context in summarization, so try to be detailed here."
          value={templateDefinition}
          onChange={(event) =>
            setTemplateDescription(event.currentTarget.value)
          }
          autosize
          minRows={3}
          maxRows={6}
        />

        {/* ADD PROJECT BUTTON */}
        <Box className={classes.addTemplateButton}>
          <Button variant="gradient" onClick={handleAddTemplate}>
            Add Template
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
