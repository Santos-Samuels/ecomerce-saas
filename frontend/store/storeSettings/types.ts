import { IStore } from "@ecomerce/shared";

export interface StoreSettingsState {
  store?: IStore;
  loading: boolean;
  saving: boolean;
}

export interface FetchStoreSettingsPayload {
  storeId: string;
}

export interface SaveStoreSettingsPayload {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone: string;
  email: string;
  logoUrl?: string;
  mapEmbedUrl?: string | null;
  storefrontImageUrl?: string | null;
  primaryColor?: string | null;
  instagramHandle?: string;
}
