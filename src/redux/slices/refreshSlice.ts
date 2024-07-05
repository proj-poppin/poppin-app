// redux/slices/refreshSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  onRefresh: null as (() => void) | null,
};

const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    setOnRefresh(state, action) {
      state.onRefresh = action.payload;
    },
  },
});

export const {setOnRefresh} = refreshSlice.actions;
export default refreshSlice;
