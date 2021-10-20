import { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { AuthUserType, SignInType, SignOutType } from "../../../types";

export const useSession = (authToken: string | null) => {
  const [token, setToken] = useState<string | null>(authToken);
  //   const [authUser, setAuthUser] = useState<AuthUserType>({});

  useEffect(() => {
    setToken(authToken);
  }, [authToken]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<Boolean> => {
      const response = await axios.post<SignInType>("/api/auth/signin", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        Cookies.set("authToken", response.data.token);
        setToken(response.data.token);
        // setAuthUser(response.data.user);
      }
      return true;
    },
    []
  );

  const signOut = useCallback(async (): Promise<Boolean> => {
    await axios.post<SignOutType>("/api/auth/signout");
    setToken(null);
    // setAuthUser({});
    return true;
  }, []);

  return {
    signIn,
    signOut,
    isAuthenticated: !!authToken,
    loading: false,
    token,
    authUser: {},
  };
};
