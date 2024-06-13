import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
import {ImageType} from '../../types/ImageType.ts';

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
    if (!Array.isArray(images)) {
      throw new TypeError('images should be an array');
    }
    const formData = new FormData();

    // 이미지 데이터를 개별적으로 추가
    images.forEach((image, index) => {
      const file = {
        uri: image.uri.startsWith('file://')
          ? image.uri
          : `file://${image.uri}`,
        type: image.type,
        name: image.name || `image${index}.jpg`,
      };
      formData.append('images', file);
    });

    // JSON 데이터를 Blob으로 변환하여 추가
    const jsonBody = {
      popupId: popupId,
      text: text,
      visitDate: visitDate,
      satisfaction: satisfaction,
      congestion: congestion,
      nickname: nickname,
    };

    // // 방법 1
    // const jsonBlob = new Blob([JSON.stringify(body)], {
    //   type: 'application/json',
    //   lastModified: new Date().getTime(),
    // });
    // formData.append('contents', jsonBlob);

    // // 방법 2
    formData.append('contents', JSON.stringify(jsonBody));
    // // FormData 확인용 콘솔 로그
    // formData.getAll('images').forEach((image, index) => {
    //   console.log(`FormData image ${index}:`, image);
    // });

    // // 방법 3
    // formData.append('contents', {
    //   popupId: popupId,
    //   text: text,
    //   visitDate: visitDate,
    //   satisfaction: satisfaction,
    //   congestion: congestion,
    //   nickname: nickname,
    // });

    const url = !isVisited
      ? '/api/v1/review/w/certi'
      : '/api/v1/review/w/uncerti';
    const response = await nonPublicApiInstance.post(
      url,
      {
        formData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: data => data,
      },
    );

    console.log('Response@@@@@@:', response.data);

    if (response.data.success) {
      return response.data;
    } else {
      console.log('Error creating review:', response.data.error);
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Error creating review:', error);
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
