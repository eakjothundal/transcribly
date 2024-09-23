import { UploadArea } from "./UploadArea";
import { MarkdownViewer } from "./MarkdownViewer";

import { Box } from "@mantine/core";

export function Home() {
  return (
    <Box>
      <UploadArea />
      <MarkdownViewer />
    </Box>
  );
}
