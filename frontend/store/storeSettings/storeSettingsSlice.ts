import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FetchStoreSettingsPayload,
  SaveStoreSettingsPayload,
  StoreSettingsState,
} from "./types";

const initialState: StoreSettingsState = {
  store: undefined,
  loading: false,
  saving: false,
};

const storeSettingsSlice = createSlice({
  name: "storeSettings",
  initialState,
  reducers: {
    setStoreSettingsSlice(
      state,
      action: PayloadAction<Partial<StoreSettingsState>>
    ) {
      Object.assign(state, action.payload);
    },
    fetchStoreSettings: (
      _state,
      _action: PayloadAction<FetchStoreSettingsPayload>
    ) => {},
    saveStoreSettings: (
      _state,
      _action: PayloadAction<SaveStoreSettingsPayload>
    ) => {},
  },
});

export const {
  setStoreSettingsSlice,
  fetchStoreSettings,
  saveStoreSettings,
} = storeSettingsSlice.actions;

export const storeSettingsReducer = storeSettingsSlice.reducer;

