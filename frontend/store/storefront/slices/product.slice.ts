import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterProductDto, StorefrontProductsState } from "../types";

const initialState: StorefrontProductsState = {
  items: [],
  currentProduct: null,
  loading: false,
  notFound: false,
};

export const productSlice = createSlice({
  name: "storefront/products",
  initialState,
  reducers: {
    setProductSlice(state, action: PayloadAction<Partial<StorefrontProductsState>>) {
      Object.assign(state, action.payload);
    },
    fetchPublicProducts(state, _action: PayloadAction<FilterProductDto | undefined>) {
      state.loading = true;
    },
    fetchPublicProductBySlug(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
  },
});

export const {
  setProductSlice,
  fetchPublicProducts,
  fetchPublicProductBySlug,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
