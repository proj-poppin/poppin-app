import Config from 'react-native-config';
import axios from 'axios';

// 회원가입을 시도하는 함수
const randomNickName = async () => {
  try {
    const response = await axios.get(
      `${Config.API_URL}/api/v1/user/random-nickname`,
    );
    if (response.data.success) {
      console.log('Sign up successful', response.data);
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('random nickname error:', error);
    return {
      success: false,
      error: {code: 'Network', message: 'Network error'},
    };
  }
};

export default randomNickName;
