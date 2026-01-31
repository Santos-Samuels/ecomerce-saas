import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteCategoryPayload,
  ProductCategoriesState,
  SaveCategoryPayload,
} from "./types";

const initialState: ProductCategoriesState = {
  items: [],
  loading: false,
  saving: false,
};

const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    setProductCategoriesSlice(
      state,
      action: PayloadAction<Partial<ProductCategoriesState>>
    ) {
      Object.assign(state, action.payload);
    },
    fetchProductCategories: (
      _state,
      _action: PayloadAction<{ storeId: string }>
    ) => {},
    saveProductCategory: (
      _state,
      _action: PayloadAction<SaveCategoryPayload>
    ) => {},
    deleteProductCategory: (
      _state,
      _action: PayloadAction<DeleteCategoryPayload>
    ) => {},
  },
});

export const {
  setProductCategoriesSlice,
  fetchProductCategories,
  saveProductCategory,
  deleteProductCategory,
} = productCategoriesSlice.actions;

export const productCategoriesReducer = productCategoriesSlice.reducer;
