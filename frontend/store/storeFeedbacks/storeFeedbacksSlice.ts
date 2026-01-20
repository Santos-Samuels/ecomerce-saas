import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  StoreFeedbacksState,
  FetchStoreFeedbacksPayload,
  SaveStoreFeedbackPayload,
  DeleteStoreFeedbackPayload,
} from "./types";

const initialState: StoreFeedbacksState = {
  items: [],
  loading: false,
  saving: false,
  deletingId: undefined,
};

export const storeFeedbacksSlice = createSlice({
  name: "storeFeedbacks",
  initialState,
  reducers: {
    fetchStoreFeedbacks: (
      state,
      _action: PayloadAction<FetchStoreFeedbacksPayload>
    ) => {
      // Triggered by saga
    },
    saveStoreFeedback: (
      state,
      _action: PayloadAction<SaveStoreFeedbackPayload>
    ) => {
      // Triggered by saga
    },
    deleteStoreFeedback: (
      state,
      _action: PayloadAction<DeleteStoreFeedbackPayload>
    ) => {
      // Triggered by saga
    },
    setStoreFeedbacksSlice: (
      state,
      action: PayloadAction<Partial<StoreFeedbacksState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  fetchStoreFeedbacks,
  saveStoreFeedback,
  deleteStoreFeedback,
  setStoreFeedbacksSlice,
} = storeFeedbacksSlice.actions;

export const storeFeedbacksReducer = storeFeedbacksSlice.reducer;
