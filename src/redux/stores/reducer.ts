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
import preferenceRefreshSlice from '../slices/preferenceRefreshSlice.ts';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  loading: loadingSlice.reducer,
  bottomSheet: bottomSheetSlice.reducer,
  preference: preferenceSlice.reducer,
  popupDetail: popupDetailSlice.reducer, // 추가
  reviewSubmitted: reviewSubmittedSlice.reducer,
  interest: interestSlice.reducer,
  refresh: refreshSlice.reducer,
  blockRefresh: blockRefreshSlice.reducer,
  preferenceRefresh: preferenceRefreshSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
