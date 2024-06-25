import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import AlarmCard from '../../../components/alarm/AlarmCard.tsx';
import useGetPopupAlarmList from '../../../hooks/alarm/useGetPopupAlarmList.ts';
import globalColors from '../../../styles/color/globalColors.ts';
import Text20B from '../../../styles/texts/title/Text20B.ts';
import NoAlarmSvg from '../../../assets/images/noAlarm.svg';
import BlueDotsThreeSvg from '../../../assets/icons/blueDotsThree.svg';
import CompleteButton from '../../../components/atoms/button/CompleteButton.tsx';

const PopupTab = ({navigation}) => {
  const popupAlarmList = useGetPopupAlarmList();
  return (
    <ScrollView>
      {!popupAlarmList || popupAlarmList.length === 0 ? (
        emptyAlarm(navigation)
      ) : (
        <FlatList
          data={popupAlarmList}
          renderItem={({item}) => {
            return <AlarmCard type="popup" props={item} />;
          }}
        />
      )}
    </ScrollView>
  );
};

const emptyAlarm = navigation => {
  return (
    <ScrollView style={{}}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={[
            Text20B.text,
            {
              paddingTop: 94,
              paddingBottom: 80,
            },
          ]}>
          아직 알림이 없어요!
        </Text>
        <NoAlarmSvg />
        <Text style={[Text20B.text, styles.informationText, {paddingTop: 80}]}>
          마음에 드는 팝업을 저장하면{'\n'}알림을 받아볼 수 있어요!
        </Text>
        <BlueDotsThreeSvg style={styles.svgStyle} />
        <View style={styles.buttonContainer}>
          <CompleteButton
            onPress={() => navigation.navigate('Find')}
            title={'팝업 둘러보러 가기'}
            loading={false}
            disabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgStyle: {},
  informationText: {
    color: globalColors.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default PopupTab;
