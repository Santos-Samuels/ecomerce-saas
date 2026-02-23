import { IProduct, IProductColor } from "@ecomerce/shared";

export interface ProductsState {
  items: IProduct[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface SaveProductPayload {
  id?: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  stock: number;
  infiniteStock?: boolean;
  sku: string;
  images: string[];
  categoryId: string;
  materialId?: string;
  featured?: boolean;
  active: boolean;
  compatibleVehicleIds?: string[];
  colors?: IProductColor[];
  onSuccess?: () => void;
}

export interface DeleteProductPayload {
  id: string;
  storeId: string;
}
