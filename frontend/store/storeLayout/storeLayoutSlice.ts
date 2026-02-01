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
    setStoreLayoutSlice(state, action: PayloadAction<Partial<StoreLayoutState>>) {
      Object.assign(state, action.payload);
    },
    fetchStoreLayout: (_state, _action: PayloadAction<{ storeId?: string } | undefined>) => {
      // Triggered by saga
    },
    updateStoreLayout: (_state, _action: PayloadAction<Partial<IStoreLayout> & { storeId?: string }>) => {
      // Triggered by saga
    },
  },
});

export const {
  setStoreLayoutSlice,
  fetchStoreLayout,
  updateStoreLayout,
} = storeLayoutSlice.actions;

export default storeLayoutSlice.reducer;
