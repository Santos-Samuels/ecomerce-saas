import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStoreLayout } from '@ecomerce/shared';
import { StoreLayoutState } from './types';

const initialState: StoreLayoutState = {
  data: null,
  loading: false,
  error: null,
};

const storeLayoutSlice = createSlice({
  name: 'storeLayout',
  initialState,
  reducers: {
    fetchStoreLayoutRequest: (state, action: PayloadAction<{ storeId?: string } | undefined>) => {
      state.loading = true;
      state.error = null;
    },
    fetchStoreLayoutSuccess: (state, action: PayloadAction<IStoreLayout>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStoreLayoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStoreLayoutRequest: (state, action: PayloadAction<Partial<IStoreLayout>>) => {
      state.loading = true;
      state.error = null;
    },
    updateStoreLayoutSuccess: (state, action: PayloadAction<IStoreLayout>) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateStoreLayoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStoreLayoutRequest,
  fetchStoreLayoutSuccess,
  fetchStoreLayoutFailure,
  updateStoreLayoutRequest,
  updateStoreLayoutSuccess,
  updateStoreLayoutFailure,
} = storeLayoutSlice.actions;

export default storeLayoutSlice.reducer;
