import { IProductMaterial } from "@ecomerce/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MaterialState {
  items: IProductMaterial[];
  loading: boolean;
  error: string | null;
}

const initialState: MaterialState = {
  items: [],
  loading: false,
  error: null,
};

const materialSlice = createSlice({
  name: "storefront/material",
  initialState,
  reducers: {
    setMaterialSlice(state, action: PayloadAction<Partial<MaterialState>>) {
      Object.assign(state, action.payload);
    },
    fetchPublicMaterials(state) {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setMaterialSlice, fetchPublicMaterials } = materialSlice.actions;
export const materialReducer = materialSlice.reducer;
