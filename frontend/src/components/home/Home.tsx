import { UploadArea } from "./UploadArea";
import { MarkdownViewer } from "./MarkdownViewer";
import { AddProject } from "../Projects";
import { AddTemplate } from "../Templates";
import { NewMeeting } from "../Meetings";

import classes from "./Home.module.css";

import { Stack } from "@mantine/core";
import { useState } from "react";
import { LogoutButton } from "../Auth/LogoutButton/LogoutButton";

export function Home() {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <Stack align="center" className={classes.home}>
      <AddProject />
      <AddTemplate />
      <NewMeeting />
      <UploadArea setSummary={setSummary} />
      <MarkdownViewer summary={summary} />
      <LogoutButton />
    </Stack>
  );
}
