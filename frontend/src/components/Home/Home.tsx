import { Stack } from "@mantine/core";

import classes from "./Home.module.css";

import { NewMeeting } from "../Meetings";
import { Page } from "../ui/Page";

export function Home() {
  return (
    <Page>
      <Stack align="center" className={classes.home}>
        <NewMeeting />
      </Stack>
    </Page>
  );
}
