import { Box } from "@mantine/core";
import Markdown from "react-markdown";

interface MarkdownViewerProps {
  text?: string; // TODO: make required
}

export function MarkdownViewer(props: MarkdownViewerProps) {
  const { text } = props;
  return (
    <Box>
      <Markdown>{text || "MarkdownViewer"}</Markdown>
    </Box>
  );
}
