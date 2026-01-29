import { IVehicle } from "@ecomerce/shared";
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
    fetchPublicVehicles(state) {
      state.loading = true;
    },
    fetchPublicVehiclesSuccess(state, action: PayloadAction<IVehicle[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchPublicVehiclesFailure(state) {
      state.loading = false;
    },
  },
});

export const {
  fetchPublicVehicles,
  fetchPublicVehiclesSuccess,
  fetchPublicVehiclesFailure,
} = vehicleSlice.actions;

export const vehicleReducer = vehicleSlice.reducer;
