import { Box, Button } from "@mantine/core";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./Page.module.css";
import { LogoutButton } from "../../Auth/LogoutButton/LogoutButton";

interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={classes.pageContainer}>
      <Box className={classes.sidebarContainer}>
        <Box className={classes.nav}>
          {/* Use onClick to navigate to the desired routes */}
          <Button
            onClick={() => navigate("/")}
            variant={location.pathname === "/" ? "gradient" : "outline"}
            gradient={{ from: "blue", to: "violet", deg: 202 }}
            size="sm"
            radius="md"
          >
            Meetings
          </Button>
          <Button
            onClick={() => navigate("/projects")}
            variant={location.pathname === "/projects" ? "gradient" : "outline"}
            gradient={{ from: "blue", to: "violet", deg: 202 }}
            size="sm"
            radius="md"
          >
            Projects
          </Button>
          <Button
            onClick={() => navigate("/templates")}
            variant={
              location.pathname === "/templates" ? "gradient" : "outline"
            }
            gradient={{ from: "blue", to: "violet", deg: 202 }}
            size="sm"
            radius="md"
          >
            Templates
          </Button>
        </Box>

        <Box>
          <LogoutButton />
        </Box>
      </Box>
      <main className={classes.pageContent}>{children}</main>
    </Box>
  );
}
