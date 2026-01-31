import { IStore } from "@ecomerce/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorefrontStoreState } from "../types";

const initialState: StorefrontStoreState = {
  data: null,
  loading: false,
  notFound: false,
};

export const storeSlice = createSlice({
  name: "storefront/store",
  initialState,
  reducers: {
    fetchCurrentStore(state) {
      state.loading = true;
      state.notFound = false;
    },
    fetchCurrentStoreSuccess(state, action: PayloadAction<IStore>) {
      state.data = action.payload;
      state.loading = false;
      state.notFound = false;
    },
    fetchCurrentStoreFailure(state, action: PayloadAction<boolean>) {
      state.loading = false;
      state.notFound = action.payload;
    },
  },
});

export const {
  fetchCurrentStore,
  fetchCurrentStoreSuccess,
  fetchCurrentStoreFailure,
} = storeSlice.actions;

export const storeReducer = storeSlice.reducer;
