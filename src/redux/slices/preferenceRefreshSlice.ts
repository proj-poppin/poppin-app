import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  shouldRefreshHome: false,
};

const preferenceRefreshSlice = createSlice({
  name: 'preferenceRefresh',
  initialState,
  reducers: {
    triggerPreferenceRefresh: state => {
      state.shouldRefreshHome = true;
    },
    resetPreferenceRefresh: state => {
      state.shouldRefreshHome = false;
    },
  },
});

export const {triggerPreferenceRefresh, resetPreferenceRefresh} =
  preferenceRefreshSlice.actions;

export default preferenceRefreshSlice;
