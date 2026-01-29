import { IProductCategory } from "@ecomerce/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorefrontCategoriesState } from "../types";

const initialState: StorefrontCategoriesState = {
  items: [],
  loading: false,
};

export const categorySlice = createSlice({
  name: "storefront/categories",
  initialState,
  reducers: {
    fetchPublicCategories(state) {
      state.loading = true;
    },
    fetchPublicCategoriesSuccess(state, action: PayloadAction<IProductCategory[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchPublicCategoriesFailure(state) {
      state.loading = false;
    },
  },
});

export const {
  fetchPublicCategories,
  fetchPublicCategoriesSuccess,
  fetchPublicCategoriesFailure,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
