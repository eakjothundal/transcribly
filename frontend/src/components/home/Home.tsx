import { UploadArea } from "./UploadArea";
import { MarkdownViewer } from "./MarkdownViewer";

import { Stack } from "@mantine/core";
import { useState } from "react";

export function Home() {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <Stack align="center" my="xl">
      <UploadArea setSummary={setSummary} />
      <MarkdownViewer summary={summary} />
    </Stack>
  );
}
