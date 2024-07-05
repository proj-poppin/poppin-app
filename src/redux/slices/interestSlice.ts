import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InterestState {
  [id: number]: boolean;
}

const initialState: InterestState = {};

const interestSlice = createSlice({
  name: 'interest',
  initialState,
  reducers: {
    setInterest(
      state,
      action: PayloadAction<{id: number; isInterested: boolean}>,
    ) {
      state[action.payload.id] = action.payload.isInterested;
    },
    setInitialInterests(state, action: PayloadAction<InterestState>) {
      return {...state, ...action.payload};
    },
    resetInterests(state) {
      return initialState;
    },
  },
});

export const {setInterest, setInitialInterests, resetInterests} =
  interestSlice.actions;
export default interestSlice;
