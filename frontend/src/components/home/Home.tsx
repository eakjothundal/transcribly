import { UploadArea } from "./UploadArea";
import { MarkdownViewer } from "./MarkdownViewer";

import classes from "./Home.module.css";

import { Stack } from "@mantine/core";
import { useState } from "react";

export function Home() {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <Stack align="center" className={classes.home}>
      <UploadArea setSummary={setSummary} />
      <MarkdownViewer summary={summary} />
    </Stack>
  );
}
