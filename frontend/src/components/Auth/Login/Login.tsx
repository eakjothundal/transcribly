import { supabase } from "../../../utils/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Box } from "@mantine/core";

import classes from "./Login.module.css";

export function Login() {
  return (
    <Box className={classes.container}>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </Box>
  );
}
