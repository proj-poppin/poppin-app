// useAuthCode.js
import {useState, useEffect, useCallback} from 'react';

const useAuthCode = (initialCountdown = 180) => {
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(initialCountdown);
  const [startCountdown, setStartCountdown] = useState(false); // New state to control the countdown start

  useEffect(() => {
    let timer;
    if (startCountdown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
    } else if (countdown === 0) {
      setStartCountdown(false); // Optionally stop the countdown when it reaches 0
    }
    return () => clearInterval(timer);
  }, [startCountdown, countdown]);

  const resetCountdown = useCallback(() => {
    setCountdown(initialCountdown);
    setStartCountdown(true); // Restart the countdown
  }, [initialCountdown]);

  // Expose a method to start the countdown externally
  const startTheCountdown = useCallback(() => {
    setStartCountdown(true);
  }, []);

  return {
    code,
    setCode,
    countdown,
    resetCountdown,
    startTheCountdown, // Expose this function to start the countdown from the component
  };
};

export default useAuthCode;
