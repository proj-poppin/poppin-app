import apiInstance from '../axios.ts';

const addInterestPopUp = async (popUpId: number) => {
  try {
    console.log('why why why$$$$$$$$$', popUpId);
    const response = await apiInstance.post('/api/v1/interest/add-interest', {
      popupId: popUpId,
    });

    if (response.data.success) {
      console.log('addInterestPopUp response:', response.data);
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

export default addInterestPopUp;
