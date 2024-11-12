import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../components/molecules/tab_bar/CustomTabBar.tsx';
import NoticeTab from './tab/NoticeTab.tsx';
import PopupTab from './tab/PopupTab.tsx';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Tab = createMaterialTopTabNavigator();

function AlarmScreen() {
  const [selectedTab, setSelectedTab] = useState('팝업');

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    PushNotificationIOS.setApplicationIconBadgeNumber(0);
  }, []);

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
      <Tab.Screen name="팝업" component={PopupTab} />
      <Tab.Screen name="공지 사항" component={NoticeTab} />
    </Tab.Navigator>
  );
}

export default AlarmScreen;
