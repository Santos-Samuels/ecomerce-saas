import { IProduct } from "@ecomerce/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterProductDto, StorefrontProductsState } from "../types";

const initialState: StorefrontProductsState = {
  items: [],
  loading: false,
};

export const productSlice = createSlice({
  name: "storefront/products",
  initialState,
  reducers: {
    fetchPublicProducts(state, _action: PayloadAction<FilterProductDto | undefined>) {
      state.loading = true;
    },
    fetchPublicProductsSuccess(state, action: PayloadAction<IProduct[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchPublicProductsFailure(state) {
      state.loading = false;
    },
  },
});

export const {
  fetchPublicProducts,
  fetchPublicProductsSuccess,
  fetchPublicProductsFailure,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
