import { useCallback, useEffect, useState } from "react";
import {
  getAllTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
} from "../../utils/supabase/db/templates";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import {
  Box,
  Button,
  Checkbox,
  Modal,
  Textarea,
  TextInput,
  Tooltip,
  Text,
} from "@mantine/core";
import { Page } from "../../components/ui/Page";

import classes from "./Templates.module.css";
import { Template, TemplateSettings } from "../../interfaces/templates";
import { AddTemplate } from "../../components/Templates";
import { MeetingSummaryOptions } from "../../interfaces/meetings";

export function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const [templateClicked, setTemplateClicked] = useState<string | null>(null);

  const fetchTemplates = async () => {
    try {
      const data: Template[] = (await getAllTemplates()) || [];
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (templates.length === 0 && !loading) {
    return <div>No templates found.</div>;
  }

  const columnDefs: ColDef<Template>[] = [
    { field: "template_name", headerName: "Template Name", width: 350 },
    {
      field: "template_definition",
      headerName: "Template Definition",
      width: 500,
    },
  ];
  return (
    <Page>
      <Box className={classes.container}>
        {/* ADD Template */}
        <Box className={classes.addTemplate}>
          <AddTemplate />
        </Box>

        {/* TABLE */}
        <Box
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={templates}
            onRowClicked={(event) => {
              if (event.data) {
                setTemplateClicked(event.data.template_id);
              }
            }}
          />
        </Box>

        {/* EDIT TEMPLATE MODAL */}
        <Templates.EditTemplate
          opened={!!templateClicked}
          closeModal={() => setTemplateClicked(null)}
          templateID={templateClicked || ""}
          fetchTemplates={fetchTemplates}
        />
      </Box>
    </Page>
  );
}

export interface EditTemplateProps {
  opened: boolean;
  closeModal: () => void;
  templateID: string;
  fetchTemplates: () => void;
}

Templates.EditTemplate = function EditTemplate(props: EditTemplateProps) {
  const { opened, closeModal, templateID, fetchTemplates } = props;

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [templateName, setTemplateName] = useState<string | undefined>(
    undefined
  );
  const [templateDefinition, setTemplateDefinition] = useState<
    string | undefined
  >(undefined);
  const [templateSettings, setTemplateSettings] = useState<
    TemplateSettings | undefined
  >(undefined);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  // Fetch templates data when the modal opens and templateID changes
  useEffect(() => {
    async function fetchTemplate() {
      if (templateID) {
        const template: Template | null = await getTemplate(templateID);
        setSelectedTemplate(template || null);
        setTemplateName(template?.template_name);
        setTemplateDefinition(template?.template_definition);
        setTemplateSettings(template?.template_settings);
      }
    }

    fetchTemplate();
  }, [fetchTemplates, templateID]);

  const handleUpdateTemplate = useCallback(async () => {
    if (!selectedTemplate) return;

    // Create an object with only the fields that have changed
    const updates: Partial<Template> = {};
    if (templateName !== selectedTemplate.template_name) {
      updates.template_name = templateName;
    }
    if (templateDefinition !== selectedTemplate.template_definition) {
      updates.template_definition = templateDefinition;
    }

    if (templateSettings) {
      const settings: TemplateSettings = Object.keys(templateSettings).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            ...templateSettings[key as MeetingSummaryOptions],
          },
        }),
        {} as TemplateSettings
      );
      updates.template_settings = settings;
    }

    // Only call updateTemplate if there are changes to be saved
    if (Object.keys(updates).length > 0) {
      console.log("Updating template with:", updates);
      await updateTemplate(templateID, { ...updates });
    }

    // Close the modal after updating
    fetchTemplates();
    closeModal();
  }, [
    closeModal,
    fetchTemplates,
    selectedTemplate,
    templateDefinition,
    templateID,
    templateName,
    templateSettings,
  ]);

  return (
    <Modal
      title="Edit Template"
      opened={opened}
      onClose={closeModal}
      size="lg"
      radius="md"
    >
      <Box className={classes.updateTemplateModalContent}>
        {/* NAME */}
        <TextInput
          label="Template Name"
          placeholder="New Template"
          value={templateName}
          onChange={(event) => setTemplateName(event.currentTarget.value)}
          disabled={!selectedTemplate}
        />

        {/* DESCRIPTION */}
        <Textarea
          label="Template Definition"
          description="This will be used as extra context in summarization, so try to be detailed here."
          value={templateDefinition}
          onChange={(event) => setTemplateDefinition(event.currentTarget.value)}
          autosize
          minRows={3}
          maxRows={6}
          disabled={!selectedTemplate}
        />

        {/* SETTINGS */}
        <Box>
          <Box>
            <Text>Choose which fields to include in the template:</Text>
          </Box>
          {templateSettings &&
            Object.keys(templateSettings).map((key) => {
              const settingKey = key as MeetingSummaryOptions;
              const setting = templateSettings[settingKey];

              // Capitalize the first letter and replace underscores
              const label =
                settingKey.charAt(0).toUpperCase() +
                settingKey.slice(1).replace(/_/g, " ");

              return (
                <Box key={settingKey}>
                  <Tooltip
                    label={setting.description}
                    withArrow
                    position="left"
                  >
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
        </Box>

        {/* TEMPLATE BUTTONS */}
        <Box className={classes.updateTemplateButtons}>
          <Button
            variant="gradient"
            gradient={{ from: "pink", to: "red", deg: 132 }}
            onClick={() => {
              if (selectedTemplate) {
                setOpenDeleteConfirmation(true);
              }
            }}
          >
            Delete Template
          </Button>

          <Button variant="gradient" onClick={handleUpdateTemplate}>
            Save Template
          </Button>
        </Box>

        {/* DELETE CONFIRMATION MODAL */}
        <Templates.DeleteConfirmation
          opened={openDeleteConfirmation}
          closeModal={() => {
            setOpenDeleteConfirmation(false);
            closeModal();
          }}
          templateID={templateID}
          fetchTemplates={fetchTemplates}
        />
      </Box>
    </Modal>
  );
};

type DeleteConfirmationProps = {
  opened: boolean;
  closeModal: () => void;
  templateID: string;
  fetchTemplates: () => void;
};

Templates.DeleteConfirmation = function DeleteConfirmation(
  props: DeleteConfirmationProps
) {
  const { opened, closeModal, templateID, fetchTemplates } = props;

  const [confirmation, setConfirmation] = useState<string | undefined>(
    undefined
  );

  return (
    <Modal
      title="Delete Template"
      opened={opened}
      onClose={closeModal}
      size="lg"
      radius="md"
    >
      <Box>
        <p>
          Are you sure you want to delete this template? Please type 'delete' to
          confirmation template deletion
        </p>
        <TextInput
          label="Confirmation"
          placeholder="Type 'delete' to confirm"
          value={confirmation}
          onChange={(event) => setConfirmation(event.currentTarget.value)}
        />

        <Box className={classes.deleteButtons}>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: "pink", to: "red", deg: 132 }}
            onClick={async () => {
              if (confirmation === "delete") {
                console.log("Deleting Template...");
                await deleteTemplate(templateID);
                fetchTemplates();
                closeModal();
              }
            }}
            disabled={confirmation !== "delete"}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
