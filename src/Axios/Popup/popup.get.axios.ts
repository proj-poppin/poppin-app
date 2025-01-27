import {PopupSearchParams} from 'src/Object/Type/filtering.type';
import customAxios, {DETAIL, POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PageInfoType} from 'src/Object/Type/pageInfo.type';
import {handleAxiosError} from 'src/Util/axios.util';
import axios from 'axios';
import {TempPopupSchema} from '../../Schema/Popup/tempPopup.schema';
import {StateWrapper} from '../wrapper/state_wrapper';
/**
 * 팝업 찾기에서 검색을 위한 필터링을 적용합니다. 아래로 드래그하여 새로운 팝업을 가져올때에도 사용합니다.
 * @returns 검색된 팝업 정보
 *
 * @author 도형
 * @param param
 */
export const axiosGetPopupsBySearchFiltering = async (
  param: PopupSearchParams,
) => {
  // console.log('request params: ', param);
  return await customAxios
    .request<{
      data: {
        pageInfo: PageInfoType;
        items: PopupSchema[];
      };
    }>({
      method: 'GET',
      url: 'v1/popup/search',
      params: param,
    })
    .then(response => {
      // console.log(response.data.data.items.length + '개의 팝업을 가져왔습니다');
      return response.data.data;
    })
    .catch(error => {
      console.log(`error: ${error}`);
      handleAxiosError({
        error,
        errorMessage: '팝업 검색이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};

// export const axiosGetInterestedPopupStores = async () => {
//   return await customAxios
//     .request<{
//       data: PopupSchema[];
//     }>({
//       method: 'GET',
//       url: 'v1/popup/interested-list',
//       params: param
//     })
//   }
// };

export type TempResponse = StateWrapper<TempPopupSchema>;

export const axiosPopupTest = async () => {
  return await axios
    .request<TempResponse>({
      method: 'GET',
      url: 'https://www.bubble-poppin.com/api/v1/popup/hot-list',
    })
    .then(response => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업 검색이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};

/**
 * 팝업 id로 특정 팝업 정보를 가져옵니다.
 * @author 도형
 */
export const axiosGetPopupById = async (popupId: string) => {
  return await customAxios
    .request<StateWrapper<PopupSchema>>({
      method: 'GET',
      url: `v1/${POPUP}/${DETAIL}/${popupId}`,
    })
    .then(response => {
      // console.log(response.data.data);
      return response.data.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '팝업을 정상적으로 불러오지 못했습니다',
      });
      return null;
    });
};
