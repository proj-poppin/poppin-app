import {PopupSearchParams} from 'src/Object/Type/filtering.type';
import customAxios from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PageInfoType} from 'src/Object/Type/pageInfo.type';
import {handleAxiosError} from 'src/Util/axios.Util';
/**
 * 팝업 찾기에서 검색을 위한 필터링을 적용합니다. 아래로 드래그하여 새로운 팝업을 가져올때에도 사용합니다.
 * @returns 검색된 팝업 정보
 *
 * @author 도형
 * @param param
 */
export const axiosPopupsByFiltering = async (param: PopupSearchParams) => {
  return await customAxios
    .request<{
      pageInfo: PageInfoType;
      updatedPopupStores: PopupSchema[];
    }>({
      method: 'GET',
      url: '/v1/popup/search',
      data: param,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 검색이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};
