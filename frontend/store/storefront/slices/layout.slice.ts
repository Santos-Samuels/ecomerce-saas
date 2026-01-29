import { IStoreLayout } from "@ecomerce/shared";
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
    fetchStoreLayout(state) {
      state.loading = true;
    },
    fetchStoreLayoutSuccess(state, action: PayloadAction<IStoreLayout>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchStoreLayoutFailure(state) {
      state.loading = false;
    },
  },
});

export const {
  fetchStoreLayout,
  fetchStoreLayoutSuccess,
  fetchStoreLayoutFailure,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
