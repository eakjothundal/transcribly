import { Box, Text } from "@mantine/core";

import { CategoryProps } from "../CategoryTypes";

export function List(props: CategoryProps) {
  const { items, title } = props;

  return (
    <Box>
      <Text>
        <h3>{title}</h3>
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
