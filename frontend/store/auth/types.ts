import { IUser } from "@ecomerce/shared";

export interface AuthState {
  token: string | null;
  loading: boolean;
  user?: IUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}
