import { Stack } from "@mantine/core";

import classes from "./Home.module.css";

import { AddProject } from "../Projects";
import { AddTemplate } from "../Templates";
import { NewMeeting } from "../Meetings";
import { LogoutButton } from "../Auth/LogoutButton/LogoutButton";
import { Page } from "../ui/Page";

export function Home() {
  return (
    <Page>
      <Stack align="center" className={classes.home}>
        <AddProject />
        <AddTemplate />
        <NewMeeting />

        <LogoutButton />
      </Stack>
    </Page>
  );
}
