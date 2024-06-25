import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../components/molecules/tab_bar/CustomTabBar.tsx';
import globalColors from '../../styles/color/globalColors.ts';
import NoticeTab from './tab/NoticeTab.tsx';
import PopupTab from './tab/PopupTab.tsx';

const Tab = createMaterialTopTabNavigator();

function AlarmScreen() {
  const [selectedTab, setSelectedTab] = useState('팝업');

  const handleTabPress = (tab: any) => {
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
      <Tab.Screen name="팝업" component={PopupTab} />
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
