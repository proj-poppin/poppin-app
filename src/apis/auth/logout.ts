import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

const logout = async () => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');

    const response = await axios.post(
      `${Config.API_URL}/api/v1/auth/sign-out`,
      {},
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );

    if (response.data.success) {
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      return {success: true, error: null};
    }
  } catch (error) {
    await EncryptedStorage.removeItem('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
    return {success: false, error: null};
  }
};

export default logout;
