import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance';
import {ImageType} from '../../types/ImageType';

const createManagerReportPopUp = async (
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
  latitude: number,
  longitude: number,
  market: boolean,
  display: boolean,
  experience: boolean,
  wantFree: boolean,
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
  try {
    if (!Array.isArray(images)) {
      throw new TypeError('images should be an array');
    }

    const formData = new FormData();

    // Add images to FormData
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
      const emptyFile = new File([''], 'empty', {
        type: 'image/png',
        lastModified: Date.now(),
      });
      formData.append('images', emptyFile);
    }
    formData.append('affiliation', affiliation);
    formData.append('informerEmail', informerEmail);
    formData.append('homepageLink', homepageLink);
    formData.append('name', name);
    formData.append('introduce', introduce);
    formData.append('address', address);
    formData.append('addressDetail', addressDetail);
    formData.append('entranceRequired', entranceRequired);
    formData.append('entranceFee', entranceFee);
    formData.append('availableAge', availableAge);
    formData.append('parkingAvailable', parkingAvailable);
    formData.append('resvRequired', resvRequired);
    formData.append('openDate', openDate);
    formData.append('closeDate', closeDate);
    formData.append('openTime', openTime);
    formData.append('closeTime', closeTime);
    formData.append('operationExcept', operationExcept);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('market', market);
    formData.append('display', display);
    formData.append('experience', experience);
    formData.append('wantFree', wantFree);
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
    const url = '/api/v1/manager-inform';
    const response = await nonPublicApiInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: data => data,
    });
    if (response.data.success) {
      console.log('Manager report submitted successfully');
      console.log(response.data);
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.error('Failed to submit manager report', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: error instanceof Error ? error.message : 'Network error',
      },
    };
  }
};
export default createManagerReportPopUp;
