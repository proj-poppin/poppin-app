import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import DownBlackSvg from '../../assets/icons/downBlack.svg';
import OrderSvg from '../../assets/icons/order.svg';
import globalColors from '../../styles/color/globalColors';
import DividerLine from '../../components/DividerLine';
import InterestPopUpCard from '../../components/molecules/card/InterestPopUpCard';
import CustomSelectDropdown from '../../components/CustomDropDown';
import Text18B from '../../styles/texts/body_large/Text18B';
import useGetInterestList from '../../hooks/popUpList/useGetInterestList.tsx';
import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
import Animated, {FadeInDown} from 'react-native-reanimated';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx'; // Import Animated and FadeInDown

interface ListViewProps {
  popUpTypes: string[];
  orderTypes: string[];
  selectedPopUpType: string;
  setSelectedPopUpType: (selectedItem: string) => void;
  setSelectedOrderType: (selectedItem: string) => void;
  sortedInterestList: {
    id: number;
    image_url: string;
    name: string;
    close_date: string;
    open_date: string;
    status: 'TERMINATED' | 'OPERATING' | 'NOTYET';
  }[];
  onRefresh: () => void;
  showToast: (message: string) => void; // Add showToast prop
}

const ListView: React.FC<ListViewProps> = ({
  popUpTypes,
  orderTypes,
  selectedPopUpType,
  setSelectedPopUpType,
  setSelectedOrderType,
  sortedInterestList,
  onRefresh,
  showToast, // Destructure showToast prop
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {data, refetch} = useGetInterestList();
  const [currentDate, setCurrentDate] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() is zero-based
    const day = today.getDate();
    setCurrentDate(`${month}월 ${day}일`);
  }, []);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.dropdownContainer}>
        <CustomSelectDropdown
          data={popUpTypes.map(type => ({label: type}))}
          onSelect={selectedItem => setSelectedPopUpType(selectedItem)}
          buttonWidth={150}
          iconComponent={<DownBlackSvg />}
          buttonTextAfterSelection={selectedItem => selectedItem}
          buttonTextStyle={{color: globalColors.font}}
          defaultValue="운영 중인 팝업" // Set the default value
        />
        <CustomSelectDropdown
          data={orderTypes.map(type => ({label: type}))}
          onSelect={setSelectedOrderType}
          buttonWidth={120}
          iconComponent={<OrderSvg />}
          defaultValue="오픈일순" // Set the default value
          buttonTextAfterSelection={selectedItem => selectedItem}
          buttonTextStyle={{color: globalColors.font}}
        />
      </View>
      <Text
        style={[
          Text18B.text,
          {color: globalColors.font},
          styles.bodyContainer,
        ]}>
        {currentDate}
      </Text>
      <DividerLine height={1} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <DismissKeyboardView>
          {sortedInterestList?.length > 0 ? (
            sortedInterestList.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(index * 100)} // Add delay to each item
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PopUpDetail', {
                      id: item.id,
                      isLoggedIn: isLoggedIn,
                    })
                  }>
                  <InterestPopUpCard
                    key={item.id}
                    image_url={item.image_url}
                    name={item.name}
                    close_date={item.close_date}
                    open_date={item.open_date}
                    status={item.status}
                    id={item.id}
                    isInterested={true}
                    showToast={showToast} // Pass showToast prop
                  />
                </TouchableOpacity>
              </Animated.View>
            ))
          ) : (
            <Text style={styles.noItemsText}>조건에 맞는 팝업이 없습니다.</Text>
          )}
        </DismissKeyboardView>
      </ScrollView>
      <DividerLine height={3} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 10,
  },
  listContainer: {
    flex: 1,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
  },
  dropdownButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: globalColors.font,
  },
  rowTextStyle: {
    backgroundColor: globalColors.white,
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownStyle: {
    borderRadius: 210,
  },
});

export default ListView;
