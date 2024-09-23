import { UploadArea } from "./UploadArea";
import { MarkdownViewer } from "./MarkdownViewer";

import { Stack } from "@mantine/core";

export function Home() {
  return (
    <Stack align="center" my="xl">
      <UploadArea />
      <MarkdownViewer />
    </Stack>
  );
}
