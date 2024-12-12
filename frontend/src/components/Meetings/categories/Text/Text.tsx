import { Box, Text as MantineText } from "@mantine/core";

import { TextCategoryProps } from "../CategoryTypes";

export function Text(props: TextCategoryProps) {
  const { content, title } = props;

  return (
    <Box>
      <MantineText>
        <h2>{title}</h2>
      </MantineText>

      <MantineText>{content}</MantineText>
    </Box>
  );
}
