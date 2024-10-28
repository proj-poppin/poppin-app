import customAxios, {INTEREST, POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PopupScrapSchema} from 'src/Schema/Popup/popupScrap.schema';
import {handleAxiosError} from 'src/Util/axios.util';

/**
 * 관심팝업 추가
 * @author 도형
 */

export const TestAccessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEyLCJyb2xlIjoiVVNFUiIsImlhdCI6MTczMDAwNTAyNywiZXhwIjoxNzM2MDUzMDI3fQ.8n-si2ekxzAVSVoMC851zu_Gm-2lLEzXFVj0UDnCdZ0WgW6xl-9XQqfMbo90li-ft3_L00YDJcaYHDrV3x2vUQ';
export const axiosScrapInterestPopup = async (popupId: string) => {
  return await customAxios
    .request<{
      updatedPopup: PopupSchema;
      newPopupScrap: PopupScrapSchema;
    }>({
      url: `v1/${INTEREST}`,
      method: 'POST',
      data: {popupId},
      headers: {
        Authorization: `Bearer ${TestAccessToken}`,
      },
    })
    .then(response => {
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
    .request<{
      updatedPopup: PopupSchema;
      newPopupScrap: PopupScrapSchema;
    }>({
      url: `v1/${INTEREST}`,
      method: 'DELETE',
      data: {popupId},
      headers: {
        Authorization: `Bearer ${TestAccessToken}`,
      },
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
