import {useState} from 'react';
import {Switch, Text} from 'react-native';

type Props = {
  label: string;
};

function SettingSwitch({label}: Props) {
  const [isAlarmAll, setIsAlarmAll] = useState(false);

  const toggleSwitch = () => {
    setIsAlarmAll(previousState => !previousState);
  };
  return (
    <>
      <Text>{label}</Text>
      <Switch
        trackColor={{false: 'red', true: '#s81b0ff'}}
        thumbColor={isAlarmAll ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isAlarmAll}
      />
    </>
  );
}

export default SettingSwitch;
