import { IUser } from "@ecomerce/shared";

export interface StaffUsersState {
  items: IUser[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface SaveStaffUserPayload {
  id?: string;
  storeId: string;
  roleId: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  address?: string;
  active: boolean;
}

export interface DeleteStaffUserPayload {
  id: string;
}
