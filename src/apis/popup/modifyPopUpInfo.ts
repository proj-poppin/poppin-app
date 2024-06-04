import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const modifyPopUpInfo = async (
  popupId: number,
  content: string,
  images: string[],
) => {
  try {
    const formData = new FormData();

    // JSON 형태의 데이터를 'contents' 키로 추가
    formData.append(
      'contents',
      JSON.stringify({
        popupId,
        content,
      }),
    );

    // 이미지 데이터를 'images' 키로 추가
    images.forEach(image => {
      formData.append('images', image);
    });

    const response = await nonPublicApiInstance.post(
      '/api/v1/modify-info',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

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
    console.log('Error modifying info:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default modifyPopUpInfo;
