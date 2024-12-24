import { Box, Flex, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import classes from "./Home.module.css";

interface UploadAreaProps {
  uploadedFile: File | null;
  setUploadedFile: (file: File) => void;
}

export function UploadArea(props: UploadAreaProps) {
  const { uploadedFile, setUploadedFile } = props;

  return (
    <Box>
      <Dropzone
        onDrop={(files) => setUploadedFile(files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxFiles={1}
        maxSize={50 * 1024 ** 2}
        className={`${classes.dropzone} ${
          uploadedFile ? classes.dropzoneFileSelected : ""
        }`}
        radius="md"
      >
        <Flex
          justify="center"
          align="center"
          className={`${classes.dropzoneContent}`}
        >
          {uploadedFile ? (
            <Text>
              <Flex
                align="center"
                direction="column"
                justify="center"
                gap="md"
                className={classes.uploadedFile}
              >
                <Flex align="center" direction="column">
                  <h3>{`File selected:`}</h3>
                  <h3>{uploadedFile.name}</h3>
                </Flex>
                <h5>Drop another file to replace it.</h5>
              </Flex>
            </Text>
          ) : (
            <Text>
              <h3>Drop an audio file</h3>
            </Text>
          )}
        </Flex>
      </Dropzone>
    </Box>
  );
}
