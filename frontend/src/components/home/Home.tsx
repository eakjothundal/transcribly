import { UploadArea } from "./UploadArea";
import { MarkdownViewer } from "./MarkdownViewer";
import { AddProject } from "../Projects";
import { AddTemplate } from "../Templates";

import classes from "./Home.module.css";

import { Stack } from "@mantine/core";
import { useState } from "react";

export function Home() {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <Stack align="center" className={classes.home}>
      <AddProject />
      <AddTemplate />
      <UploadArea setSummary={setSummary} />
      <MarkdownViewer summary={summary} />
    </Stack>
  );
}
