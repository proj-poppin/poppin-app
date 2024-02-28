import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const {setOpen} = bottomSheetSlice.actions;
export default bottomSheetSlice;
