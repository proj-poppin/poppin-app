import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBlueSvg from '../../assets/icons/searchBlue.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InterestSampleSvg from '../../assets/images/interestSample.svg';
import DividerLine from '../../components/DividerLine.tsx';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import OrderSvg from '../../assets/icons/order.svg';
import Text24B from '../../styles/texts/headline/Text24B.ts';
import FilterSettingButton from '../../components/atoms/button/FilterSettingButton.tsx';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';
import SampleInterestPopUpCard from '../../components/molecules/card/SampleInterestPopUpCard.tsx';
import {dummydata} from './dummydata.tsx';

const findOrderTypes = [
  '최근 오픈 순',
  '종료 임박 순',
  '조회 순',
  '최신 업로드 순',
];

const Tab = createMaterialTopTabNavigator();

function OperatingTab() {
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <FilterSettingButton
          onPress={() => {
            console.log('filter');
          }}
        />
        <CustomSelectDropdown
          data={findOrderTypes}
          onSelect={(selectedItem, index) => console.log(selectedItem, index)}
          buttonWidth={120}
          iconComponent={<OrderSvg style={styles.dropdownIcon} />}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          buttonTextStyle={Text14M.text}
        />
      </View>
      <DividerLine height={1} />
      {/* <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      /> */}
      {/* <DividerLine height={1} /> */}
      {dummydata.map(item => {
        return <SampleInterestPopUpCard key={item.id} item={item} />;
      })}
      {/* <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <DividerLine height={1} />
      <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      /> */}
      <DividerLine height={1} />
    </ScrollView>
  );
}

function UpcomingTab() {
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <FilterSettingButton
          onPress={() => {
            console.log('filter');
          }}
        />
        <CustomSelectDropdown
          data={findOrderTypes}
          onSelect={(selectedItem, index) => console.log(selectedItem, index)}
          buttonWidth={120}
          iconComponent={<OrderSvg style={styles.dropdownIcon} />}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          buttonTextStyle={Text14M.text}
        />
      </View>

      <DividerLine height={1} />

      {dummydata.map(item => {
        return <SampleInterestPopUpCard key={item.id} item={item} />;
      })}
      {/* <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      /> */}
    </ScrollView>
  );
}

function ClosedTab() {
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <FilterSettingButton
          onPress={() => {
            console.log('filter');
          }}
        />
        <CustomSelectDropdown
          data={findOrderTypes}
          onSelect={(selectedItem, index) => console.log(selectedItem, index)}
          buttonWidth={120}
          iconComponent={<OrderSvg style={styles.dropdownIcon} />}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          buttonTextStyle={Text14M.text}
        />
      </View>
      <DividerLine height={1} />
      {dummydata.map(item => {
        return <SampleInterestPopUpCard key={item.id} item={item} />;
      })}
      {/* 
      <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <SampleInterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      /> */}
    </ScrollView>
  );
}

function FindScreen() {
  const [selectedTab, setSelectedTab] = useState('operating'); // 'operating', 'upcoming', 'closed'
  return (
    <>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        <View style={styles.headerContainer}>
          <Text style={Text24B.text}>팝업 목록</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('search');
            }}
            style={styles.calendarViewContainer}>
            <SearchBlueSvg />
          </TouchableOpacity>
        </View>

        <Tab.Navigator>
          <Tab.Screen name="운영 중" component={OperatingTab} />
          <Tab.Screen name="오픈 예정" component={UpcomingTab} />
          <Tab.Screen name="운영 종료" component={ClosedTab} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}

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
    marginLeft: 16,
    marginRight: 16,
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
    marginLeft: 5, //small gap between the text and the icon
  },
  dropdownButtonStyle: {
    backgroundColor: 'white', // 버튼 배경색을 흰색으로 설정
    // 필요한 경우 여기에 다른 스타일 추가
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

export default FindScreen;
