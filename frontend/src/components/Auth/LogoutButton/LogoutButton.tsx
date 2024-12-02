// LogoutButton.tsx
import { Button } from "@mantine/core";
import { supabase } from "../../../utils/supabase";

export function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button color="red" onClick={handleLogout}>
      Logout
    </Button>
  );
}
