// import {useState} from 'react';
// import addInterestPopUp from '../../Axios/popup/axiosScrapInterestPopup.ts';
// import EncryptedStorage from 'react-native-encrypted-storage';
//
// interface AddInterestState {
//   loading: boolean;
//   error: Error | null;
//   success: boolean | null;
//   message: string | null;
// }
//
// const useAddInterestPopUp = () => {
//   const [addInterestState, setAddInterestState] = useState<AddInterestState>({
//     loading: false,
//     error: null,
//     success: null,
//     message: null,
//   });
//
//   const addInterest = async (popupId: number) => {
//     setAddInterestState({
//       loading: true,
//       error: null,
//       success: null,
//       message: null,
//     });
//     try {
//       const fcm_token = (await EncryptedStorage.getItem('pushToken')) ?? '';
//       const response = await addInterestPopUp({popupId, fcm_token});
//       if (response.success) {
//         setAddInterestState({
//           loading: false,
//           error: null,
//           success: true,
//           message: '관심팝업에 저장되었어요!',
//         });
//       } else {
//         throw new Error(response.error?.message || 'Failed to add interest');
//       }
//     } catch (error) {
//       setAddInterestState({
//         loading: false,
//         error:
//           error instanceof Error
//             ? error
//             : new Error('An unexpected error occurred'),
//         success: false,
//         message: null,
//       });
//     }
//   };
//
//   return {...addInterestState, addInterest};
// };
//
// export default useAddInterestPopUp;
