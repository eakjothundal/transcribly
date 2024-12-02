import { Stack } from "@mantine/core";

import classes from "./Home.module.css";

import { AddTemplate } from "../Templates";
import { NewMeeting } from "../Meetings";
import { LogoutButton } from "../Auth/LogoutButton/LogoutButton";
import { Page } from "../ui/Page";

export function Home() {
  return (
    <Page>
      <Stack align="center" className={classes.home}>
        <AddTemplate />
        <NewMeeting />

        <LogoutButton />
      </Stack>
    </Page>
  );
}
