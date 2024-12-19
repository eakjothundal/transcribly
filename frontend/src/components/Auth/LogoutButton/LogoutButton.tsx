// LogoutButton.tsx
import { Button } from "@mantine/core";
import { supabase } from "../../../utils/supabase";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Button color="red" onClick={handleLogout}>
      Logout
    </Button>
  );
}
