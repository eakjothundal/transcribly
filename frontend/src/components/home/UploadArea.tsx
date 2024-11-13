import { Box, Flex, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import classes from "./Home.module.css";
import { useState } from "react";
import { Meeting } from "../../interfaces/meetings/meetings";

import { summarizeAndTranscribe } from "../../utils/summarize";

interface UploadAreaProps {
  setSummary: (summary: Partial<Meeting>) => void;
  setTranscript: (transcript: string) => void;
  templateID?: string;
  disabled?: boolean;
}

export function UploadArea(props: UploadAreaProps) {
  const { setSummary, setTranscript, templateID, disabled } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    if (!templateID) {
      console.error("No template ID provided");
      return;
    }

    setLoading(true);

    const response = await summarizeAndTranscribe(file, templateID);

    if (!response) {
      console.error("No response from summarizeAndTranscribe");
      return;
    }

    setTranscript(response.transcript);
    if (response.summary) {
      setSummary(JSON.parse(response.summary));
    } else {
      console.error("Summary is null");
    }

    setLoading(false);
  };

  return (
    <Box>
      <Dropzone
        onDrop={(files) => uploadFile(files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxFiles={1}
        maxSize={50 * 1024 ** 2}
        loading={loading}
        disabled={disabled}
        className={disabled ? classes.dropzoneDisabled : ""}
      >
        <Flex
          justify="center"
          align="center"
          className={classes.dropzoneContent}
        >
          <Text>
            <h3>Drop an audio file</h3>
          </Text>
        </Flex>
      </Dropzone>
    </Box>
  );
}
