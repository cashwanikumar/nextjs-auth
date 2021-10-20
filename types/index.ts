export interface AuthUserType {
  [key: string]: string | number;
}

export interface SignInType {
  token: string;
  user: AuthUserType;
  success?: boolean;
}

export interface SignOutType {
  success: boolean;
}

export interface ProximityAuthOption {
  path?: {
    redirectOnLogin?: string;
    redirectOnLogout?: string;
  };
}
