import customAxios, {POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {handleAxiosError} from 'src/Util/axios.util';

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
    .request<void>({
      method: 'POST',
      url: `v1/${POPUP}/modify`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => response.data)
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 정보 수정 요청에 실패했습니다.',
      });
      return null;
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
export const axiosVisitPopupStore = async (popupId: string) => {
  return await customAxios
    .request<{updatedPopup: PopupSchema}>({
      method: 'POST',
      url: `v1/${POPUP}/visit`,
      data: {popupId},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 방문 처리에 실패했습니다',
      });
      return null;
    });
};
