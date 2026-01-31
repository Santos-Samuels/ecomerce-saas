import { IStoreLayout } from '@ecomerce/shared';

export interface StoreLayoutState {
  data: IStoreLayout | null;
  loading: boolean;
  error: string | null;
}
