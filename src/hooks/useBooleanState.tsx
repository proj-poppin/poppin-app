import {useState} from 'react';

type UseBooleanStateProps = {
  initialValue: boolean;
};

type UseBooleanStateType = {
  state: boolean;
  setTrue: () => void;
  setFalse: () => void;
  setToggle: () => void;
};

export const useBooleanState = ({
  initialValue,
}: UseBooleanStateProps): UseBooleanStateType => {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleValue = (type: 'TRUE' | 'FALSE' | 'TOGGLE') => () => {
    if (type === 'TRUE') {
      setValue(true);
      return;
    }
    if (type === 'FALSE') {
      setValue(false);
      return;
    }
    if (type === 'TOGGLE') {
      setValue(prevState => !prevState);
      return;
    }
  };

  return {
    state: value,
    setFalse: handleValue('FALSE'),
    setToggle: handleValue('TOGGLE'),
    setTrue: handleValue('TRUE'),
  };
};
