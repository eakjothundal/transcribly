import { Box } from "@mantine/core";
import Markdown from "react-markdown";

import classes from "./MarkdownViewer.module.css";

interface MarkdownViewerProps {
  summary: string | null;
}

export function MarkdownViewer(props: MarkdownViewerProps) {
  const { summary } = props;
  return (
    <Box className={classes.markdownViewer}>
      {summary && <Markdown>{summary}</Markdown>}
    </Box>
  );
}
