import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  StaffUsersState,
  SaveStaffUserPayload,
  DeleteStaffUserPayload,
} from "./types";

const initialState: StaffUsersState = {
  items: [],
  loading: false,
  saving: false,
};

const staffUsersSlice = createSlice({
  name: "staffUsers",
  initialState,
  reducers: {
    setStaffUsersSlice(
      state,
      action: PayloadAction<Partial<StaffUsersState>>,
    ) {
      Object.assign(state, action.payload);
    },
    fetchStaffUsers: (state) => {
      state.loading = true;
    },
    saveStaffUser: (state, _action: PayloadAction<SaveStaffUserPayload>) => {
      state.saving = true;
    },
    deleteStaffUser: (state, action: PayloadAction<DeleteStaffUserPayload>) => {
      state.deletingId = action.payload.id;
    },
  },
});

export const {
  setStaffUsersSlice,
  fetchStaffUsers,
  saveStaffUser,
  deleteStaffUser,
} = staffUsersSlice.actions;

export const staffUsersReducer = staffUsersSlice.reducer;
