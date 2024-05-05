import {useState} from 'react';
import {Text, Switch, View, StyleSheet} from 'react-native';
import SettingSwitch from '../../components/alarm/SettingSwitch';

function AlaramSettingScreen() {
  const [isAlarmAll, setIsAlarmAll] = useState(false);

  const toggleSwitch = () => {
    setIsAlarmAll(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.alarmAll}>
        <SettingSwitch label="알림 전체 끄기" />
      </View>
      <View>
        <Text>기본 알림</Text>
      </View>
      <SettingSwitch label="푸시 알림" />
      <SettingSwitch label="야간 푸시 알림(21시~08시)" />
      <View>
        <Text>기본 알림</Text>
      </View>
      <SettingSwitch label="도움이 된 후기" />
      <SettingSwitch label="관심 팝업 오픈" />
      <SettingSwitch label="관심 팝업 마감 D-1" />
      <SettingSwitch label="관심 팝업 정보 변경" />
    </View>
  );
}

export default AlaramSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 20,
  },
  alarmAll: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
    backgroundColor: 'skyblue',
    padding: 15,
    borderRadius: 100,
  },
});
