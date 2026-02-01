import { takeLatest } from 'redux-saga/effects';
import {
  fetchStoreLayout,
  updateStoreLayout,
} from '../../storeLayout/storeLayoutSlice';
import { handleFetchStoreLayout } from './handleFetchStoreLayout';
import { handleUpdateStoreLayout } from './handleUpdateStoreLayout';

export function* watchStoreLayout() {
  yield takeLatest(fetchStoreLayout.type, handleFetchStoreLayout);
  yield takeLatest(updateStoreLayout.type, handleUpdateStoreLayout);
}
