import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  birthDate: '',
  email: '',
  nickname: '',
  provider: '',
  userImageUrl: '',
  password: '',
  passwordConfirm: '',
  agreedToPrivacyPolicy: true,
  agreedToServiceTerms: true,
  accessToken: '',
  refreshToken: '',
  phoneToken: '',
  money: 0,
  isSocialLogin: false,
  isFinishedPreferenceSetting: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state, action) {
      state.birthDate = action.payload.birthDate;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.provider = action.payload.provider;
      state.userImageUrl = action.payload.userImageUrl;
    },
    setSignUpEmailScreen(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.passwordConfirm = action.payload.passwordConfirm;
      state.agreedToPrivacyPolicy = action.payload.agreedToPrivacyPolicy;
      state.agreedToServiceTerms = action.payload.agreedToServiceTerms;
    },
    setSignUpNickNameScreen(state, action) {
      state.nickname = action.payload.nickname;
      state.birthDate = action.payload.birthDate;
    },
    setAgreedToPrivacyPolicy(state, action) {
      state.agreedToPrivacyPolicy = action.payload;
      state.agreedToServiceTerms = action.payload;
    },
    setIsFinishedPreferenceProcess(state, action) {
      state.isFinishedPreferenceSetting = action.payload;
    },

    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setAccessTokenAndRefreshToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setMoney(state, action) {
      state.money = action.payload;
    },
    setPhoneToken(state, action) {
      state.phoneToken = action.payload;
    },
    resetUser(state) {
      state.nickname = '';
      state.email = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.phoneToken = '';
      state.money = 0;
      state.isSocialLogin = false;
    },
  },
});

export const {resetUser} = userSlice.actions;
export default userSlice;
