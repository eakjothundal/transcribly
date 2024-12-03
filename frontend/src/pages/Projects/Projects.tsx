import { useCallback, useEffect, useState } from "react";
import {
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../../utils/supabase/db/projects";
import { Project } from "../../interfaces/projects";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Box, Button, Modal, Textarea, TextInput } from "@mantine/core";
import { Page } from "../../components/ui/Page";
import { AddProject } from "../../components/Projects";

import classes from "./Projects.module.css";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [projectClicked, setProjectClicked] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data: Project[] = (await getAllProjects()) || [];
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (projects.length === 0 && !loading) {
    return <div>No projects found.</div>;
  }

  const columnDefs: ColDef<Project>[] = [
    { field: "project_id", headerName: "Project ID", width: 350 }, // TODO: project ID doesn't need to be displayed to the user. Remove this column after dev.
    { field: "project_name", headerName: "Project Name", width: 350 },
    {
      field: "project_description",
      headerName: "Project Description",
      width: 500,
    },
  ];
  return (
    <Page>
      <Box className={classes.container}>
        {/* ADD PROJECT */}
        <Box className={classes.addProject}>
          <AddProject fetchProjects={fetchProjects} />
        </Box>

        {/* TABLE */}
        <Box
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={projects}
            onRowClicked={(event) => {
              if (event.data) {
                setProjectClicked(event.data.project_id);
              }
            }}
          />
        </Box>

        {/* EDIT PROJECT MODAL */}
        <Projects.EditProject
          opened={!!projectClicked}
          closeModal={() => setProjectClicked(null)}
          projectID={projectClicked || ""}
          fetchProjects={fetchProjects}
        />
      </Box>
    </Page>
  );
}

export interface EditProjectProps {
  opened: boolean;
  closeModal: () => void;
  projectID: string;
  fetchProjects: () => void;
}

Projects.EditProject = function EditProject(props: EditProjectProps) {
  const { opened, closeModal, projectID, fetchProjects } = props;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const [projectDescription, setProjectDescription] = useState<
    string | undefined
  >(undefined);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  // Fetch project data when the modal opens and projectID changes
  useEffect(() => {
    async function fetchProject() {
      if (projectID) {
        const project: Project | null = await getProject(projectID);
        setSelectedProject(project || null);
        setProjectName(project?.project_name);
        setProjectDescription(project?.project_description);
      }
    }

    fetchProject();
  }, [projectID]);

  // Updated handleUpdateProject function
  const handleUpdateProject = useCallback(async () => {
    if (!selectedProject) return;

    // Create an object with only the fields that have changed
    const updates: Partial<Project> = {};
    if (projectName !== selectedProject.project_name) {
      updates.project_name = projectName;
    }
    if (projectDescription !== selectedProject.project_description) {
      updates.project_description = projectDescription;
    }

    // Only call updateProject if there are changes to be saved
    if (Object.keys(updates).length > 0) {
      console.log("Updating project with:", updates);
      await updateProject(projectID, { ...updates });
    }

    // Close the modal after updating
    fetchProjects();
    closeModal();
  }, [
    closeModal,
    fetchProjects,
    projectDescription,
    projectID,
    projectName,
    selectedProject,
  ]);

  return (
    <Modal
      title="Edit Project"
      opened={opened}
      onClose={closeModal}
      size="lg"
      radius="md"
    >
      <Box className={classes.updateProjectModalContent}>
        {/* NAME */}
        <TextInput
          label="Project Name"
          placeholder="New Project"
          value={projectName}
          onChange={(event) => setProjectName(event.currentTarget.value)}
          disabled={!selectedProject}
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
          disabled={!selectedProject}
        />

        {/* PROJECT BUTTONS */}
        <Box className={classes.updateProjectButtons}>
          <Button
            variant="gradient"
            gradient={{ from: "pink", to: "red", deg: 132 }}
            onClick={() => {
              if (selectedProject) {
                setOpenDeleteConfirmation(true);
              }
            }}
          >
            Delete Project
          </Button>

          <Button variant="gradient" onClick={handleUpdateProject}>
            Save Project
          </Button>
        </Box>

        {/* DELETE CONFIRMATION MODAL */}
        <Projects.DeleteConfirmation
          opened={openDeleteConfirmation}
          closeModal={() => {
            setOpenDeleteConfirmation(false);
            closeModal();
          }}
          projectID={projectID}
          fetchProjects={fetchProjects}
        />
      </Box>
    </Modal>
  );
};

type DeleteConfirmationProps = {
  opened: boolean;
  closeModal: () => void;
  projectID: string;
  fetchProjects: () => void;
};

Projects.DeleteConfirmation = function DeleteConfirmation(
  props: DeleteConfirmationProps
) {
  const { opened, closeModal, projectID, fetchProjects } = props;

  const [confirmation, setConfirmation] = useState<string | undefined>(
    undefined
  );

  return (
    <Modal
      title="Delete Project"
      opened={opened}
      onClose={closeModal}
      size="lg"
      radius="md"
    >
      <Box>
        <p>
          Are you sure you want to delete this project? Please type 'delete' to
          confirmation project deletion
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
                console.log("Deleting project...");
                await deleteProject(projectID);
                fetchProjects();
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
