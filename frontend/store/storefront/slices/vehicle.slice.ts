import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorefrontVehiclesState } from "../types";

const initialState: StorefrontVehiclesState = {
  items: [],
  loading: false,
};

export const vehicleSlice = createSlice({
  name: "storefront/vehicles",
  initialState,
  reducers: {
    setVehicleSlice(state, action: PayloadAction<Partial<StorefrontVehiclesState>>) {
      Object.assign(state, action.payload);
    },
    fetchPublicVehicles(state) {
      state.loading = true;
    },
  },
});

export const {
  setVehicleSlice,
  fetchPublicVehicles,
} = vehicleSlice.actions;

export const vehicleReducer = vehicleSlice.reducer;
