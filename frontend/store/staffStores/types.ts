import { StaffStoreRow } from "@/components/staff/stores/StoresTable";
import { IStore } from "@ecomerce/shared";

export interface StaffStoresState {
  items: StaffStoreRow[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
  current: IStore | null;
  currentLoading: boolean;
}

export interface SaveStaffStorePayload {
  id?: string;
  name: string;
  description?: string;
  address?: string;
  phone: string;
  email: string;
  primaryColor?: string;
  instagramHandle?: string;
  subdomain?: string;
  permissions?: string[];
}

export interface DeleteStaffStorePayload {
  id: string;
}

export interface FetchStaffStoreDetailsPayload {
  id: string;
}

export interface ActivateStaffStorePayload {
  id: string;
}
