// import customAxios from '../apiInstance/axios.core.ts';
// export interface AddRecommendReviewResponse {
//   success: boolean;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
// const addRecommendReview = async (popupId: number, reviewId: number) => {
//   try {
//     const response = await customAxios.post(
//       `/api/v1/review/add-recommend?popupId=${popupId}&reviewId=${reviewId}`,
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
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default addRecommendReview;

// import customAxios from '../apiInstance/axios.core.ts';
//
// export interface AddVisitorResponse {
//   success: boolean;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
//
// const addVisitor = async (
//   popupId: number,
//   fcmToken: string,
// ): Promise<AddVisitorResponse> => {
//   try {
//     const response = await customAxios.post('/api/v1/rtvisit/add-visitors', {
//       popupId,
//       fcmToken,
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
// export default addVisitor;
// import customAxios from '../apiInstance/axios.core.ts';
// import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
//
// const getClosingList = async (): Promise<
//   CommonResponse<GetPopUpListResponse[]>
// > => {
//   try {
//     const response = await customAxios.get('/api/v1/popup/closing-list');
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
//         code: 'Network',
//         message: 'Network error222',
//       },
//     };
//   }
// };
//
// export default getClosingList;

// import {ImageTypeSchema} from '../../Schema/imageType.schema.ts';
// import customAxios from '../apiInstance/axios.core.ts';
// import EncryptedStorage from 'react-native-encrypted-storage';
//
// const createPopUpReview = async (
//   popupId: number,
//   text: string,
//   visitDate: string,
//   satisfaction: string,
//   congestion: string,
//   nickname: string,
//   images: ImageTypeSchema[],
//   isVisited: boolean,
// ): Promise<CommonResponse<any>> => {
//   try {
//     const fcmToken = (await EncryptedStorage.getItem('pushToken')) ?? '';
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
//           // name: '', // 파일명부분
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
//     formData.append('popupId', String(popupId));
//     formData.append('text', text);
//     formData.append('visitDate', visitDate);
//     formData.append('satisfaction', satisfaction);
//     formData.append('congestion', congestion);
//     formData.append('nickname', nickname);
//     formData.append('fcmToken', fcmToken);
//
//     const url = isVisited
//       ? '/api/v1/review/w/certi'
//       : '/api/v1/review/w/uncerti';
//
//     const response = await customAxios.post(url, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       transformRequest: data => data,
//     });
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
//         code: 'Network',
//         message: error instanceof Error ? error.message : 'Network error',
//       },
//     };
//   }
// };
//
// export default createPopUpReview;

// import customAxios from '../apiInstance/axios.core.ts';
// import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic.ts';
// import EncryptedStorage from 'react-native-encrypted-storage';
//
// const getDetailPopUp = async (
//   id: number,
//   alarmId?: number,
//   isAlarm?: boolean,
// ): Promise<CommonResponse<DetailPopUpDataNonPublic>> => {
//   try {
//     const fcmToken = (await EncryptedStorage.getItem('pushToken')) ?? '';
//     const url = isAlarm ? '/api/v1/alarm/detail/popup' : '/api/v1/popup/detail';
//
//     const response = isAlarm
//       ? await customAxios.post(url, {
//           popupId: id,
//           alarmId: alarmId,
//           fcmToken: fcmToken,
//         })
//       : await customAxios.get(url, {params: {popupId: id}});
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
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default getDetailPopUp;

// import customAxios from '../apiInstance/axios.core.ts';
// import {
//   CommonResponse,
//   ResponseData,
//   TFilterparmas,
// } from '../../types/FindPopupType.ts';
//
// const getFindPopUpList = async (
//   params: TFilterparmas,
// ): Promise<CommonResponse<ResponseData>> => {
//   try {
//     const response = await customAxios.get('/api/v1/popup/search', {
//       params: params,
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
// export default getFindPopUpList;

// import customAxios from '../apiInstance/axios.core.ts';
// import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
//
// const getHotList = async (): Promise<
//   CommonResponse<GetPopUpListResponse[]>
// > => {
//   try {
//     const response = await customAxios.get('/api/v1/popup/hot-list');
//
//     if (response.data.success) {
//       // 성공적으로 데이터를 가져온 경우, error는 null입니다.
//       return {
//         success: true,
//         data: response.data.data,
//       };
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     // 네트워크 에러 또는 기타 예외 처리
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
// export default getHotList;

// import customAxios from '../apiInstance/axios.core.ts';
// import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
//
// const getHotList = async (): Promise<
//   CommonResponse<GetPopUpListResponse[]>
// > => {
//   try {
//     const response = await customAxios.get('/api/v1/popup/hot-list');
//
//     if (response.data.success) {
//       // 성공적으로 데이터를 가져온 경우, error는 null입니다.
//       return {
//         success: true,
//         data: response.data.data,
//       };
//     } else {
//       return {
//         success: false,
//         error: response.data.error,
//       };
//     }
//   } catch (error) {
//     // 네트워크 에러 또는 기타 예외 처리
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
// export default getHotList;

// import customAxios from '../apiInstance/axios.core.ts';
//
// const modifyPopUpInfo = async (
//   popupId: number,
//   content: string,
//   images: {uri: string; type: string; name?: string}[],
// ) => {
//   try {
//     const formData = new FormData();
//
//     formData.append('popupId', String(popupId));
//     formData.append('content', content);
//
//     if (images.length > 0) {
//       // Add images to FormData
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
//
//     const response = await customAxios.post('/api/v1/modify-info', formData, {
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
// export default modifyPopUpInfo;

// import customAxios from '../apiInstance/axios.core.ts';
// import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
//
// const getNewList = async (): Promise<
//   CommonResponse<GetPopUpListResponse[]>
// > => {
//   try {
//     const response = await customAxios.get('/api/v1/popup/new-list');
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
//         code: 'Network',
//         message: 'Network error222',
//       },
//     };
//   }
// };
//
// export default getNewList;

// import customAxios from '../apiInstance/axios.core.ts';
// import {GetTastePopUpListResponse} from '../../types/PopUpListData.ts';
//
// const getTasteList = async (): Promise<
//   CommonResponse<GetTastePopUpListResponse>
// > => {
//   try {
//     const response = await customAxios.get('/api/v1/popup/taste-list');
//     if (response.data.success) {
//       return {
//         success: true,
//         data: response.data.data,
//       };
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
// export default getTasteList;
// import customAxios from './apiInstance/axios.core.ts';
//
// const blockPopup = async (popupId: number): Promise<CommonResponse<any>> => {
//   try {
//     const response = await customAxios.post(
//       `/api/v1/popup/block/${popupId.toString()}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
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
//     console.log('Error blocking popup:', error);
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
// export default blockPopup;
