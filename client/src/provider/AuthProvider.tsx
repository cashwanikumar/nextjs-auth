import { useContext } from "react";
import { useSession } from "../hooks/useSession";

import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider Provider missing");
  }
  return context;
};

interface AuthProviderProps {
  token: string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children, token } = props;

  return (
    <AuthContext.Provider
      value={{
        ...useSession(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
