import {useState} from 'react';
import {ImageType} from '../../types/ImageType.ts';
import createManagerReportPopUp from '../../../src/apis/myPage/createManagerReportPopUp.ts';

interface ManagerReportPopUpInfoState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useManagerReportPopUp = () => {
  const [managerReportPopUpInfoState, setManagerReportPopUpInfoState] =
    useState<ManagerReportPopUpInfoState>({
      loading: false,
      error: null,
      success: null,
    });

  const managerReportPopUp = async (
    affiliation: string,
    informerEmail: string,
    homepageLink: string,
    name: string,
    introduce: string,
    address: string,
    addressDetail: string,
    entranceRequired: boolean,
    entranceFee: string,
    availableAge: string,
    parkingAvailable: boolean,
    resvRequired: boolean,
    openDate: string,
    closeDate: string,
    openTime: string,
    closeTime: string,
    operationExcept: string,
    market: boolean,
    display: boolean,
    experience: boolean,
    fashionBeauty: boolean,
    characters: boolean,
    foodBeverage: boolean,
    webtoonAni: boolean,
    interiorThings: boolean,
    movie: boolean,
    musical: boolean,
    sports: boolean,
    game: boolean,
    itTech: boolean,
    kpop: boolean,
    alcohol: boolean,
    animalPlant: boolean,
    images: ImageType[],
  ): Promise<CommonResponse<any>> => {
    setManagerReportPopUpInfoState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await createManagerReportPopUp(
        affiliation,
        informerEmail,
        homepageLink,
        name,
        introduce,
        address,
        addressDetail,
        entranceRequired,
        entranceFee,
        availableAge,
        parkingAvailable,
        resvRequired,
        openDate,
        closeDate,
        openTime,
        closeTime,
        operationExcept,
        market,
        display,
        experience,
        fashionBeauty,
        characters,
        foodBeverage,
        webtoonAni,
        interiorThings,
        movie,
        musical,
        sports,
        game,
        itTech,
        kpop,
        alcohol,
        animalPlant,
        images,
      );

      if (response.success) {
        setManagerReportPopUpInfoState({
          loading: false,
          error: null,
          success: true,
        });
        return response;
      } else {
        setManagerReportPopUpInfoState({
          loading: false,
          error: new Error(
            response.error?.message || 'Failed to submit report',
          ),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setManagerReportPopUpInfoState({
        loading: false,
        error: err,
        success: false,
      });
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...managerReportPopUpInfoState, managerReportPopUp};
};

export default useManagerReportPopUp;
