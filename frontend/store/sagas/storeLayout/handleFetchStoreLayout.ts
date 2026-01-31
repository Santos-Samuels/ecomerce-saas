import { api } from '@/lib/api';
import { IStoreLayout } from '@ecomerce/shared';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import {
    fetchStoreLayoutFailure,
    fetchStoreLayoutSuccess,
} from '../../storeLayout/storeLayoutSlice';

export function* handleFetchStoreLayout(action: PayloadAction<{ storeId?: string } | undefined>) {
  try {
    const { storeId } = action.payload || {};
    // If storeId is not provided, we might need to get it from state or context, 
    // but typically we pass it. For now, let's assume it's passed or handled by the backend user context if applicable.
    // Ideally we should pass storeId.
    
    // However, looking at other sagas, we usually rely on the backend to know the user's store or we pass it.
    // Let's assume we pass it.
    
    const response: AxiosResponse<IStoreLayout> = yield call(api.get, `/store-layout?storeId=${storeId}`);
    yield put(fetchStoreLayoutSuccess(response.data));
  } catch (error) {
    const message = (error as AxiosError).message || 'Failed to fetch store layout';
    yield put(fetchStoreLayoutFailure(message));
  }
}
