import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InterestedState {
  [key: number]: boolean; // 팝업 ID를 키로 하여 관심 상태를 저장
}

const initialState: InterestedState = {};

const interestedPopupsSlice = createSlice({
  name: 'interestedPopups',
  initialState,
  reducers: {
    toggleInterest: (state, action: PayloadAction<number>) => {
      const popupId = action.payload;
      state[popupId] = !state[popupId];
    },
    setInterest: (
      state,
      action: PayloadAction<{popupId: number; isInterested: boolean}>,
    ) => {
      const {popupId, isInterested} = action.payload;
      state[popupId] = isInterested;
    },
  },
});

export const {toggleInterest, setInterest} = interestedPopupsSlice.actions;
export default interestedPopupsSlice;
