import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const putChangeProfileImage = async (image: {
  uri: string;
  type: string;
  name?: string;
}) => {
  try {
    const formData = new FormData();

    formData.append('profileImage', {
      uri: image.uri.startsWith('file://') ? image.uri : `file://${image.uri}`,
      type: image.type,
      name: image.name || 'image.jpg',
    } as any);

    const response = await nonPublicApiInstance.post(
      '/api/v1/user/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: data => data,
      },
    );

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
        message: error instanceof Error ? error.message : 'Network error',
      },
    };
  }
};

export default putChangeProfileImage;
