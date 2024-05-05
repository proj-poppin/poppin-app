import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AlarmCard from '../../components/alarm/AlarmCard';
import {PopupDummydata, NoticeDummydata} from './dummyData';

const Tab = createMaterialTopTabNavigator();

function AlarmTab() {
  return (
    <View>
      {PopupDummydata.map(item => {
        return <AlarmCard type="popup" elem={item} />;
      })}
    </View>
  );
}

function NoticeTab() {
  return (
    <View>
      {NoticeDummydata.map(item => {
        return <AlarmCard type="notice" elem={item} />;
      })}
    </View>
  );
}

function AlarmScreen() {
  return (
    <Tab.Navigator style={{height: '100%', backgroundColor: 'red'}}>
      <Tab.Screen name=" 알림" component={AlarmTab} />
      <Tab.Screen name="오픈 예정" component={NoticeTab} />
    </Tab.Navigator>
  );
}

export default AlarmScreen;
