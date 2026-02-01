import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorefrontFeedbacksState } from "../types";

const initialState: StorefrontFeedbacksState = {
  items: [],
  loading: false,
};

export const feedbackSlice = createSlice({
  name: "storefront/feedbacks",
  initialState,
  reducers: {
    setFeedbackSlice(state, action: PayloadAction<Partial<StorefrontFeedbacksState>>) {
      Object.assign(state, action.payload);
    },
    fetchStoreFeedbacks(state) {
      state.loading = true;
    },
  },
});

export const {
  setFeedbackSlice,
  fetchStoreFeedbacks,
} = feedbackSlice.actions;

export const feedbackReducer = feedbackSlice.reducer;
