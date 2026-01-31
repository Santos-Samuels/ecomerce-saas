import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteMaterialPayload,
  ProductMaterialsState,
  SaveMaterialPayload,
} from "./types";

const initialState: ProductMaterialsState = {
  items: [],
  loading: false,
  saving: false,
};

const productMaterialsSlice = createSlice({
  name: "productMaterials",
  initialState,
  reducers: {
    setProductMaterialsSlice(
      state,
      action: PayloadAction<Partial<ProductMaterialsState>>
    ) {
      Object.assign(state, action.payload);
    },
    fetchProductMaterials: (
      _state,
      _action: PayloadAction<{ storeId: string }>
    ) => {},
    saveProductMaterial: (
      _state,
      _action: PayloadAction<SaveMaterialPayload>
    ) => {},
    deleteProductMaterial: (
      _state,
      _action: PayloadAction<DeleteMaterialPayload>
    ) => {},
  },
});

export const {
  setProductMaterialsSlice,
  fetchProductMaterials,
  saveProductMaterial,
  deleteProductMaterial,
} = productMaterialsSlice.actions;

export const productMaterialsReducer = productMaterialsSlice.reducer;

