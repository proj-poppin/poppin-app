import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const createPopUpReview = async (
  popupId: number,
  text: string,
  visitDate: string,
  satisfaction: string,
  congestion: string,
  nickname: string,
  images: {uri: string}[],
  isVisited: boolean,
): Promise<CommonResponse<any>> => {
  try {
    const formData = new FormData();

    // JSON 형태의 데이터를 추가
    formData.append(
      'contents',
      JSON.stringify({
        popupId,
        text,
        visitDate,
        satisfaction,
        congestion,
        nickname,
      }),
    );

    // 이미지 데이터를 추가
    images.forEach((image, index) => {
      const photo = {
        uri: image.uri,
        type: 'multipart/form-data',
        name: `${index}.jpg`,
      };
      formData.append('images', photo);
    });

    console.log('formData:', formData);

    const url = isVisited
      ? '/api/v1/review/w/certi'
      : '/api/v1/review/w/uncerti';

    const response = await nonPublicApiInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // 서버 응답 출력
    console.log('Response:', response);

    if (response.data.success) {
      return response.data;
    } else {
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
        message: 'Network error',
      },
    };
  }
};

export default createPopUpReview;
