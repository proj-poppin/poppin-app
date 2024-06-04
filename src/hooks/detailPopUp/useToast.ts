import {useState} from 'react';

export default function useToast() {
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsShowToast(true);
  };

  const hideToast = () => {
    setIsShowToast(false);
  };

  return {
    isShowToast,
    toastMessage,
    showToast,
    hideToast,
  };
}
