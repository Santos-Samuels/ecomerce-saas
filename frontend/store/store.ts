import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { productCategoriesReducer } from "./productCategories/productCategoriesSlice";
import { productMaterialsReducer } from "./productMaterials/productMaterialsSlice";
import { adminMenuReducer } from "./adminMenu/adminMenuSlice";
import { storeSettingsReducer } from "./storeSettings/storeSettingsSlice";
import { productsReducer } from "./products/productsSlice";
import { vehiclesReducer } from "./vehicles/vehiclesSlice";
import { rootSaga } from "./sagas";

const rootReducer = combineReducers({
  auth: authReducer,
  productCategories: productCategoriesReducer,
  productMaterials: productMaterialsReducer,
  products: productsReducer,
  vehicles: vehiclesReducer,
  adminMenu: adminMenuReducer,
  storeSettings: storeSettingsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ["payload.onSuccess"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
