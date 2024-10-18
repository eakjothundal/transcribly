import { useState, useEffect } from "react";

import { supabase } from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Box } from "@mantine/core";

import { Home } from "../Home";

import classes from "./Login.module.css";

export function Login() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <Box className={classes.container}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </Box>
    );
  } else {
    return <Home />;
  }
}
