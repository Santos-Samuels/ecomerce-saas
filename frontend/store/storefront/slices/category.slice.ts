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
    setCategorySlice(state, action: PayloadAction<Partial<StorefrontCategoriesState>>) {
      Object.assign(state, action.payload);
    },
    fetchPublicCategories(state) {
      state.loading = true;
    },
  },
});

export const {
  setCategorySlice,
  fetchPublicCategories,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
