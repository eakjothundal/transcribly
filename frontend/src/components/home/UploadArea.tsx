import { Box, Flex, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import classes from "./Home.module.css";

export function UploadArea() {
  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3055/api/summarize", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <Box className={classes.uploadArea}>
      <Dropzone
        onDrop={(files) => uploadFile(files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxFiles={1}
        maxSize={50 * 1024 ** 2}
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
