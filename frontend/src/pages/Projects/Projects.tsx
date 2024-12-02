import { useEffect, useState } from "react";
import { getAllProjects } from "../../utils/supabase/db/projects";
import { Project } from "../../interfaces/projects";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Box } from "@mantine/core";
import { Page } from "../../components/ui/Page";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [projectClicked, setProjectClicked] = useState<string | null>(null);

  useEffect(() => {
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

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (projects.length === 0) {
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
      <Box
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500, width: "100%" }} // the Data Grid will fill the size of the parent container
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
    </Page>
  );
}
