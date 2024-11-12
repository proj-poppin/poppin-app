import {InformerManagerSchema} from 'src/Schema/Informer/informerManager.schema';
import customAxios from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.util';

/**
 * 매니저 팝업 생성 요청 함수
 * @param data InformerManagerSchema 형태의 팝업 정보
 * @returns 성공 여부를 나타내는 boolean 값
 */
export const axiosPostCreateManagerPopup = async (
  data: InformerManagerSchema,
): Promise<boolean> => {
  try {
    const formData = new FormData();

    // Add images to FormData
    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
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

    // Append the rest of the fields
    formData.append('informerCompany', data.informerCompany);
    formData.append('informerEmail', data.informerEmail);
    formData.append('storeUrl', data.storeUrl);
    formData.append('storeName', data.storeName);
    formData.append('storeBriefDescription', data.storeBriefDescription);
    formData.append('storeAddress', data.storeAddress);
    formData.append('storeDetailAddress', data.storeDetailAddress || '');
    formData.append(
      'isEntranceFeeRequired',
      String(data.isEntranceFeeRequired),
    );
    formData.append('entranceFee', data.entranceFee || '');
    formData.append('availableAge', data.availableAge);
    formData.append('parkingAvailable', String(data.parkingAvailable));
    formData.append(
      'isReservationRequired',
      String(data.isReservationRequired),
    );
    formData.append('openDate', data.openDate);
    formData.append('closeDate', data.closeDate);
    formData.append('openTime', data.openTime);
    formData.append('closeTime', data.closeTime);
    formData.append('operationException', data.operationException || '');
    formData.append('latitude', String(data.latitude));
    formData.append('longitude', String(data.longitude));

    // Add boolean flags
    formData.append('market', String(data.market));
    formData.append('display', String(data.display));
    formData.append('experience', String(data.experience));
    formData.append('fashionBeauty', String(data.fashionBeauty));
    formData.append('characters', String(data.characters));
    formData.append('foodBeverage', String(data.foodBeverage));
    formData.append('webtoonAni', String(data.webtoonAni));
    formData.append('interiorThings', String(data.interiorThings));
    formData.append('movie', String(data.movie));
    formData.append('musical', String(data.musical));
    formData.append('sports', String(data.sports));
    formData.append('game', String(data.game));
    formData.append('itTech', String(data.itTech));
    formData.append('kpop', String(data.kpop));
    formData.append('alcohol', String(data.alcohol));
    formData.append('animalPlant', String(data.animalPlant));

    const response = await customAxios.post('manager-inform', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: data => data,
    });

    // Check response success
    if (response.data.success) {
      console.log('Manager popup created successfully');
      return true;
    } else {
      console.error('Manager popup creation failed', response.data.error);
      return false;
    }
  } catch (error) {
    handleAxiosError({
      error,
      errorMessage:
        '매니저 팝업 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
    return false;
  }
};
