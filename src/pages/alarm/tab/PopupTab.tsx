import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import AlarmCard from '../../../components/alarm/AlarmCard.tsx';
import useGetPopupAlarmList from '../../../hooks/alarm/useGetPopupAlarmList.ts';
import globalColors from '../../../styles/color/globalColors.ts';
import Text20B from '../../../styles/texts/title/Text20B.ts';
import NoAlarmSvg from '../../../assets/images/noAlarm.svg';
import BlueDotsThreeSvg from '../../../assets/icons/blueDotsThree.svg';
import CompleteButton from '../../../components/atoms/button/CompleteButton.tsx';

const PopupTab = ({navigation}) => {
  const {popupAlarmList, loading, error, refetch} = useGetPopupAlarmList();
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    refetch();
  }, [refetch]);

  // 새로고침
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!popupAlarmList?.length) {
    return emptyAlarm(navigation);
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        {popupAlarmList?.map(item => (
          <AlarmCard {...item} type="popup" />
        ))}
      </View>
    </ScrollView>
  );
};

const emptyAlarm = navigation => {
  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Text style={[Text20B.text, {paddingTop: 94, paddingBottom: 80}]}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  informationText: {
    color: globalColors.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '85%',
    alignItems: 'center',
    marginBottom: 40,
  },
  svgStyle: {},
});

export default PopupTab;
