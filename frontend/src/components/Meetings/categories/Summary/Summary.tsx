import { Box, Text } from "@mantine/core";

import { CategoryProps } from "../CategoryTypes";

export function Summary(props: CategoryProps) {
  const { items } = props;

  return (
    <Box>
      <Text>
        <h3>Summary</h3>
      </Text>

      <Text>
        <ul>
          <Box>
            {items?.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </Box>
        </ul>
      </Text>
    </Box>
  );
}
