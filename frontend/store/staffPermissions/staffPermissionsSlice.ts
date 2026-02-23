import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteStaffPermissionPayload,
  SaveStaffPermissionPayload,
  StaffPermissionsState,
} from "./types";

const initialState: StaffPermissionsState = {
  items: [],
  loading: false,
  saving: false,
  deletingId: undefined,
};

const staffPermissionsSlice = createSlice({
  name: "staffPermissions",
  initialState,
  reducers: {
    setStaffPermissionsSlice(
      state,
      action: PayloadAction<Partial<StaffPermissionsState>>,
    ) {
      Object.assign(state, action.payload);
    },
    fetchStaffPermissions: (state) => {
      state.loading = true;
    },
    saveStaffPermission: (
      _state,
      _action: PayloadAction<SaveStaffPermissionPayload>,
    ) => {},
    deleteStaffPermission: (
      _state,
      _action: PayloadAction<DeleteStaffPermissionPayload>,
    ) => {},
  },
});

export const {
  setStaffPermissionsSlice,
  fetchStaffPermissions,
  saveStaffPermission,
  deleteStaffPermission,
} = staffPermissionsSlice.actions;

export const staffPermissionsReducer = staffPermissionsSlice.reducer;

