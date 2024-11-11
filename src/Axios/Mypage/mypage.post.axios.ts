import customAxios, {MANAGER_INFORM, USER_INFORM} from '../axios.core';
import {handleAxiosError} from '../../Util';
import {ReportStore} from '../../Screen/MyPage/Report/Operator/Mypage.report.operator.zustand';
import {UserReportStore} from 'src/Screen/MyPage/Report/User/Mypage.report.user.zustand';

/**
 * 유저 팝업 스토어 제보 기능입니다.
 * @author 규진
 */
export const axiosMyPageUserReport = async (param: UserReportStore) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${USER_INFORM}`,

      data: {
        storeName: param.popupName,
        referralSiteUrl: param.siteUrl,
        filteringFourteenCategories: param.filteringFourteenCategories,
        images: param.images,
      },
    })
    .then(response => {
      console.log(response);
      console.log('제출 성공');
      return response;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '신고에 실패했습니다'});
    });
};

/**
 * 운영자 팝업 스토어 제보 기능입니다.
 * @author 규진
 */
export const axiosMyPageOperatorReport = async (param: ReportStore) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${MANAGER_INFORM}`,
      data: {
        images: param.images,
        informerCompany: param.informerCompany, // 소속
        informerEmail: param.informerEmail, // 제보자 이메일(그대로!)
        storeUrl: param.storeUrl, // 공식 사이트 주소
        storeName: param.storeName, // 팝업 이름
        storeBriefDescription: param.storeBriefDescription, // 팝업 한 줄 소개
        storeAddress: param.storeAddress, // 팝업 주소
        storeDetailAddress: param.storeDetailAddress, // 팝업 상세 주소 (필수X)
        isEntranceFeeRequired: param.isEntranceFeeRequired, // 입장료 유무
        entranceFee: param.entranceFee, // 팝업 입장료
        availableAge: param.availableAge, // 이용 가능 연령
        parkingAvailable: param.parkingAvailable, // 팝업 주차 가능 여부
        isReservationRequired: param.isReservationRequired, // 팝업 예약 필수 여부
        openDate: param.openDate, // 팝업 오픈 날짜
        closeDate: param.closeDate, // 팝업 종료 날짜
        openTime: param.openTime, // 팝업 오픈 시간
        closeTime: param.closeTime, // 팝업 마감 시간
        operationException: param.operationException, // 운영 예외 사항 (필수X)
        latitude: param.latitude, // 위도
        longitude: param.longitude, // 경도
        filteringThreeCategories: param.filteringThreeCategories, // 스토어형태
        filteringFourteenCategories: param.filteringFourteenCategories,
      },
    })
    .then(response => {
      console.log(response);

      return true;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '신고에 실패했습니다'});
    });
};
