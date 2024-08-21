import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { paramsStore } from './slices/params';
import { api } from './slices/api';

const store = configureStore({
  reducer: {
    [paramsStore.reducerPath]: paramsStore.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['paramsStore/setMainData'],
        ignoredPaths: ['paramsStore.mainData.date'],
      },
    }).concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
