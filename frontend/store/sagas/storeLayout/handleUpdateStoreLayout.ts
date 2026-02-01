import { api } from '@/lib/api';
import { IStoreLayout } from '@ecomerce/shared';
import { notifications } from '@mantine/notifications';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  setStoreLayoutSlice,
} from '../../storeLayout/storeLayoutSlice';

export function* handleUpdateStoreLayout(action: PayloadAction<Partial<IStoreLayout> & { storeId: string }>) {
  try {
    yield put(setStoreLayoutSlice({ loading: true, error: null }));
    const { storeId, ...data } = action.payload;
    const response: AxiosResponse<IStoreLayout> = yield call(api.patch, `/store-layout?storeId=${storeId}`, data);
    
    yield put(setStoreLayoutSlice({ data: response.data, loading: false }));
    notifications.show({
      title: 'Sucesso',
      message: 'Layout da loja atualizado com sucesso!',
      color: 'green',
    });
  } catch (error) {
    const message = (error as AxiosError).message || 'Failed to update store layout';
    yield put(setStoreLayoutSlice({ error: message, loading: false }));
    notifications.show({
      title: 'Erro',
      message: 'Falha ao atualizar layout da loja',
      color: 'red',
    });
  }
}
