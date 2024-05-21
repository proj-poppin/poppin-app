import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DownBlackSvg from '../../assets/icons/downBlack.svg';
import OrderSvg from '../../assets/icons/order.svg';
import globalColors from '../../styles/color/globalColors';
import DividerLine from '../../components/DividerLine';
import InterestPopUpCard from '../../components/molecules/card/InterestPopUpCard';
import CustomSelectDropdown from '../../components/CustomDropDown';
import Text18B from '../../styles/texts/body_large/Text18B';

interface ListViewProps {
  popUpTypes: string[];
  orderTypes: string[];
  setSelectedPopUpType: (selectedItem: string) => void;
  setSelectedOrderType: (selectedItem: string) => void;
  sortedInterestList: {
    id: number;
    image_url: string;
    name: string;
    close_date: string;
    open_date: string;
    status: string;
  }[];
}

const ListView: React.FC<ListViewProps> = ({
  popUpTypes,
  orderTypes,
  setSelectedPopUpType,
  setSelectedOrderType,
  sortedInterestList,
}) => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View style={styles.dropdownContainer}>
        <CustomSelectDropdown
          data={popUpTypes.map(type => ({label: type}))}
          onSelect={(selectedItem, index) => setSelectedPopUpType(selectedItem)}
          buttonWidth={150}
          iconComponent={<DownBlackSvg />}
          buttonTextAfterSelection={selectedItem => selectedItem}
          buttonTextStyle={{color: globalColors.font}}
        />

        <View style={{width: 100}} />
        <CustomSelectDropdown
          data={orderTypes.map(type => ({label: type}))}
          onSelect={setSelectedOrderType}
          buttonWidth={150}
          iconComponent={<OrderSvg />}
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
        1월 15일
      </Text>
      <DividerLine height={1} />
      <View style={styles.listContainer}>
        {sortedInterestList?.length > 0 ? (
          sortedInterestList.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate('PopUpDetail', {id: item.id})}>
              <InterestPopUpCard
                key={item.id}
                image_url={item.image_url}
                name={item.name}
                close_date={item.close_date}
                open_date={item.open_date}
                status={item.status}
                id={item.id}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noItemsText}>조건에 맞는 팝업이 없습니다.</Text>
        )}
      </View>
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
    marginBottom: 10,
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
    backgroundColor: 'white', // Set button background color to white
    borderRadius: 20,
    height: 40, // Set a fixed height for the button
    justifyContent: 'center', // Center the content vertically
    paddingHorizontal: 10, // Add some padding to the sides
    borderWidth: 1, // Add border width for better visibility
    borderColor: globalColors.font, // Border color
  },
  rowTextStyle: {
    backgroundColor: globalColors.white,
  },
  buttonInnerContainer: {
    flexDirection: 'row', // Align text and icon horizontally
    alignItems: 'center', // Center align vertically
    justifyContent: 'flex-start', // Distribute space between text and icon
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownStyle: {
    borderRadius: 210,
  },
});

export default ListView;
