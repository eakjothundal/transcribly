import { Box, Text as MantineText } from "@mantine/core";

import { TextCategoryProps } from "../CategoryTypes";

export function Text(props: TextCategoryProps) {
  const { content, title } = props;

  return (
    <Box>
      <MantineText>
        <h3>{title}</h3>
      </MantineText>

      <MantineText>{content}</MantineText>
    </Box>
  );
}
