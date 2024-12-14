import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        {/* Public Route: Login */}
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          {session && (
            <>
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/templates" element={<Templates />} />
            </>
          )}

          {/* Default Route */}
          <Route path="/" element={session ? <Meetings /> : <Login />} />

          {/* Catch-All for 404 */}
          <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
