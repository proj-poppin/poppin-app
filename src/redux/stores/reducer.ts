import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/user.ts';
import loadingSlice from '../slices/loading.ts';
import bottomSheetSlice from '../slices/bottomSheetSlice.ts';
import preferenceSlice from '../slices/preferenceSlice.ts';
import popupDetailSlice from '../slices/popupDetailSlice.ts';
import reviewSubmittedSlice from '../slices/reviewSubmittedSlice.ts';
import interestSlice from '../slices/interestSlice.ts';
import refreshSlice from '../slices/refreshSlice.ts';
import blockRefreshSlice from '../slices/blockReferchSlice.ts';
// 모든 상태를 결합
const rootReducer = combineReducers({
  user: userSlice.reducer,
  loading: loadingSlice.reducer,
  bottomSheet: bottomSheetSlice.reducer,
  preference: preferenceSlice.reducer,
  popupDetail: popupDetailSlice.reducer, // 추가
  reviewSubmitted: reviewSubmittedSlice.reducer,
  interest: interestSlice.reducer,
  refresh: refreshSlice.reducer,
  blockRefresh: blockRefreshSlice,
});

export default rootReducer;

// 타입 에러 방지를 위한 RootState 타입
export type RootState = ReturnType<typeof rootReducer>;
