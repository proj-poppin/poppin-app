// src/slices/popupDetailSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic';

interface PopupDetailState {
  data: DetailPopUpDataNonPublic | null;
  loading: boolean;
  error: string | null;
}

const initialState: PopupDetailState = {
  data: null,
  loading: false,
  error: null,
};

const popupDetailSlice = createSlice({
  name: 'popupDetail',
  initialState,
  reducers: {
    setPopupDetailData(
      state,
      action: PayloadAction<DetailPopUpDataNonPublic | null>,
    ) {
      state.data = action.payload;
    },
    setPopupDetailLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPopupDetailError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {setPopupDetailData, setPopupDetailLoading, setPopupDetailError} =
  popupDetailSlice.actions;

export default popupDetailSlice;
