import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorefrontGalleryState } from "../types";

const initialState: StorefrontGalleryState = {
  items: [],
  loading: false,
};

export const storefrontGallerySlice = createSlice({
  name: "storefront/gallery",
  initialState,
  reducers: {
    setStorefrontGallerySlice(
      state,
      action: PayloadAction<Partial<StorefrontGalleryState>>,
    ) {
      Object.assign(state, action.payload);
    },
    fetchPublicGallery(state) {
      state.loading = true;
    },
  },
});

export const { setStorefrontGallerySlice, fetchPublicGallery } =
  storefrontGallerySlice.actions;

export const storefrontGalleryReducer = storefrontGallerySlice.reducer;
