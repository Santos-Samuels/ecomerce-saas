import { IProduct, IProductCategory, IStore, IStoreFeedback, IStoreLayout, IVehicle } from "@ecomerce/shared";

export interface FilterProductDto {
  categoryId?: string;
  vehicleId?: string;
  search?: string;
  featured?: boolean;
}

export interface StorefrontStoreState {
  data: IStore | null;
  loading: boolean;
  notFound: boolean;
}

export interface StorefrontLayoutState {
  data: IStoreLayout | null;
  loading: boolean;
}

export interface StorefrontFeedbacksState {
  items: IStoreFeedback[];
  loading: boolean;
}

export interface StorefrontProductsState {
  items: IProduct[];
  currentProduct: IProduct | null;
  loading: boolean;
  notFound: boolean;
}

export interface StorefrontCategoriesState {
  items: IProductCategory[];
  loading: boolean;
}

export interface StorefrontVehiclesState {
  items: IVehicle[];
  loading: boolean;
}

export interface StorefrontState {
  store: StorefrontStoreState;
  layout: StorefrontLayoutState;
  feedbacks: StorefrontFeedbacksState;
  products: StorefrontProductsState;
  categories: StorefrontCategoriesState;
  vehicles: StorefrontVehiclesState;
}
