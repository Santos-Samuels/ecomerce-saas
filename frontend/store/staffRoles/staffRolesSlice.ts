import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteStaffRolePayload,
  SaveStaffRolePayload,
  StaffRolesState,
} from "./types";

const initialState: StaffRolesState = {
  items: [],
  loading: false,
  saving: false,
  deletingId: undefined,
};

const staffRolesSlice = createSlice({
  name: "staffRoles",
  initialState,
  reducers: {
    setStaffRolesSlice(
      state,
      action: PayloadAction<Partial<StaffRolesState>>,
    ) {
      Object.assign(state, action.payload);
    },
    fetchStaffRoles: (state) => {
      state.loading = true;
    },
    saveStaffRole: (_state, _action: PayloadAction<SaveStaffRolePayload>) => {},
    deleteStaffRole: (_state, _action: PayloadAction<DeleteStaffRolePayload>) =>
      {},
  },
});

export const {
  setStaffRolesSlice,
  fetchStaffRoles,
  saveStaffRole,
  deleteStaffRole,
} = staffRolesSlice.actions;

export const staffRolesReducer = staffRolesSlice.reducer;

