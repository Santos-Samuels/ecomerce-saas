import { IStoreFeedback } from "@ecomerce/shared";

export interface StoreFeedbacksState {
  items: IStoreFeedback[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface FetchStoreFeedbacksPayload {
  storeId: string;
}

export interface SaveStoreFeedbackPayload {
  id?: string;
  storeId: string;
  customerName: string;
  comment: string;
  stars?: number;
  active?: boolean;
  onSuccess?: () => void;
}

export interface DeleteStoreFeedbackPayload {
  id: string;
  storeId: string;
}
