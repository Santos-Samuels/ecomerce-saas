import { IProductCategory } from "@ecomerce/shared";

export interface ProductCategoriesState {
  items: IProductCategory[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface SaveCategoryPayload {
  id?: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
}

export interface DeleteCategoryPayload {
  id: string;
}

