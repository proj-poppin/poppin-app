import {ImageType} from '../../types/ImageType';
import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

const createPopUpReview = async (
  popupId: number,
  text: string,
  visitDate: string,
  satisfaction: string,
  congestion: string,
  nickname: string,
  images: ImageType[],
  isVisited: boolean,
): Promise<CommonResponse<any>> => {
  try {
    const fcmToken = (await EncryptedStorage.getItem('pushToken')) ?? '';
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
          // name: '', // 파일명부분
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
    formData.append('popupId', String(popupId));
    formData.append('text', text);
    formData.append('visitDate', visitDate);
    formData.append('satisfaction', satisfaction);
    formData.append('congestion', congestion);
    formData.append('nickname', nickname);
    formData.append('fcmToken', fcmToken);

    const url = isVisited
      ? '/api/v1/review/w/certi'
      : '/api/v1/review/w/uncerti';

    const response = await nonPublicApiInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: data => data,
    });
    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'Network',
        message: error instanceof Error ? error.message : 'Network error',
      },
    };
  }
};

export default createPopUpReview;
