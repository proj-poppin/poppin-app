// // src/hooks/review/useCreateReview.tsx
// import {useState} from 'react';
// import createPopUpReview from '../../Axios/popup/⭐\uFE0FcreateReview.tsx';
// import {ImageTypeSchema} from '../../Schema/imageType.schema.ts';
// import {useDispatch} from 'react-redux';
// import {setReviewSubmitted} from '../../redux/slices/reviewSubmittedSlice.ts';
// import { CommonResponse } from "../../Axios/axios.core";
//
// interface CreateReviewState {
//   loading: boolean;
//   error: Error | null;
//   success: boolean | null;
// }
//
// const useCreateReview = () => {
//   const [createReviewState, setCreateReviewState] = useState<CreateReviewState>(
//     {
//       loading: false,
//       error: null,
//       success: null,
//     },
//   );
//
//   const dispatch = useDispatch();
//
//   const createReview = async (
//     popupId: number,
//     text: string,
//     visitDate: string,
//     satisfaction: string,
//     congestion: string,
//     nickname: string,
//     images: ImageTypeSchema[],
//     isVisited: boolean,
//   ): Promise<CommonResponse<any>> => {
//     if (!Array.isArray(images)) {
//       throw new TypeError('images should be an array');
//     }
//
//     setCreateReviewState({loading: true, error: null, success: null});
//     try {
//       const response: CommonResponse<any> = await createPopUpReview(
//         popupId,
//         text,
//         visitDate,
//         satisfaction,
//         congestion,
//         nickname,
//         images,
//         isVisited,
//       );
//       if (response.success) {
//         dispatch(setReviewSubmitted(true));
//         setCreateReviewState({loading: false, error: null, success: true});
//         return response;
//       } else {
//         setCreateReviewState({
//           loading: false,
//           error: new Error(
//             response.error?.message || 'Failed to create review',
//           ),
//           success: false,
//         });
//         return response;
//       }
//     } catch (error) {
//       const err =
//         error instanceof Error
//           ? error
//           : new Error('An unexpected error occurred');
//       setCreateReviewState({loading: false, error: err, success: false});
//       return {success: false, error: {code: 'unknown', message: err.message}};
//     }
//   };
//
//   return {...createReviewState, createReview};
// };
//
// export default useCreateReview;
