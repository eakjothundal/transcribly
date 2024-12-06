import { Box, Text } from "@mantine/core";

import { SummaryProps } from "./SummaryTypes";

export function Summary(props: SummaryProps) {
  const { summaryItems } = props;

  return (
    <Box>
      <Text>
        <h3>Summary</h3>
      </Text>

      <Text>
        <ul>
          <Box>
            {summaryItems?.map((summaryItem, index) => {
              return <li key={index}>{summaryItem}</li>;
            })}
          </Box>
        </ul>
      </Text>
    </Box>
  );
}
