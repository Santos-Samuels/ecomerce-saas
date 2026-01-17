import { IProductMaterial } from "@ecomerce/shared";

export interface ProductMaterialsState {
  items: IProductMaterial[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface SaveMaterialPayload {
  id?: string;
  storeId: string;
  name: string;
  description?: string;
  colorName: string;
  colorHex: string;
  active: boolean;
}

export interface DeleteMaterialPayload {
  id: string;
  storeId: string;
}
