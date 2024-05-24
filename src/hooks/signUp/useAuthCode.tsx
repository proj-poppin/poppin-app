import {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';

const useAuthCode = (initialCountdown = 180) => {
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(initialCountdown);
  const [startCountdown, setStartCountdown] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    let timer;
    if (startCountdown && countdown > 0 && isFocused) {
      timer = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
    } else if (countdown === 0 && isFocused) {
      setStartCountdown(false);
      Alert.alert(
        '시간초과',
        '시간이 초과되었습니다\n재전송하기 버튼을 눌러주세요!',
      );
    }
    return () => clearInterval(timer);
  }, [startCountdown, countdown, isFocused]);

  const resetCountdown = useCallback(() => {
    setCountdown(initialCountdown);
    setStartCountdown(true);
  }, [initialCountdown]);

  const startTheCountdown = useCallback(() => {
    setStartCountdown(true);
  }, []);

  const setFocus = useCallback(focus => {
    setIsFocused(focus);
    if (!focus) {
      setStartCountdown(false);
    }
  }, []);

  return {
    code,
    setCode,
    countdown,
    resetCountdown,
    startTheCountdown,
    setFocus,
  };
};

export default useAuthCode;
