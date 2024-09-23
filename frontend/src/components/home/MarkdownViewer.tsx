import { Box } from "@mantine/core";
import Markdown from "react-markdown";

interface MarkdownViewerProps {
  summary: string | null; // TODO: make required
}

export function MarkdownViewer(props: MarkdownViewerProps) {
  const { summary } = props;
  return (
    <Box>
      <Markdown>{summary || "MarkdownViewer"}</Markdown>
    </Box>
  );
}
