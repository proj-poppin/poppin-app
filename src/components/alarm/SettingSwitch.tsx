import React, {useEffect, useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';

type Props = {
  label: string;
  desc?: string;
  name: string;
  isAlarm: boolean;
  isEnable: boolean;
  onChange: (name: string, value: boolean) => void;
};

function SettingSwitch({
  label,
  desc,
  name,
  isAlarm,
  isEnable,
  onChange,
}: Props) {
  const [isAlarmAll, setIsAlarmAll] = useState(isAlarm);
  const toggleSwitch = () => {
    setIsAlarmAll(previousState => !previousState);
    onChange(name, !isAlarmAll);
  };

  useEffect(() => {
    console.log('isAlarmAll', isAlarmAll);
  }, [isAlarmAll]);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={[styles.title, !isEnable && styles.disabledText]}>
          {label}
        </Text>
        {desc && (
          <Text style={[styles.desc, !isEnable && styles.disabledText]}>
            {desc}
          </Text>
        )}
      </View>
      <Switch
        disabled={!isEnable}
        trackColor={{
          false: globalColors.stroke2,
          true: isEnable ? globalColors.blue : globalColors.stroke2,
        }}
        thumbColor={
          isEnable ? (isAlarmAll ? 'white' : 'white') : globalColors.stroke2
        }
        ios_backgroundColor="#DDDDDD"
        onValueChange={toggleSwitch}
        value={isAlarmAll}
      />
    </View>
  );
}

export default SettingSwitch;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrapper: {
    textAlign: 'center',
    display: 'flex',
    gap: 5,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  desc: {
    fontSize: 13,
    color: globalColors.stroke2,
  },
  disabledText: {
    color: globalColors.stroke2,
  },
});
