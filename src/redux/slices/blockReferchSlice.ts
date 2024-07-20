// redux/slices/blockRefreshSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BlockRefreshState {
  onBlockRefresh: (() => void) | null;
}

const initialState: BlockRefreshState = {
  onBlockRefresh: null,
};

const blockRefreshSlice = createSlice({
  name: 'blockRefresh',
  initialState,
  reducers: {
    setOnBlockRefresh(state, action: PayloadAction<() => void>) {
      state.onBlockRefresh = action.payload;
    },
    triggerBlockRefresh(state) {
      if (state.onBlockRefresh) {
        state.onBlockRefresh();
      }
    },
  },
});

export const {setOnBlockRefresh, triggerBlockRefresh} =
  blockRefreshSlice.actions;
export default blockRefreshSlice;
