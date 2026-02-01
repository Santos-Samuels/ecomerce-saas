import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorefrontLayoutState } from "../types";

const initialState: StorefrontLayoutState = {
  data: null,
  loading: false,
};

export const layoutSlice = createSlice({
  name: "storefront/layout",
  initialState,
  reducers: {
    setLayoutSlice(state, action: PayloadAction<Partial<StorefrontLayoutState>>) {
      Object.assign(state, action.payload);
    },
    fetchStoreLayout(state) {
      state.loading = true;
    },
  },
});

export const {
  setLayoutSlice,
  fetchStoreLayout,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
