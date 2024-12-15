import { Box, Text } from "@mantine/core";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../utils/supabase";
import classes from "./Login.module.css";

export function Login() {
  return (
    <Box className={classes.loginWrapper}>
      <Box className={classes.loginContainer}>
        <Box className={classes.loginContent}>
          <Box className={classes.loginHeader}>
            <Text>
              <h1 className={classes.loginTitle}>Sign In</h1>
            </Text>
          </Box>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
            }}
            providers={[]}
            showLinks={false}
            redirectTo="/meetings"
          />
        </Box>
      </Box>
    </Box>
  );
}
