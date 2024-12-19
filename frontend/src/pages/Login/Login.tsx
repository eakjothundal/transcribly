import { useState } from "react";
import { Box, Text } from "@mantine/core";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { supabase } from "../../utils/supabase";

import classes from "./Login.module.css";

export function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <Box className={classes.loginWrapper}>
      <Box className={classes.loginContainer}>
        <Box className={classes.loginContent}>
          <Box className={classes.loginHeader}>
            <Text>
              <h1 className={classes.loginTitle}>Sign In</h1>
            </Text>
          </Box>

          {forgotPassword ? (
            <Box>
              {/* Supabase Auth - Forgot Password Component */}
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                }}
                providers={[]}
                showLinks={false}
                view="forgotten_password"
              />

              {/*  */}
              <Box>
                <Text size="sm">
                  <a
                    className={classes.viewToggleText}
                    onClick={() => setForgotPassword(false)}
                  >
                    Remembered your password? Sign in here.
                  </a>
                </Text>
              </Box>
            </Box>
          ) : (
            <Box>
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                }}
                providers={[]}
                showLinks={false}
                view="sign_in"
              />

              {/* Forgot Password Link */}
              <Box>
                <Text size="sm">
                  <a
                    className={classes.viewToggleText}
                    onClick={() => setForgotPassword(true)}
                  >
                    Forgot your password?
                  </a>
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
