import { call, put } from 'redux-saga/effects';
import { api } from '@/lib/api';
import {
  fetchStoreLayoutSuccess,
  fetchStoreLayoutFailure,
} from '../../storeLayout/storeLayoutSlice';

export function* handleFetchStoreLayout(action: any) {
  try {
    const { storeId } = action.payload || {};
    // If storeId is not provided, we might need to get it from state or context, 
    // but typically we pass it. For now, let's assume it's passed or handled by the backend user context if applicable.
    // Ideally we should pass storeId.
    
    // However, looking at other sagas, we usually rely on the backend to know the user's store or we pass it.
    // Let's assume we pass it.
    
    const response = yield call(api.get, `/store-layout?storeId=${storeId}`);
    yield put(fetchStoreLayoutSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStoreLayoutFailure(error.message || 'Failed to fetch store layout'));
  }
}
