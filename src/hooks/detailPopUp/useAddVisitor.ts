// import {useState} from 'react';
// import addVisitor, {
//   AddVisitorResponse,
// } from '../../Axios/popup/⭐\uFE0FaddVisitor';
//
// interface AddVisitorState {
//   loading: boolean;
//   error: Error | null;
//   success: boolean | null;
// }
//
// const useAddVisitor = () => {
//   const [addVisitorState, setAddVisitorState] = useState<AddVisitorState>({
//     loading: false,
//     error: null,
//     success: null,
//   });
//
//   const addVisitorPopUp = async (
//     popUpId: number,
//     fcmToken: string,
//   ): Promise<AddVisitorResponse> => {
//     setAddVisitorState({loading: true, error: null, success: null});
//     try {
//       const response: AddVisitorResponse = await addVisitor(popUpId, fcmToken);
//       if (response.success) {
//         setAddVisitorState({loading: false, error: null, success: true});
//         return response;
//       } else {
//         setAddVisitorState({
//           loading: false,
//           error: new Error(response.error?.message || 'Failed to add visitor'),
//           success: false,
//         });
//         return response;
//       }
//     } catch (error) {
//       const err =
//         error instanceof Error
//           ? error
//           : new Error('An unexpected error occurred');
//       setAddVisitorState({loading: false, error: err, success: false});
//       return {success: false, error: {code: 'unknown', message: err.message}};
//     }
//   };
//
//   return {...addVisitorState, addVisitorPopUp};
// };
//
// export default useAddVisitor;
