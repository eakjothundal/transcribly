import { Box, Flex, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import classes from "./Home.module.css";

interface UploadAreaProps {
  setUploadedFile: (file: File) => void;
}

export function UploadArea(props: UploadAreaProps) {
  const { setUploadedFile } = props;

  return (
    <Box>
      <Dropzone
        onDrop={(files) => setUploadedFile(files[0])}
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
