// useSignUpNickName.js
import {useState, useCallback} from 'react';

const useSignUpNickName = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isBirthDateValid, setIsBirthDateValid] = useState(false);

  const handleChangeNickname = useCallback(text => {
    setNickname(text);
    if (text.length > 10) {
      setNicknameError('10자 이하로 입력해 주세요.');
      setIsNicknameValid(false);
    } else {
      setNicknameError('');
      const isValidNickname = /^[a-zA-Z가-힣\s]{1,10}$/.test(text);
      setIsNicknameValid(isValidNickname);
    }
  }, []);

  const handleChangeBirthDate = useCallback(text => {
    setBirthDate(text);
    const isValidBirthDate = /^\d{4}\.\d{2}\.\d{2}$/.test(text);
    setIsBirthDateValid(isValidBirthDate);
  }, []);

  return {
    nickname,
    nicknameError,
    birthDate,
    isNicknameValid,
    isBirthDateValid,
    handleChangeNickname,
    handleChangeBirthDate,
  };
};

export default useSignUpNickName;
