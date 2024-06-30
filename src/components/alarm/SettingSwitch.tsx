import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Switch} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import text14M from '../../styles/texts/body_medium/Text14M.ts';
import text18M from '../../styles/texts/body_large/Text18M.ts';

type SettingSwitchProps = {
  label: string;
  desc?: string;
  name: string;
  isAlarm: boolean;
  isEnable: boolean;
  onChange: (name: string, value: boolean) => void;
};

const SettingSwitch: React.FC<SettingSwitchProps> = ({
  label,
  desc,
  name,
  isAlarm,
  isEnable,
  onChange,
}) => {
  const [isAlarmAll, setIsAlarmAll] = useState(isAlarm);

  const toggleSwitch = () => {
    setIsAlarmAll(previousState => !previousState);
    onChange(name, !isAlarmAll);
  };

  useEffect(() => {
    console.log('isAlarmAll', isAlarmAll);
  }, [isAlarmAll]);

  return (
    <View style={styles.switchContainer}>
      <View style={styles.textWrapper}>
        <Text style={[text18M.text]}>{label}</Text>
        <Text style={[text14M.text, {color: globalColors.font}]}>{desc}</Text>
      </View>
      <Switch
        ios_backgroundColor={globalColors.toggleBackground}
        disabled={!isEnable}
        trackColor={{
          false: isEnable ? globalColors.white : globalColors.component,
          true: isEnable ? globalColors.blue : globalColors.component,
        }}
        thumbColor={globalColors.white}
        onValueChange={toggleSwitch}
        value={isAlarmAll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  desc: {
    fontSize: 14,
    color: globalColors.black,
  },
  disabledText: {
    // color: globalColors.toggleBackground,
  },
});

export default SettingSwitch;
