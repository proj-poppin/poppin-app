import {useState} from 'react';
import {ImageType} from '../../types/ImageType.ts';
import createUserReportPopUp from '../../apis/myPage/createUserReportPopUp.ts';

interface UserReportPopUpInfoState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useUserReportPopUp = () => {
  const [userReportPopUpInfoState, setUserReportPopUpInfoState] =
    useState<UserReportPopUpInfoState>({
      loading: false,
      error: null,
      success: null,
    });

  const userReportPopUp = async (
    name: string,
    contactLink: string,
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
    etc: boolean,
    images: ImageType[],
  ): Promise<CommonResponse<any>> => {
    setUserReportPopUpInfoState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await createUserReportPopUp(
        name,
        contactLink,
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
        etc,
        images,
      );
      if (response.success) {
        setUserReportPopUpInfoState({
          loading: false,
          error: null,
          success: true,
        });
        return response;
      } else {
        setUserReportPopUpInfoState({
          loading: false,
          error: new Error(response.error?.message || 'Failed to modify info'),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setUserReportPopUpInfoState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...userReportPopUpInfoState, userReportPopUp};
};

export default useUserReportPopUp;
