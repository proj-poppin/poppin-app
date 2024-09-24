// import customAxios from '../apiInstance/axios.core.ts';
//
// export const blockUser = async (
//   blockUserId: number,
// ): Promise<CommonResponse<any>> => {
//   try {
//     const response = await customAxios.post(
//       `/api/v1/user/block/${blockUserId.toString()}`,
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
//     console.log('Error blocking user:', error);
//     return {
//       success: false,
//       error: {
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
// import customAxios from '../apiInstance/axios.core.ts';
//
// const reportPopUp = async (
//   popupId: number,
//   content: string,
// ): Promise<CommonResponse<any>> => {
//   try {
//     const response = await customAxios.post(
//       `/api/v1/reports/popup/${popupId}`,
//       {content},
//       {
//         headers: {
//           'Content-Type': 'application/json',
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
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default reportPopUp;
// import customAxios from '../apiInstance/axios.core.ts';
//
// const reportReview = async (
//   reviewId: string,
//   content: string,
// ): Promise<CommonResponse<any>> => {
//   try {
//     const response = await customAxios.post(
//       `/api/v1/reports/review/${reviewId}`,
//       {content},
//       {
//         headers: {
//           'Content-Type': 'application/json',
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
//         code: 'Network',
//         message: 'Network error',
//       },
//     };
//   }
// };
//
// export default reportReview;
