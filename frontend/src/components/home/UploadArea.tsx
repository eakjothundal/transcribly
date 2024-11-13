import { Box, Flex, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import classes from "./Home.module.css";
import { useState } from "react";

interface UploadAreaProps {
  setSummary: (summary: string) => void;
  disabled?: boolean;
}

export function UploadArea(props: UploadAreaProps) {
  const { setSummary, disabled } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: File, template: string) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    console.log("starting");

    const response = await fetch(
      `http://localhost:3055/api/summarize?template=${template}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .finally(() => setLoading(false));

    setSummary(response.summary);
  };

  return (
    <Box>
      <Dropzone
        onDrop={(files) => uploadFile(files[0], "meeting")}
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
