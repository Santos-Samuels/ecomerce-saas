import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteProductPayload,
  ProductsState,
  SaveProductPayload,
} from "./types";

const initialState: ProductsState = {
  items: [],
  loading: false,
  saving: false,
  deletingId: undefined,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsSlice(state, action: PayloadAction<Partial<ProductsState>>) {
      Object.assign(state, action.payload);
    },
    fetchProducts(_state, _action: PayloadAction<{ storeId: string }>) {},
    saveProduct(_state, _action: PayloadAction<SaveProductPayload>) {},
    deleteProduct(_state, _action: PayloadAction<DeleteProductPayload>) {},
  },
});

export const { setProductsSlice, fetchProducts, saveProduct, deleteProduct } =
  productsSlice.actions;

export const productsReducer = productsSlice.reducer;
