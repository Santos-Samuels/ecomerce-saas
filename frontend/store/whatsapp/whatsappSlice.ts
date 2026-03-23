import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WhatsAppMessagePayload, WhatsAppState } from "./types";

const initialState: WhatsAppState = {
  loading: false,
  success: false,
  error: null,
};

const whatsappSlice = createSlice({
  name: "whatsapp",
  initialState,
  reducers: {
    setWhatsAppSlice(state, action: PayloadAction<Partial<WhatsAppState>>) {
      Object.assign(state, action.payload);
    },
    sendWhatsAppMessage(
      _state,
      _action: PayloadAction<WhatsAppMessagePayload>
    ) {},
    resetWhatsAppState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const { setWhatsAppSlice, sendWhatsAppMessage, resetWhatsAppState } =
  whatsappSlice.actions;

export const whatsappReducer = whatsappSlice.reducer;
