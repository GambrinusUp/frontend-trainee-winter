export interface AuthStoreState {
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
