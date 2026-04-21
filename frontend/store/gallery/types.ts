import { IGallery } from "@ecomerce/shared";

export interface GalleryState {
  items: IGallery[];
  loading: boolean;
  uploading: boolean;
  deletingId?: string;
}

export interface FetchGalleryPayload {
  storeId: string;
}

export interface SaveGalleryBatchPayload {
  storeId: string;
  urls: string[];
  onSuccess?: () => void;
}

export interface DeleteGalleryPayload {
  id: string;
  storeId: string;
}
