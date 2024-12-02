import { Box, Button } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";

import classes from "./Page.module.css";

interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  const location = useLocation();

  return (
    <div className="page-container">
      <Box className={classes.nav}>
        <Button>Meetings</Button>
        <Button>Projects</Button>
        <Button>Templates</Button>
      </Box>
      <main className="page-content">{children}</main>
    </div>
  );
}
