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

import { Login } from "./pages/Login";

import { useEffect, useState } from "react";
import { Projects } from "./pages/Projects";
import { Templates } from "./pages/Templates";
import { Meetings } from "./pages/Meetings";

function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // Get the current session from Supabase and set it in state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session || null); // Ensure null is used when no session exists
    });

    // Subscribe to authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session || null);
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
            element={!session ? <Login /> : <Navigate to="/meetings" replace />}
          />

          {/* Protected Route: Meetings */}
          <Route
            path="/meetings"
            element={session ? <Meetings /> : <Navigate to="/login" replace />}
          />

          {/* Protected Route: Projects */}
          <Route
            path="/projects"
            element={session ? <Projects /> : <Navigate to="/login" replace />}
          />

          {/* Protected Route: Templates */}
          <Route
            path="/templates"
            element={session ? <Templates /> : <Navigate to="/login" replace />}
          />

          {/* Redirect root `/` only if `location.pathname === '/'` */}
          {location.pathname === "/" && (
            <Route path="/" element={<Navigate to="/meetings" replace />} />
          )}

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/meetings" replace />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
