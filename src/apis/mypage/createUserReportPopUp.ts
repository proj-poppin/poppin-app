import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance';
import {ImageType} from '../../types/ImageType';

const createUserReportPopUp = async (
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
  try {
    if (!Array.isArray(images)) {
      throw new TypeError('images should be an array');
    }
    const formData = new FormData();
    if (images.length > 0) {
      images.forEach((image, index) => {
        const file = {
          uri: image.uri.startsWith('file://')
            ? image.uri
            : `file://${image.uri}`,
          type: image.type,
          name: image.name || `image${index}.jpg`,
        };
        formData.append('images', file as any);
      });
    } else {
      // 이미지 추가안했다면 빈 파일 추가
      const emptyFile = new File([''], 'empty', {
        type: 'image/png',
        lastModified: Date.now(),
      });
      formData.append('images', emptyFile);
    }
    formData.append('name', name);
    formData.append('contactLink', contactLink);
    formData.append('fashionBeauty', fashionBeauty);
    formData.append('characters', characters);
    formData.append('foodBeverage', foodBeverage);
    formData.append('webtoonAni', webtoonAni);
    formData.append('interiorThings', interiorThings);
    formData.append('movie', movie);
    formData.append('musical', musical);
    formData.append('sports', sports);
    formData.append('game', game);
    formData.append('itTech', itTech);
    formData.append('kpop', kpop);
    formData.append('alcohol', alcohol);
    formData.append('animalPlant', animalPlant);
    formData.append('etc', etc);

    const url = '/api/v1/user-inform/report';
    const response = await nonPublicApiInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: data => data,
    });

    if (response.data.success) {
      console.log(response.data);
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.error('Failed to submit user report', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: error instanceof Error ? error.message : 'Network error',
      },
    };
  }
};

export default createUserReportPopUp;
