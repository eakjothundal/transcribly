import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { supabase } from "./utils/supabase";
import { Session } from "@supabase/supabase-js";

import { Login } from "./components/Auth/Login";
import { Home } from "./components/Home";

import { useEffect, useState } from "react";

function App() {
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

    // Cleanup the subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <MantineProvider>
      <Router>
        <Routes>
          {/* Public Route: Login */}
          <Route
            path="/login"
            element={!session ? <Login /> : <Navigate to="/" replace />}
          />
          {/* Protected Route: Home */}
          <Route
            path="/"
            element={session ? <Home /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
