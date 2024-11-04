import customAxios, {INTEREST, POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PopupScrapSchema} from 'src/Schema/Popup/popupScrap.schema';
import {handleAxiosError} from 'src/Util/axios.util';
import {StateWrapper} from '../wrapper/state_wrapper';

/**
 * 관심팝업 추가
 * @author 도형
 */

export interface ScrapResponseData {
  updatedPopup: PopupSchema;
  newPopupScrap: PopupScrapSchema;
}

export const axiosScrapInterestPopup = async (popupId: string) => {
  return await customAxios
    .request<StateWrapper<ScrapResponseData>>({
      url: `v1/${INTEREST}`,
      method: 'POST',
      data: {popupId},
    })
    .then(response => {
      console.log('response: ', response.data);
      return response.data;
    })
    .catch(error => {
      console.log('error: ', error);
      handleAxiosError({
        error,
        errorMessage: '팝업 관심 등록이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};

/**
 * 관심팝업 해제
 * @author 도형
 */

export const axiosUnscrapInterestPopup = async (popupId: string) => {
  return await customAxios
    .request<StateWrapper<ScrapResponseData>>({
      url: `v1/${INTEREST}`,
      method: 'DELETE',
      data: {popupId},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 관심 등록 취소가 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};
