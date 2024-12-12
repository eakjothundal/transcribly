import { Box, Text } from "@mantine/core";

import { ListCategoryProps } from "../CategoryTypes";

export function List(props: ListCategoryProps) {
  const { items, title } = props;

  return (
    <Box>
      <Text>
        <h2>{title}</h2>
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
