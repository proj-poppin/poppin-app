import {useState} from 'react';
import {Text, Switch, View, StyleSheet} from 'react-native';
import SettingSwitch from '../../components/alarm/SettingSwitch';
import globalColors from '../../styles/color/globalColors';

function AlaramSettingScreen() {
  const [isAlarmAll, setIsAlarmAll] = useState(false);

  const toggleSwitch = () => {
    setIsAlarmAll(previousState => !previousState);
  };

  const onChange = (name: string, value: boolean) => {};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>기본 알림</Text>
        </View>
        <SettingSwitch label="푸시 알림" name="push" onChange={onChange} />
        <SettingSwitch
          label="야간 푸시 알림(21시~08시)"
          name="nightPush"
          onChange={onChange}
        />
      </View>
      <View style={styles.diver} />

      <View style={styles.content}>
        <View>
          <Text style={styles.label}>활동 알림</Text>
        </View>
        <SettingSwitch
          label="도움이 된 후기"
          desc="내가 작성한 후기에 추천이 달리면 알려드려요"
          name="feedback"
          onChange={onChange}
        />
        <SettingSwitch
          label="관심 팝업 오픈"
          desc="관심 등록한 팝업이 오픈되면 알려드려요"
          name="favorite"
          onChange={onChange}
        />
        <SettingSwitch
          label="관심 팝업 마감 D-1"
          desc="관심 등록한 팝업 D-1알려드려요"
          name="favoriteDeadline"
          onChange={onChange}
        />
        <SettingSwitch
          label="관심 팝업 정보 변경"
          desc="관심 등록한 팝업 정보가 업데이트되면 알려드려요"
          name="favoriteEdite"
          onChange={onChange}
        />
      </View>
    </View>
  );
}

export default AlaramSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    gap: 20,
  },
  content: {
    padding: 15,
    display: 'flex',
    gap: 15,
  },
  diver: {
    width: '100%',
    height: 10,
    backgroundColor: globalColors.warmGray,
  },

  label: {
    color: globalColors.stroke2,
  },
});
