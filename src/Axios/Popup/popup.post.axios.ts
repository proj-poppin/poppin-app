import customAxios, {POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {handleAxiosError} from 'src/Util/axios.util';
import {ResultWrapper} from '../wrapper/result.wrapper';
import {StateWrapper} from '../wrapper/state_wrapper';
import {PopupVisitSchema} from '../../Schema/Popup/popupVisit.schema';
import {PopupWaitingSchema} from '../../Schema/Popup/popupWaiting.schema';

/**
 * 팝업 정보 수정 요청을 합니다.
 *
 * @param formData
 * @author 도형
 */

/**
 * @param popupId
 * @param content;
 * @param images;
 * @param formData
 */
export const axiosModifyPopupInfo = async (formData: FormData) => {
  return await customAxios
    .request<StateWrapper<void>>({
      method: 'POST',
      url: 'v1/modify-info',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
    .then(response => {
      return response.data.success;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 정보 수정 요청에 실패했습니다.',
      });
      return false;
    });
};

/**
 * 게시된 팝업스토어 작성글을 신고합니다.
 * @return 성공 시 true | 실패 시 false
 * @author 도형
 */
export const axiosReportPopup = async (param: {
  popupId: string;
  reportContent: string;
}) => {
  return await customAxios
    .request<void>({
      method: 'POST',
      url: `v1/${POPUP}/report`,
      data: {popupId: param.popupId, content: param.reportContent},
    })
    .then(response => {
      return true;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 신고가 정상적으로 처리되지 못했습니다',
      });
      return false;
    });
};

export const axiosBlockPopup = async (popupId: string) => {
  return await customAxios
    .request<void>({
      method: 'POST',
      url: `v1/${POPUP}/block/${popupId}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 차단에 실패했습니다',
      });
      return null;
    });
};
/**
 * 팝업 방문하기를 요청합니다.
 *
 * @param popupId
 * @author 도형
 */

export interface PopupVisitResponseData {
  updatedPopupStore: PopupSchema;
  newPopupVisit: PopupVisitSchema;
}

export const axiosVisitPopupStore = async (popupId: string) => {
  return await customAxios
    .request<StateWrapper<PopupVisitResponseData>>({
      method: 'PATCH',
      url: `v1/${POPUP}/visit`,
      data: {popupId},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('팝업 방문 처리에 실패했습니다:', error);
      handleAxiosError({
        error,
        errorMessage: '팝업 방문 처리에 실패했습니다',
      });
      return null;
    });
};

/**
 * (운영종료 팝업 한정) 팝업 재오픈을 요청합니다.
 * @author 도형
 *
 * @param popupId
 */

export interface PopupWaitingResponseData {
  updatedPopup: PopupSchema;
  newPopupWaiting: PopupWaitingSchema;
}

export const axiosRequestReopenPopup = async (popupId: string) => {
  return await customAxios
    .request<StateWrapper<PopupWaitingResponseData>>({
      method: 'POST',
      url: `v1/${POPUP}/waiting?popupId=${popupId}`,
    })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 재개점 요청에 실패했습니다',
      });
      return null;
    });
};
