import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteStaffStorePayload,
  FetchStaffStoreDetailsPayload,
  SaveStaffStorePayload,
  StaffStoresState,
  ActivateStaffStorePayload,
} from "./types";

const initialState: StaffStoresState = {
  items: [],
  loading: false,
  saving: false,
  deletingId: undefined,
  current: null,
  currentLoading: false,
};

const staffStoresSlice = createSlice({
  name: "staffStores",
  initialState,
  reducers: {
    setStaffStoresSlice(
      state,
      action: PayloadAction<Partial<StaffStoresState>>,
    ) {
      Object.assign(state, action.payload);
    },
    fetchStaffStores: (state) => {
      state.loading = true;
    },
    saveStaffStore: (_state, _action: PayloadAction<SaveStaffStorePayload>) => {},
    deleteStaffStore: (
      _state,
      _action: PayloadAction<DeleteStaffStorePayload>,
    ) => {},
    fetchStaffStoreDetails: (
      state,
      _action: PayloadAction<FetchStaffStoreDetailsPayload>,
    ) => {
      state.currentLoading = true;
    },
    clearStaffStoreDetails: (state) => {
      state.current = null;
      state.currentLoading = false;
    },
    activateStaffStore: (
      _state,
      _action: PayloadAction<ActivateStaffStorePayload>,
    ) => {},
  },
});

export const {
  setStaffStoresSlice,
  fetchStaffStores,
  saveStaffStore,
  deleteStaffStore,
  fetchStaffStoreDetails,
  clearStaffStoreDetails,
  activateStaffStore,
} = staffStoresSlice.actions;

export const staffStoresReducer = staffStoresSlice.reducer;
