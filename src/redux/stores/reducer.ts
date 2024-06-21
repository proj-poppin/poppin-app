import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/user.ts';
import loadingSlice from '../slices/loading.ts';
import bottomSheetSlice from '../slices/bottomSheetSlice.ts';
import preferenceSlice from '../slices/preferenceSlice.ts';
import interestedPopupsSlice from '../slices/interestedPopUpSlice.ts';
import popupDetailSlice from '../slices/popupDetailSlice.ts';
import reviewSubmittedSlice from '../slices/reviewSubmittedSlice.ts'; // 추가
// 모든 상태를 결합
const rootReducer = combineReducers({
  user: userSlice.reducer,
  loading: loadingSlice.reducer,
  bottomSheet: bottomSheetSlice.reducer,
  preference: preferenceSlice.reducer,
  interestedPopups: interestedPopupsSlice.reducer, // 추가
  popupDetail: popupDetailSlice.reducer, // 추가
  reviewSubmitted: reviewSubmittedSlice.reducer,
});

export default rootReducer;

// 타입 에러 방지를 위한 RootState 타입
export type RootState = ReturnType<typeof rootReducer>;
