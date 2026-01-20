import { takeLatest } from 'redux-saga/effects';
import {
  fetchStoreLayoutRequest,
  updateStoreLayoutRequest,
} from '../../storeLayout/storeLayoutSlice';
import { handleFetchStoreLayout } from './handleFetchStoreLayout';
import { handleUpdateStoreLayout } from './handleUpdateStoreLayout';

export function* storeLayoutSaga() {
  yield takeLatest(fetchStoreLayoutRequest.type, handleFetchStoreLayout);
  yield takeLatest(updateStoreLayoutRequest.type, handleUpdateStoreLayout);
}
