import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteVehiclePayload,
  SaveVehiclePayload,
  VehiclesState,
} from "./types";

const initialState: VehiclesState = {
  items: [],
  loading: false,
  saving: false,
  deletingId: undefined,
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehiclesSlice(state, action: PayloadAction<Partial<VehiclesState>>) {
      Object.assign(state, action.payload);
    },
    fetchVehicles(_state) {},
    saveVehicle(_state, _action: PayloadAction<SaveVehiclePayload>) {},
    deleteVehicle(_state, _action: PayloadAction<DeleteVehiclePayload>) {},
  },
});

export const { setVehiclesSlice, fetchVehicles, saveVehicle, deleteVehicle } =
  vehiclesSlice.actions;

export const vehiclesReducer = vehiclesSlice.reducer;
