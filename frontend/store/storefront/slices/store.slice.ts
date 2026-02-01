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
    setStoreSlice(state, action: PayloadAction<Partial<StorefrontStoreState>>) {
      Object.assign(state, action.payload);
    },
    fetchCurrentStore(state) {
      state.loading = true;
    },
  },
});

export const {
  setStoreSlice,
  fetchCurrentStore,
} = storeSlice.actions;

export const storeReducer = storeSlice.reducer;
