import { Box, Button } from "@mantine/core";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./Page.module.css";

interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="page-container">
      <Box className={classes.nav}>
        {/* Use onClick to navigate to the desired routes */}
        <Button
          onClick={() => navigate("/")}
          variant={location.pathname === "/" ? "filled" : "outline"}
        >
          Meetings
        </Button>
        <Button
          onClick={() => navigate("/projects")}
          variant={location.pathname === "/projects" ? "filled" : "outline"}
        >
          Projects
        </Button>
        <Button
          onClick={() => navigate("/templates")}
          variant={location.pathname === "/templates" ? "filled" : "outline"}
        >
          Templates
        </Button>
      </Box>
      <main className="page-content">{children}</main>
    </div>
  );
}
