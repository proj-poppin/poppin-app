// import React from 'react';
// import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
// import {themeColors} from '../../Theme/theme';
// import {H2} from '../../StyledComponents/Text'; // 텍스트 스타일 적용
// import {moderateScale} from 'src/Util';
// import {BlankDropdown} from './BlankDropdown.component';
// import {EnumValueWithName} from '../../Object/Type/enum.type';
//
// type CustomDropdownProps = {
//   data: EnumValueWithName[];
//   onSelect: (selectedItem: string, index: number) => void;
//   buttonWidth: number;
//   iconComponent: JSX.Element;
//   buttonTextAfterSelection: (selectedItem: string, index: number) => string;
//   buttonTextStyle?: object;
//   defaultValue?: string;
//   style?: StyleProp<ViewStyle>;
// };
//
// const CustomSelectDropdown: React.FC<CustomDropdownProps> = ({
//   data,
//   onSelect,
//   buttonWidth,
//   iconComponent,
//   buttonTextAfterSelection,
//   buttonTextStyle,
//   defaultValue,
//   style,
// }) => {
//   return (
//     <BlankDropdown
//       data={data}
//       onSelect={onSelect}
//       buttonStyle={[styles.dropdownButtonStyle, {width: buttonWidth}, style]}
//       buttonTextStyle={buttonTextStyle}
//       dropdownStyle={[styles.dropdownStyle, {width: buttonWidth}]}
//       rowTextStyle={{color: themeColors().grey.main, textAlign: 'center'}}
//       props={{
//         defaultButtonText: defaultValue || data[0]?.displayName,
//         buttonTextAfterSelection: buttonTextAfterSelection,
//       }}
//       // renderCustomizedButtonChild={selectedItem => (
//       //   <View style={styles.buttonInnerContainer}>
//       //     <Text style={[styles.buttonText, buttonTextStyle]}>
//       //       {selectedItem || defaultValue || data[0]?.displayName}
//       //     </Text>
//       //     {iconComponent}
//       //   </View>
//       // )}
//     />
//   );
// };
//
// const styles = StyleSheet.create({
//   dropdownButtonStyle: {
//     backgroundColor: 'white',
//     height: 40,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   buttonInnerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   dropdownStyle: {
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontWeight: '600',
//     fontSize: moderateScale(16),
//   },
// });
//
// export default CustomSelectDropdown;
