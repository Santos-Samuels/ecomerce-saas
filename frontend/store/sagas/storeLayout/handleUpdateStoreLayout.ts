import { call, put } from 'redux-saga/effects';
import { api } from '@/lib/api';
import { notifications } from '@mantine/notifications';
import {
  updateStoreLayoutSuccess,
  updateStoreLayoutFailure,
} from '../../storeLayout/storeLayoutSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreLayout } from '@ecomerce/shared';

export function* handleUpdateStoreLayout(action: PayloadAction<Partial<IStoreLayout> & { storeId: string }>) {
  try {
    const { storeId, ...data } = action.payload;
    const response = yield call(api.patch, `/store-layout?storeId=${storeId}`, data);
    
    yield put(updateStoreLayoutSuccess(response.data));
    notifications.show({
      title: 'Sucesso',
      message: 'Layout da loja atualizado com sucesso!',
      color: 'green',
    });
  } catch (error: any) {
    yield put(updateStoreLayoutFailure(error.message || 'Failed to update store layout'));
    notifications.show({
      title: 'Erro',
      message: 'Falha ao atualizar layout da loja',
      color: 'red',
    });
  }
}
