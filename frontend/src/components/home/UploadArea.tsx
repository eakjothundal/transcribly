import { Box, Flex, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import classes from "./Home.module.css";

export function UploadArea() {
  return (
    <Box className={classes.uploadAreaContainer}>
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
      >
        <Flex justify="center">
          <Text>Drop an audio file</Text>
        </Flex>
      </Dropzone>
    </Box>
  );
}
