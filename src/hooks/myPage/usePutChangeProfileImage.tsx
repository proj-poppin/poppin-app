// import {useState} from 'react';
// import {ImageTypeSchema} from '../../Schema/imageType.schema.ts';
// import putChangeProfileImage from '../../Axios/myPage/⭐\uFE0FputChangeProfileImage.ts';
// import { CommonResponse } from "../../Axios/axios.core";
//
// interface ChangeProfileImageInfoState {
//   loading: boolean;
//   error: Error | null;
//   success: boolean | null;
// }
//
// const useChangeProfileImageInfo = () => {
//   const [modifyInfoState, setModifyInfoState] =
//     useState<ChangeProfileImageInfoState>({
//       loading: false,
//       error: null,
//       success: null,
//     });
//
//   const changeProfileImageInfo = async (
//     profileImage: ImageTypeSchema,
//   ): Promise<CommonResponse<any>> => {
//     setModifyInfoState({loading: true, error: null, success: null});
//     try {
//       const response: CommonResponse<any> = await putChangeProfileImage(
//         profileImage,
//       );
//       if (response.success) {
//         setModifyInfoState({loading: false, error: null, success: true});
//         return response;
//       } else {
//         setModifyInfoState({
//           loading: false,
//           error: new Error(response.error?.message || 'Failed to modify info'),
//           success: false,
//         });
//         return response;
//       }
//     } catch (error) {
//       const err =
//         error instanceof Error
//           ? error
//           : new Error('An unexpected error occurred');
//       setModifyInfoState({loading: false, error: err, success: false});
//       return {success: false, error: {code: 'unknown', message: err.message}};
//     }
//   };
//
//   return {...modifyInfoState, changeProfileImageInfo};
// };
//
// export default useChangeProfileImageInfo;
