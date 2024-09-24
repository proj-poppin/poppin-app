import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {NoticeSchema} from 'src/Schema/Notice/notice.schema';
import customAxios from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.Util';

export type InitialDataResponse = {
  /** 홈화면의 인기 Top 5 팝업 리스트 */
  popularTop5PopupStores: PopupSchema[];
  /** 홈화면의 새로 오픈하는 팝업 리스트 */
  newlyOpenedPopupStores: PopupSchema[];
  /** 홈화면의 종료 임박 팝업 리스트 */
  closingSoonPopupStores: PopupSchema[];
  /** 홈화면의 취향 저격 팝업 리스트 */
  recommendedPopupStores: PopupSchema[];
  /** 공지사항 화면 리스트 */
  notices: NoticeSchema[];
  /** 팝업찾기 화면의 필터링된 팝업 리스트 */
  filteredPopupStores: PopupSchema[];
};

export const axiosLoadInitialData = async () => {
  return await customAxios
    .request<InitialDataResponse>({
      method: 'GET',
      url: 'v1/bootstrap',
    })
    .then(response => response.data)
    .catch(error => {
      handleAxiosError({error});
      return null;
    });
};
