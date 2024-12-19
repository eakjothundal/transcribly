import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "./utils/supabase";
import { Session } from "@supabase/supabase-js";

import { Login } from "./pages/Login";
import { Projects } from "./pages/Projects";
import { Templates } from "./pages/Templates";
import { Meetings } from "./pages/Meetings";
import { useNavigate } from "react-router-dom";

function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // Get the current session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session || null);
    });

    // Subscribe to session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <MantineProvider>
      <Router>
        <AppRoutes session={session} />
      </Router>
    </MantineProvider>
  );
}

function AppRoutes({ session }: { session: Session | null | undefined }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (session === undefined) {
      // Still loading session, do nothing
      return;
    }

    // Redirect only on initial load or login
    if (
      (session && location.pathname === "/login") ||
      location.pathname === "/"
    ) {
      navigate("/meetings");
    } else if (!session && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [session, navigate, location.pathname]);

  return (
    <Routes>
      {/* Unprotected Route - Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      {session && (
        <>
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/templates" element={<Templates />} />

          {/* Default protected route */}
          <Route path="/" element={<Meetings />} />
        </>
      )}

      {!session && <Route path="/" element={<Login />} />}

      <Route path="*" element={<div>404: Page Not Found</div>} />
    </Routes>
  );
}

export default App;
