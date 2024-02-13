// src/slices/loadingSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: builder => {},
});

export default loadingSlice;
