import { api } from '@/lib/api';
import { IStoreLayout } from '@ecomerce/shared';
import { notifications } from '@mantine/notifications';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  updateStoreLayoutFailure,
  updateStoreLayoutSuccess,
} from '../../storeLayout/storeLayoutSlice';

export function* handleUpdateStoreLayout(action: PayloadAction<Partial<IStoreLayout> & { storeId: string }>) {
  try {
    const { storeId, ...data } = action.payload;
    const response: AxiosResponse<IStoreLayout> = yield call(api.patch, `/store-layout?storeId=${storeId}`, data);
    
    yield put(updateStoreLayoutSuccess(response.data));
    notifications.show({
      title: 'Sucesso',
      message: 'Layout da loja atualizado com sucesso!',
      color: 'green',
    });
  } catch (error) {
    const message = (error as AxiosError).message || 'Failed to update store layout';
    yield put(updateStoreLayoutFailure(message));
    notifications.show({
      title: 'Erro',
      message: 'Falha ao atualizar layout da loja',
      color: 'red',
    });
  }
}
