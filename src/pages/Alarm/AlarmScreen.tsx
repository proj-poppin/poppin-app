import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalColors from '../../styles/color/globalColors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
function AlarmScreen() {
  return (
    <>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        <View style={styles.headerContainer}>
          <Text>팝업 목록</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('search');
            }}
            style={styles.calendarViewContainer}></TouchableOpacity>
        </View>

        <Tab.Navigator>
          {/* <Tab.Screen name=" 중" component={OperatingTab} />
          <Tab.Screen name="오픈 예정" component={UpcomingTab} /> */}
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  bottomSheetHandle: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  labelSmallBlue: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: globalColors.blue,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  calendarViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginLeft: 5,
  },
  dropdownButtonStyle: {
    backgroundColor: 'white',
  },
  rowTextStyle: {
    backgroundColor: globalColors.white,
  },
  buttonInnerContainer: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 배열
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'flex-start', // 내용물 사이의 공간 동일하게 배분
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownStyle: {
    borderRadius: 10,
  },
});
