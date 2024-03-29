import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  nickname: '',
  email: '',
  accessToken: '',
  phoneToken: '',
  money: 0,
  isSocialLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setMoney(state, action) {
      state.money = action.payload;
    },
    setPhoneToken(state, action) {
      state.phoneToken = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
