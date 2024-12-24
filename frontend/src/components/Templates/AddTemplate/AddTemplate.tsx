import {
  Box,
  Button,
  Checkbox,
  Modal,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useCallback, useState } from "react";

import { addTemplate } from "../../../utils/supabase/db";

import classes from "./AddTemplate.module.css";
import { TemplateSettings } from "../../../interfaces/templates/templates";
import { initialTemplateSettings } from "./defaults";
import { MeetingSummaryOptions } from "../../../interfaces/meetings";

export interface AddTemplateProps {
  fetchTemplates?: () => void;
}

export function AddTemplate(props: AddTemplateProps) {
  const { fetchTemplates } = props;

  const [addingTemplate, setAddingTemplate] = useState<boolean>(false);

  return (
    <Box>
      <Button
        onClick={() => setAddingTemplate(true)}
        variant="gradient"
        gradient={{ from: "blue", to: "violet", deg: 202 }}
        size="md"
        radius="md"
      >
        Add Template
      </Button>

      <AddTemplate.AddTemplateModal
        opened={addingTemplate}
        closeModal={() => setAddingTemplate(false)}
        fetchTemplates={fetchTemplates}
      />
    </Box>
  );
}

export interface AddTemplateModalProps {
  opened: boolean;
  closeModal: () => void;
  fetchTemplates?: () => void;
}

AddTemplate.AddTemplateModal = function AddTemplateModal(
  props: AddTemplateModalProps
) {
  const { opened, closeModal, fetchTemplates } = props;

  const [templateName, setTemplateName] = useState<string | undefined>(
    undefined
  );
  const [templateDefinition, setTemplateDescription] = useState<
    string | undefined
  >(undefined);
  const [templateSettings, setTemplateSettings] = useState<TemplateSettings>(
    initialTemplateSettings
  );

  const clearFields = useCallback(() => {
    setTemplateName(undefined);
    setTemplateDescription(undefined);
    setTemplateSettings(initialTemplateSettings);
  }, []);

  const handleAddTemplate = useCallback(async () => {
    if (templateName && templateDefinition) {
      await addTemplate(templateName, templateDefinition, templateSettings);

      setTemplateName(undefined);
      setTemplateDescription(undefined);
      setTemplateSettings(initialTemplateSettings);

      fetchTemplates?.();
      closeModal();
      clearFields();
    }
  }, [
    clearFields,
    closeModal,
    fetchTemplates,
    templateDefinition,
    templateName,
    templateSettings,
  ]);

  return (
    <Modal
      title="Add a New Template"
      opened={opened}
      onClose={() => {
        closeModal();
        clearFields();
      }}
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
          required
          withAsterisk
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
          required
          withAsterisk
        />

        {/* SETTINGS */}
        <Box>
          <Text>Choose which fields to include in the template:</Text>
        </Box>
        {Object.keys(templateSettings).map((key) => {
          const settingKey = key as MeetingSummaryOptions;
          const setting = templateSettings[settingKey];

          // Capitalize the first letter and replace underscores
          const label =
            settingKey.charAt(0).toUpperCase() +
            settingKey.slice(1).replace(/_/g, " ");

          return (
            <Box key={settingKey}>
              <Tooltip label={setting.description} withArrow position="left">
                <Checkbox
                  label={`${label}`}
                  checked={setting.enabled}
                  onChange={(event) =>
                    setTemplateSettings({
                      ...templateSettings,
                      [settingKey]: {
                        ...setting,
                        enabled: event.currentTarget.checked,
                      },
                    })
                  }
                />
              </Tooltip>

              {setting.enabled && (
                <Textarea
                  label={`Instructions for ${label}`}
                  placeholder={`Provide specific instructions for ${label.toLowerCase()}`}
                  value={setting.instructions}
                  onChange={(event) =>
                    setTemplateSettings({
                      ...templateSettings,
                      [settingKey]: {
                        ...setting,
                        instructions: event.currentTarget.value,
                      },
                    })
                  }
                  autosize
                  minRows={2}
                  maxRows={4}
                  mt="xs"
                />
              )}
            </Box>
          );
        })}

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
