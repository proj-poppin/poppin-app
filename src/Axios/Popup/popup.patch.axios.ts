import customAxios, {POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PopupScrapSchema} from 'src/Schema/Popup/popupScrap.schema';
import {handleAxiosError} from 'src/Util/axios.Util';

/**
 * 관심팝업 추가
 * @author 도형
 */

export const axiosScrapInterestPopup = async (popupId: number) => {
  return await customAxios
    .request<{
      updatedPopup: PopupSchema;
      newPopupScrap: PopupScrapSchema;
    }>({
      url: `v1/${POPUP}scrap`,
      method: 'PATCH',
      data: {popupId},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
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

export const axiosUnscrapInterestPopup = async (popupId: number) => {
  return await customAxios
    .request<{
      updatedPopup: PopupSchema;
      newPopupScrap: PopupScrapSchema;
    }>({
      url: `v1/${POPUP}unscrap`,
      method: 'PATCH',
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
