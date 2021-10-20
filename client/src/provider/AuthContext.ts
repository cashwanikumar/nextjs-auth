import { createContext } from "react";
import { AuthUserType } from "../../../types";

type AuthExtension = {
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<Boolean>;
  loading: boolean;
  isAuthenticated: boolean;
  authUser: AuthUserType;
  token: string | null;
};

export const AuthContext = createContext<AuthExtension | undefined>(undefined);
