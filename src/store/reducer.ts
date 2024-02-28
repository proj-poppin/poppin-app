import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/user';
import loadingReducer from '../slices/loading';
import loadingSlice from '../slices/loading';
import bottomSheetSlice from '../slices/bottomSheetSlice.ts';

// 모든 상태를 결합
const rootReducer = combineReducers({
  user: userSlice.reducer,
  loading: loadingSlice.reducer, // loading 상태 추가
  bottomSheet: bottomSheetSlice.reducer, // 추가
});

export default rootReducer;

// 타입 에러 방지를 위한 RootState 타입
export type RootState = ReturnType<typeof rootReducer>;
