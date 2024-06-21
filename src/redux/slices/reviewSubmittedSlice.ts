// src/redux/slices/reviewSubmittedSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const reviewSubmittedSlice = createSlice({
  name: 'reviewSubmitted',
  initialState: false,
  reducers: {
    setReviewSubmitted: (state, action) => action.payload,
  },
});

export const {setReviewSubmitted} = reviewSubmittedSlice.actions;
export default reviewSubmittedSlice;
