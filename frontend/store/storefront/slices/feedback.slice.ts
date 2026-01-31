import { IStoreFeedback } from "@ecomerce/shared";
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
    fetchStoreFeedbacks(state) {
      state.loading = true;
    },
    fetchStoreFeedbacksSuccess(state, action: PayloadAction<IStoreFeedback[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchStoreFeedbacksFailure(state) {
      state.loading = false;
    },
  },
});

export const {
  fetchStoreFeedbacks,
  fetchStoreFeedbacksSuccess,
  fetchStoreFeedbacksFailure,
} = feedbackSlice.actions;

export const feedbackReducer = feedbackSlice.reducer;
