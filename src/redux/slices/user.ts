import {createSlice} from '@reduxjs/toolkit';

const initialState = {
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
  isProfileImageChanged: false,
  isNicknameChanged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.provider = action.payload.provider;
      state.userImageUrl = action.payload.userImageUrl;
    },
    setProfileImageUrl(state, action) {
      state.userImageUrl = action.payload.userImageUrl;
      state.isProfileImageChanged = true;
    },
    setProfileNickname(state, action) {
      state.nickname = action.payload.nickname;
      state.isNicknameChanged = true;
    },
    resetChangeFlags(state) {
      state.isProfileImageChanged = false;
      state.isNicknameChanged = false;
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
      state.email = '';
      state.nickname = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.phoneToken = '';
      state.provider = '';
      state.money = 0;
      state.userImageUrl = '';
      state.isSocialLogin = false;
    },
  },
});

export const {
  setUser,
  setProfileImageUrl,
  setProfileNickname,
  resetUser,
  resetChangeFlags,
} = userSlice.actions;
export default userSlice;
