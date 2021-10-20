import React from "react";
import { useAuth } from "../client/src/provider/AuthProvider";
import { withAuth } from "../client/src/withAuth";

function Main() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <div>
      main<button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default withAuth(Main);
