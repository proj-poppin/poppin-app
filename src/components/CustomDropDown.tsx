import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import globalColors from '../styles/color/globalColors';
import Text14M from '../styles/texts/body_medium/Text14M';

type CustomSelectDropdownProps = {
  data: {label: string}[];
  onSelect: (selectedItem: string, index: number) => void;
  buttonWidth: number;
  iconComponent: JSX.Element;
  buttonTextAfterSelection: (selectedItem: string, index: number) => string;
  buttonTextStyle?: object;
};

const CustomSelectDropdown: React.FC<CustomSelectDropdownProps> = ({
  data,
  onSelect,
  buttonWidth,
  iconComponent,
  buttonTextAfterSelection,
  buttonTextStyle,
}) => {
  return (
    <SelectDropdown
      data={data.map(item => item.label)}
      onSelect={onSelect}
      buttonTextAfterSelection={buttonTextAfterSelection}
      rowTextForSelection={(item, index) => item}
      dropdownStyle={[
        styles.dropdownStyle,
        {width: buttonWidth}, // Set dropdown width dynamically
      ]}
      buttonStyle={[styles.dropdownButtonStyle, {width: buttonWidth}]}
      rowTextStyle={{color: globalColors.font, textAlign: 'center'}}
      renderCustomizedButtonChild={(selectedItem, index) => (
        <View style={styles.buttonInnerContainer}>
          <Text style={[Text14M.text, buttonTextStyle, styles.buttonText]}>
            {selectedItem || data[0].label}
          </Text>
          {iconComponent}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    backgroundColor: 'white', // Set button background color to white
    height: 40, // Set a fixed height for the button
    justifyContent: 'center', // Center the content vertically
    paddingHorizontal: 10, // Add some padding to the sides
  },
  buttonInnerContainer: {
    flexDirection: 'row', // Align text and icon horizontally
    alignItems: 'center', // Center align vertically
    gap: 5, // Add some space between text and icon
    width: '100%', // Ensure the content takes full width
  },
  dropdownStyle: {
    borderRadius: 10, // Rounded corners for the dropdown
  },
  buttonText: {
    color: globalColors.black, // Ensure text color is set to font color
    fontWeight: '600',
    fontSize: 16, // Set font size to 14
  },
});

export default CustomSelectDropdown;
