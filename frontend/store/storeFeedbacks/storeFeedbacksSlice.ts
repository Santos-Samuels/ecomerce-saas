import { IStoreFeedback } from "@ecomerce/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    DeleteStoreFeedbackPayload,
    SaveStoreFeedbackPayload,
    StoreFeedbacksState
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
    fetchStoreFeedbacks: (_state, _action: PayloadAction<{ storeId: string }>) => {},
    fetchStoreFeedbacksSuccess: (
      state,
      action: PayloadAction<IStoreFeedback[]>
    ) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchStoreFeedbacksFailure: (state) => {
      state.loading = false;
    },
    saveStoreFeedback: (_state, _action: PayloadAction<SaveStoreFeedbackPayload>) => {
      // saga
    },
    deleteStoreFeedback: (
      _state,
      _action: PayloadAction<DeleteStoreFeedbackPayload>
    ) => {
      // Triggered by saga
    },
    setStoreFeedbacksSlice: (
      state,
      action: PayloadAction<Partial<StoreFeedbacksState>>
    ) => {
      Object.assign(state, action.payload);
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
