// const createManagerReportPopUp = async (
//   affiliation: string,
//   informerEmail: string,
//   homepageLink: string,
//   name: string,
//   introduce: string,
//   address: string,
//   addressDetail: string,
//   entranceRequired: boolean,
//   entranceFee: string,
//   availableAge: string,
//   parkingAvailable: boolean,
//   resvRequired: boolean,
//   openDate: string,
//   closeDate: string,
//   openTime: string,
//   closeTime: string,
//   operationExcept: string,
//   market: boolean,
//   display: boolean,
//   experience: boolean,
//   fashionBeauty: boolean,
//   characters: boolean,
//   foodBeverage: boolean,
//   webtoonAni: boolean,
//   interiorThings: boolean,
//   movie: boolean,
//   musical: boolean,
//   sports: boolean,
//   game: boolean,
//   itTech: boolean,
//   kpop: boolean,
//   alcohol: boolean,
//   animalPlant: boolean,
//   images: ImageTypeSchema[],
// ): Promise<CommonResponse<any>> => {
//   try {
//     if (!Array.isArray(images)) {
//       throw new TypeError('images should be an array');
//     }
//
//     const formData = new FormData();
//
//     // Add images to FormData
//     if (images.length > 0) {
//       images.forEach((image, index) => {
//         const file = {
//           uri: image.uri.startsWith('file://')
//             ? image.uri
//             : `file://${image.uri}`,
//           type: image.type,
//           name: image.name || `image${index}.jpg`,
//         };
//         formData.append('images', file as any);
//       });
//     } else {
//       const emptyFile = new File([''], 'empty', {
//         type: 'image/png',
//         lastModified: Date.now(),
//       });
//       formData.append('images', emptyFile);
//     }
//     formData.append('affiliation', affiliation);
//     formData.append('informerEmail', informerEmail);
//     formData.append('homepageLink', homepageLink);
//     formData.append('name', name);
//     formData.append('introduce', introduce);
//     formData.append('address', address);
//     formData.append('addressDetail', addressDetail);
//     formData.append('entranceRequired', entranceRequired);
//     formData.append('entranceFee', entranceFee);
//     formData.append('availableAge', availableAge);
//     formData.append('parkingAvailable', parkingAvailable);
//     formData.append('resvRequired', resvRequired);
//     formData.append('openDate', openDate);
//     formData.append('closeDate', closeDate);
//     formData.append('openTime', openTime);
//     formData.append('closeTime', closeTime);
//     formData.append('operationExcept', operationExcept);
//     formData.append('market', market);
//     formData.append('display', display);
//     formData.append('experience', experience);
//     formData.append('fashionBeauty', fashionBeauty);
//     formData.append('characters', characters);
//     formData.append('foodBeverage', foodBeverage);
//     formData.append('webtoonAni', webtoonAni);
//     formData.append('interiorThings', interiorThings);
//     formData.append('movie', movie);
//     formData.append('musical', musical);
//     formData.append('sports', sports);
//     formData.append('game', game);
//     formData.append('itTech', itTech);
//     formData.append('kpop', kpop);
//     formData.append('alcohol', alcohol);
//     formData.append('animalPlant', animalPlant);
//     const url = '/api/v1/manager-inform';
//     const response = await customAxios.post(url, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       transformRequest: data => data,
//     });
//     if (response.data.success) {
//       console.log('Manager report submitted successfully');
//       console.log(response.data);
//       return response.data;
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     console.error('Failed to submit manager report', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: error instanceof Error ? error.message : 'Network error',
//       },
//     };
//   }
// };
// export default createManagerReportPopUp;

// import customAxios from '../apiInstance/axios.core.ts';
// import {ImageTypeSchema} from '../../Schema/imageType.schema.ts';
//
// const createUserReportPopUp = async (
//   name: string,
//   contactLink: string,
//   fashionBeauty: boolean,
//   characters: boolean,
//   foodBeverage: boolean,
//   webtoonAni: boolean,
//   interiorThings: boolean,
//   movie: boolean,
//   musical: boolean,
//   sports: boolean,
//   game: boolean,
//   itTech: boolean,
//   kpop: boolean,
//   alcohol: boolean,
//   animalPlant: boolean,
//   etc: boolean,
//   images: ImageTypeSchema[],
// ): Promise<CommonResponse<any>> => {
//   try {
//     if (!Array.isArray(images)) {
//       throw new TypeError('images should be an array');
//     }
//     const formData = new FormData();
//     if (images.length > 0) {
//       images.forEach((image, index) => {
//         const file = {
//           uri: image.uri.startsWith('file://')
//             ? image.uri
//             : `file://${image.uri}`,
//           type: image.type,
//           name: image.name || `image${index}.jpg`,
//         };
//         formData.append('images', file as any);
//       });
//     } else {
//       // 이미지 추가안했다면 빈 파일 추가
//       const emptyFile = new File([''], 'empty', {
//         type: 'image/png',
//         lastModified: Date.now(),
//       });
//       formData.append('images', emptyFile);
//     }
//     formData.append('name', name);
//     formData.append('contactLink', contactLink);
//     formData.append('fashionBeauty', fashionBeauty);
//     formData.append('characters', characters);
//     formData.append('foodBeverage', foodBeverage);
//     formData.append('webtoonAni', webtoonAni);
//     formData.append('interiorThings', interiorThings);
//     formData.append('movie', movie);
//     formData.append('musical', musical);
//     formData.append('sports', sports);
//     formData.append('game', game);
//     formData.append('itTech', itTech);
//     formData.append('kpop', kpop);
//     formData.append('alcohol', alcohol);
//     formData.append('animalPlant', animalPlant);
//     formData.append('etc', etc);
//
//     const url = '/api/v1/user-inform/report';
//     const response = await customAxios.post(url, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       transformRequest: data => data,
//     });
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
//     // console.error('Failed to submit user report', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: error instanceof Error ? error.message : 'Network error',
//       },
//     };
//   }
// };
//
// export default createUserReportPopUp;

// import customAxios from '../apiInstance/axios.core.ts';
//
// export interface DeleteProfileImageResponse {
//   success: boolean;
//   data: string;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
//
// const deleteProfileImage = async (): Promise<DeleteProfileImageResponse> => {
//   try {
//     const response = await customAxios.delete('/api/v1/user/image');
//     console.log('deleteUser response:', response.data);
//
//     if (response.data.success) {
//       return response.data;
//     } else {
//       return {
//         success: false,
//         data: '유저 프로필 이미지 삭제 실패',
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       data: '회원탈퇴 실패',
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default deleteProfileImage;

// import customAxios from '../apiInstance/axios.core.ts';
//
// export interface GetUserInfoResponse {
//   success: boolean;
//   data: string;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
//
// const deleteUser = async (): Promise<GetUserInfoResponse> => {
//   try {
//     const response = await customAxios.delete('/api/v1/user/withdrawal');
//     console.log('deleteUser response:', response.data);
//
//     if (response.data.success) {
//       return response.data;
//     } else {
//       return {
//         success: false,
//         data: '회원탈퇴 실패',
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       data: '회원탈퇴 실패',
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default deleteUser;

// import customAxios, {USER} from '../apiInstance/axios.core.ts';
//
// export interface GetFAQInfoResponse {
//   success: boolean;
//   data?: any;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
//
// const getFAQ = async (): Promise<GetFAQInfoResponse> => {
//   try {
//     const response = await customAxios.get(`${USER}/support/faqs`);
//     console.log('faqapi response:', response.data);
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
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default getFAQ;

// import customAxios from '../apiInstance/axios.core.ts';
//
// export interface PatchUserSettingResponse {
//   success: boolean;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
//
// const getPreferenceSetting = async (): Promise<PatchUserSettingResponse> => {
//   try {
//     const response = await customAxios.get('/api/v1/user/popup-taste');
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
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default getPreferenceSetting;

// import customAxios from '../apiInstance/axios.core.ts';
//
// const getUserSetting = async (): Promise<CommonResponse<any>> => {
//   try {
//     const response = await customAxios.get('/api/v1/user/settings');
//     console.log('getUserSetting response:', response.data);
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
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default getUserSetting;

// // /api/v1/user/review/finish
//
// import customAxios from '../apiInstance/axios.core.ts';
//
// const getWriteCompleteReviewList = async (): Promise<CommonResponse<any>> => {
//   try {
//     const response = await customAxios.get('/api/v1/user/review/finish');
//     console.log('getUserSetting response:', response.data);
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
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default getWriteCompleteReviewList;

// import customAxios from '../apiInstance/axios.core.ts';
//
// export interface PatchUserSettingResponse {
//   success: boolean;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
//
// const patchUserSetting = async (editValue: {
//   nickname: string;
// }): Promise<PatchUserSettingResponse> => {
//   try {
//     const response = await customAxios.put('/api/v1/user/settings', editValue);
//     console.log('pachUserSetting response:', response.data);
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
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default patchUserSetting;

// import customAxios from '../apiInstance/axios.core.ts';
//
// export interface PostConfirmPasswordResponse {
//   success: boolean;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
//
// const postConfirmPassword = async (
//   password: string,
// ): Promise<PostConfirmPasswordResponse> => {
//   console.log('pss', password);
//
//   try {
//     const response = await customAxios.post(
//       '/api/v1/auth/verification/password',
//       {password: password},
//     );
//     console.log('postConfirm response:', response.data);
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
//     console.log('Error fetching pop up detail:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default postConfirmPassword;

// import customAxios from '../apiInstance/axios.core.ts';
//
// const putChangeProfileImage = async (image: {
//   uri: string;
//   type: string;
//   name?: string;
// }) => {
//   try {
//     const formData = new FormData();
//
//     formData.append('profileImage', {
//       uri: image.uri.startsWith('file://') ? image.uri : `file://${image.uri}`,
//       type: image.type,
//       name: image.name || 'image.jpg',
//     } as any);
//
//     const response = await customAxios.post('/api/v1/user/image', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       transformRequest: data => data,
//     });
//
//     console.log('Response:', response);
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
//     console.log('Error modifying info:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: error instanceof Error ? error.message : 'Network error',
//       },
//     };
//   }
// };
//
// export default putChangeProfileImage;
