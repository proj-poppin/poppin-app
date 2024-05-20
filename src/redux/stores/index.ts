import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from './reducer.ts';

const store = configureStore({
  reducer: rootReducer, // rootReducer에 모든 리듀서 결합
  middleware: defaultMiddleware =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

// 타입 에러 방지를 위한 AppDispatch 타입
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
