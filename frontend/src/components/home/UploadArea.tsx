import { Box, Flex, Text, Select } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import classes from "./Home.module.css";
import { useState } from "react";

interface UploadAreaProps {
  setSummary: (summary: string) => void;
}

const templates = [
  "Daily Huddle",
  "Weekly Pulse",
  "Bi-Weekly Check-In",
  "Culture Chat",
  "Quarterly",
];

export function UploadArea(props: UploadAreaProps) {
  const { setSummary } = props;

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: File, template: string) => {
    if (!templates.includes(template)) {
      console.error("Invalid template, check the logic and try again");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

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
    <Box className={classes.uploadArea}>
      <Box>
        <Select
          label="Choose your meeting type:"
          data={templates}
          defaultValue={"Daily Huddle"}
          onChange={(selectedValue) =>
            selectedValue && setSelectedTemplate(selectedValue)
          }
          searchable
        />
      </Box>

      <Dropzone
        onDrop={(files) => uploadFile(files[0], selectedTemplate)}
        onReject={(files) => console.log("rejected files", files)}
        maxFiles={1}
        maxSize={50 * 1024 ** 2}
        loading={loading}
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
