import apiInstance from '../axios.ts';

const getDeletePopUp = async (popUpId: number) => {
  try {
    const response = await apiInstance.delete(
      '/api/v1/interest/remove-interest',
      {
        params: {popup_id: popUpId},
      },
    );
    console.log('@@@@@@@@getDeletePopUp response:', response.data);

    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Error fetching pop up detail:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default getDeletePopUp;
