import { supabase } from "../../../utils/supabase";

import { Button } from "@mantine/core";

export function LogoutButton() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Logged out successfully");
    }
  };

  return (
    <Button color="red" onClick={handleLogout}>
      Logout
    </Button>
  );
}
