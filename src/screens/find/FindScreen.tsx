import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import primaryColors from '../../style/primaryColors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBlueSvg from '../../assets/icons/searchBlue.svg';
import {globalStyles} from '../../style/textStyles.ts';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InterestSampleSvg from '../../assets/images/interestSample.svg';
import DividerLine from '../../components/DividerLine.tsx';
import InterestPopUpCard from '../../components/InterestPopUpCard.tsx';
import FilterSvg from '../../assets/icons/filter.svg';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import OrderSvg from '../../assets/icons/order.svg';

const orderTypes = ['오픈일순', '마감일순', '저장순'];

const Tab = createMaterialTopTabNavigator();

function OperatingTab() {
  return (
    <ScrollView>
      <CustomSelectDropdown
        data={orderTypes}
        onSelect={(selectedItem, index) => console.log(selectedItem, index)}
        buttonWidth={100}
        iconComponent={<OrderSvg style={styles.dropdownIcon} />}
        buttonTextAfterSelection={(selectedItem, index) => selectedItem}
        buttonTextStyle={globalStyles.labelPrimary}
      />
      <DividerLine height={1} />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <DividerLine height={1} />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <DividerLine height={1} />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <DividerLine height={1} />
    </ScrollView>
  );
}

function UpcomingTab() {
  return (
    <ScrollView>
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
    </ScrollView>
  );
}

function ClosedTab() {
  return (
    <ScrollView>
      <DividerLine height={3} />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
      <InterestPopUpCard
        Svg={InterestSampleSvg}
        title="팝업 스토어 이름1"
        date="2024.01.01-2024.02.02"
        status={'운영 중'}
      />
    </ScrollView>
  );
}

function FindScreen() {
  const [selectedTab, setSelectedTab] = useState('operating'); // 'operating', 'upcoming', 'closed'

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: primaryColors.white,
        paddingHorizontal: 20,
      }}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.headline}>팝업 목록</Text>
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
    width: '100%', // Ensure the container takes the full width
    paddingHorizontal: 16, // Add some padding
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
    color: primaryColors.blue,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 10,
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
    backgroundColor: primaryColors.white,
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
    borderRadius: 10, // 모서리 둥글기 적용
    // 필요한 경우 여기에 추가 스타일 설정
  },
});

export default FindScreen;
