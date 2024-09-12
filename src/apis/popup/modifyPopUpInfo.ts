import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const modifyPopUpInfo = async (
  popupId: number,
  content: string,
  images: {uri: string; type: string; name?: string}[],
) => {
  try {
    const formData = new FormData();

    formData.append('popupId', String(popupId));
    formData.append('content', content);

    if (images.length > 0) {
      // Add images to FormData
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

    const response = await nonPublicApiInstance.post(
      '/api/v1/modify-info',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: data => data,
      },
    );

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

export default modifyPopUpInfo;
