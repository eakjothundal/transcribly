import { useEffect, useState } from "react";
import { getAllProjects } from "../../../utils/supabase/db/projects";
import { Project } from "../../../interfaces/projects";
import { Table } from "@mantine/core";

export function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Table highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Project Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Created At</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {projects.map((project) => (
          <Table.Tr key={project.project_id}>
            <Table.Td>{project.project_name}</Table.Td>
            <Table.Td>{project.project_description}</Table.Td>
            <Table.Td>
              {new Date(project.created_at).toLocaleDateString()}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
