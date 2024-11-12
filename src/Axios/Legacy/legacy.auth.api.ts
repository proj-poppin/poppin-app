// import EncryptedStorage from 'react-native-encrypted-storage';
// import {btoa} from 'react-native-quick-base64';
// import axios from 'axios';
// import Config from 'react-native-config';
//
// // 로그인 응답 타입 정의
// export interface LoginResponseData {
//   accessToken: string;
//   refreshToken: string;
// }
//
// const basicLogin = async (
//   email: string,
//   password: string,
// ): Promise<CommonResponse<LoginResponseData>> => {
//   const basicAuthString = btoa(`${email}:${password}`);
//
//   try {
//     const response = await axios.post<CommonResponse<LoginResponseData>>(
//       `${Config.API_URL}/api/v1/auth/sign-in`,
//       {},
//       {
//         headers: {
//           Authorization: `Basic ${basicAuthString}`,
//         },
//       },
//     );
//     if (response.data.success) {
//       const {accessToken, refreshToken} = response.data.data!;
//       await EncryptedStorage.setItem('refreshToken', refreshToken);
//       await EncryptedStorage.setItem('accessToken', accessToken);
//       // 전체 응답 객체를 반환
//       return response.data;
//     } else {
//       // API 응답이 success=false인 경우
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       error: {
//         code: 'NetworkError',
//         message: 'Network error occurred',
//       },
//     };
//   }
// };
//
// export default basicLogin;

// import EncryptedStorage from 'react-native-encrypted-storage';
// import {btoa} from 'react-native-quick-base64';
// import axios from 'axios';
// import Config from 'react-native-config';
//
// // 로그인 응답 타입 정의
// export interface LoginResponseData {
//   accessToken: string;
//   refreshToken: string;
// }
//
// const basicLogin = async (
//   email: string,
//   password: string,
// ): Promise<CommonResponse<LoginResponseData>> => {
//   const basicAuthString = btoa(`${email}:${password}`);
//
//   try {
//     const response = await axios.post<CommonResponse<LoginResponseData>>(
//       `${Config.API_URL}/api/v1/auth/sign-in`,
//       {},
//       {
//         headers: {
//           Authorization: `Basic ${basicAuthString}`,
//         },
//       },
//     );
//     if (response.data.success) {
//       const {accessToken, refreshToken} = response.data.data!;
//       await EncryptedStorage.setItem('refreshToken', refreshToken);
//       await EncryptedStorage.setItem('accessToken', accessToken);
//       // 전체 응답 객체를 반환
//       return response.data;
//     } else {
//       // API 응답이 success=false인 경우
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       error: {
//         code: 'NetworkError',
//         message: 'Network error occurred',
//       },
//     };
//   }
// };
//
// export default basicLogin;

// // 사용자 선호도 데이터 타입 정의
// import customAxios from '../apiInstance/axios.core.ts';
//
// const getPreferenceSetting = async () => {
//   try {
//     const response = await customAxios.get('/api/v1/user/popup-taste');
//     if (response.data.success) {
//       console.log('getPreference setting response:', response.data.data);
//       return {
//         success: true,
//         data: response.data.data,
//       };
//     } else {
//       console.log('getPreference setting failed:', response.data.error);
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     console.log('Preference setting error:', error);
//     return {
//       success: false,
//       error: {code: 'Network', message: 'Network error'},
//     };
//   }
// };
//
// export default getPreferenceSetting;

// import Config from 'react-native-config';
// import axios from 'axios';
// import {LoginResponseData} from './basicLogin.ts';
//
// const loginSocial = async (
//   type: string,
//   token: string,
// ): Promise<CommonResponse<LoginResponseData>> => {
//   try {
//     const response = await axios.post<CommonResponse<LoginResponseData>>(
//       `${Config.API_URL}/api/v1/auth/login/${type}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//
//     if (response.data.success) {
//       return response.data;
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       error: {
//         code: 'NetworkError',
//         message: 'Network error occurred',
//       },
//     };
//   }
// };
//
// export default loginSocial;

// import Config from 'react-native-config';
// import axios from 'axios';
//
// interface PasswordAuthCodeResponseData {
//   authCode: string;
// }
//
// // 이메일 인증 코드 요청 함수
// const passwordEmailVerification = async (
//   email: string,
// ): Promise<CommonResponse<PasswordAuthCodeResponseData>> => {
//   try {
//     const response = await axios.post<
//       CommonResponse<PasswordAuthCodeResponseData>
//     >(`${Config.API_URL}/api/v1/auth/email/verification/password`, {email});
//
//     if (response.data.success && response.data.data) {
//       return {
//         success: true,
//         data: {authCode: response.data.data.authCode},
//       };
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     // HTTP 에러 처리
//     throw error;
//   }
// };
//
// export default passwordEmailVerification;

// import Config from 'react-native-config';
// import axios from 'axios';
//
// // 회원가입을 시도하는 함수
// const randomNickName = async () => {
//   try {
//     const response = await axios.get(
//       `${Config.API_URL}/api/v1/user/random-nickname`,
//     );
//     if (response.data.success) {
//       return response.data;
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       error: {code: 'Network', message: 'Network error'},
//     };
//   }
// };
//
// export default randomNickName;

// import customAxios from '../apiInstance/axios.core.ts';
//
// // 로그인시 비밀번호 재설정을 시도하는 함수
// const resetPasswordNonPublic = async (
//   password: string,
//   passwordConfirm: string,
// ) => {
//   try {
//     const response = await customAxios.put('/api/v1/auth/reset-password', {
//       password,
//       passwordConfirm,
//     });
//     if (response.data.success) {
//       console.log('resetpassword successful', response.data);
//       return response.data;
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     console.log('Email verification error:', error);
//     return {
//       success: false,
//       error: {code: 'Network', message: 'Network error'},
//     };
//   }
// };
//
// export default resetPasswordNonPublic;

// import customAxios from '../apiInstance/axios.core.ts';
//
// // 회원가입을 시도하는 함수
// const socialSignUp = async (provider: string, nickname: string) => {
//   try {
//     const response = await customAxios.post('/api/v1/auth/register', {
//       provider,
//       nickname,
//     });
//
//     // 성공적으로 회원가입 처리된 경우, 응답 데이터 반환
//     if (response.data.success) {
//       return response.data; // 응답 데이터 반환
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     throw error;
//   }
// };
//
// export default socialSignUp;
