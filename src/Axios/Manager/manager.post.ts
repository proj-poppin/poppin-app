import customAxios, {POPUP} from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.util';

/**
 * 관리자 제보하기를 요청합니다.
 * @author 도형
 */
export const axiosManagerRequestPopup = async (formData: FormData) => {
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
