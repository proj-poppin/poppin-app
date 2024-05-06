import {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';

type Props = {
  label: string;
  desc?: string;
  name: string;
  onChange: (name: string, value: boolean) => void;
};

function SettingSwitch({label, desc, name, onChange}: Props) {
  const [isAlarmAll, setIsAlarmAll] = useState(false);

  const toggleSwitch = () => {
    setIsAlarmAll(previousState => !previousState);
    onChange(name, isAlarmAll);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{label}</Text>
        {desc && <Text style={styles.desc}>{desc}</Text>}
      </View>

      <Switch
        trackColor={{false: globalColors.stroke2, true: globalColors.blue}}
        thumbColor={isAlarmAll ? 'white' : 'white'}
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
});
