import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteGalleryPayload,
  FetchGalleryPayload,
  GalleryState,
  SaveGalleryBatchPayload,
} from "./types";

const initialState: GalleryState = {
  items: [],
  loading: false,
  uploading: false,
  deletingId: undefined,
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    fetchGallery: (_state, _action: PayloadAction<FetchGalleryPayload>) => {},
    saveGalleryBatch: (
      _state,
      _action: PayloadAction<SaveGalleryBatchPayload>,
    ) => {},
    deleteGallery: (_state, _action: PayloadAction<DeleteGalleryPayload>) => {},
    setGallerySlice: (
      state,
      action: PayloadAction<Partial<GalleryState>>,
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  fetchGallery,
  saveGalleryBatch,
  deleteGallery,
  setGallerySlice,
} = gallerySlice.actions;

export const galleryReducer = gallerySlice.reducer;
