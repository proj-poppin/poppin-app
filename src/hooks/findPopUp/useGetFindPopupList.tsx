// import {useState, useEffect, useCallback} from 'react';
// import getFindPopUpList from '../../Axios/popup/⭐\uFE0FfindPopupList.ts';
// import getPublicFindPopUpList from '../../Axios/popup/⭐\uFE0FpublicFindPopupList.ts';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import {
//   GetClosingState,
//   TFilter,
//   OperationStatus,
//   Order,
//   TFilterparmas,
// } from '../../types/FindPopupType.ts';
//
// const useGetFindPopupList = (
//   page: number,
//   size: number,
//   selectedTab: OperationStatus,
//   selectedOrder: Order,
//   availableTags: TFilter[],
//   searchKeyword: string,
//   triggerFetch: boolean,
// ) => {
//   const [getListState, setGetListState] = useState<GetClosingState>({
//     loading: false,
//     error: null,
//     data: [],
//   });
//   const [isLastPage, setIsLastPage] = useState(false);
//
//   const fetchFindPopupList = useCallback(async () => {
//     if (isLastPage && page > 0) {
//       return;
//     } // Stop fetching if it's the last page and not the initial load
//
//     setGetListState((prevState: GetClosingState) => ({
//       ...prevState,
//       loading: true,
//     }));
//
//     const selectedPreparedString = availableTags
//       .slice(0, 14)
//       .map(item => (item.selected ? '1' : '0'))
//       .join('');
//
//     const selectedTasteString = availableTags
//       .slice(14)
//       .map(item => (item.selected ? '1' : '0'))
//       .join('');
//
//     const filterParams: TFilterparmas = {
//       page,
//       size,
//       oper: selectedTab,
//       text: searchKeyword,
//       order: selectedOrder,
//       prepered: selectedPreparedString,
//       taste: selectedTasteString,
//     };
//
//     try {
//       const accessToken = await EncryptedStorage.getItem('accessToken');
//       const response = accessToken
//         ? await getFindPopUpList(filterParams)
//         : await getPublicFindPopUpList(filterParams);
//
//       if (response.success && response.data) {
//         setGetListState((prevState: GetClosingState) => ({
//           loading: false,
//           error: null,
//           data:
//             page === 0 || triggerFetch
//               ? response.data!.items
//               : [...prevState.data, ...response.data!.items],
//         }));
//         setIsLastPage(response.pageInfo.isLast); // Update the isLastPage state
//       } else {
//         setGetListState({
//           loading: false,
//           error: new Error(response.error?.message || 'Unknown error'),
//           data: [],
//         });
//       }
//     } catch (error: any) {
//       setGetListState({
//         loading: false,
//         error:
//           error instanceof Error
//             ? error
//             : new Error('An unexpected error occurred'),
//         data: [],
//       });
//     }
//   }, [
//     page,
//     size,
//     selectedOrder,
//     selectedTab,
//     availableTags,
//     searchKeyword,
//     triggerFetch,
//     isLastPage,
//   ]);
//
//   useEffect(() => {
//     if (triggerFetch || page > 0) {
//       fetchFindPopupList();
//     }
//   }, [fetchFindPopupList, page, triggerFetch]);
//
//   return {...getListState, refetch: fetchFindPopupList, isLastPage};
// };
//
// export default useGetFindPopupList;
