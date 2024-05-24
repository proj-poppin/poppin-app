import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AlarmCard from '../../components/alarm/AlarmCard';
import {NoticeDummydata} from './dummyData';
import CustomTabBar from '../../components/molecules/tab_bar/CustomTabBar.tsx';
import globalColors from '../../styles/color/globalColors.ts';
import NoAlarmSvg from '../../assets/images/noAlarm.svg';
import Text20B from '../../styles/texts/title/Text20B.ts';
import BlueDotsThreeSvg from '../../assets/icons/blueDotsThree.svg';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';

const Tab = createMaterialTopTabNavigator();

function AlarmTab({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}>
        <Text style={[Text20B.text, {paddingTop: 120, paddingBottom: 80}]}>
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
      </ScrollView>
    </View>
  );
}

function NoticeTab() {
  return (
    <View>
      {NoticeDummydata.map(item => {
        return <AlarmCard key={item.id} type="notice" elem={item} />;
      })}
    </View>
  );
}

function AlarmScreen() {
  const [selectedTab, setSelectedTab] = useState('팝업');

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  return (
    <Tab.Navigator
      tabBar={({state, navigation}) => (
        <CustomTabBar
          state={state}
          navigation={navigation}
          handleTabPress={handleTabPress}
          selectedTab={selectedTab}
        />
      )}>
      <Tab.Screen name="팝업" component={AlarmTab} />
      <Tab.Screen name="공지 사항" component={NoticeTab} />
    </Tab.Navigator>
  );
}

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

export default AlarmScreen;
