// import React, {useState} from 'react';
// import {View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
// import styled from 'styled-components/native';
// import {
//   Menu,
//   MenuTrigger,
//   MenuOptions,
//   MenuOption,
// } from 'react-native-popup-menu';
// import {moderateScale} from '../../Util';
// import SvgWithNameBoxLabel from '../SvgWithNameBoxLabel';
// import {themeColors} from '../../Theme/theme';
// import SortingIcon from 'src/Resource/svg/sorting-icon.svg';
// // 타입 정의
// interface SortingDropdownButtonProps {
//   options: {label: string; value: string}[]; // 선택지 리스트를 받아옵니다
//   defaultOption?: {label: string; value: string}; // 기본 선택지
//   onSelect: (option: {label: string; value: string}) => void; // 선택시 호출될 함수
//   onPress?: () => void; // 눌렀을 때 호출될 함수 (optional)
//   hideIcon?: boolean; // 아이콘 숨기기 옵션
//   buttonStyle?: StyleProp<ViewStyle>; // 버튼 스타일
//   buttonTextStyle?: StyleProp<TextStyle>; // 버튼 텍스트 스타일
//   dropdownStyle?: StyleProp<ViewStyle>; // 드롭다운 스타일
//   rowStyle?: StyleProp<ViewStyle>; // 선택지 스타일
//   rowTextStyle?: StyleProp<TextStyle>; // 선택지 텍스트 스타일
// }
//
// const SortingDropdownButton: React.FC<SortingDropdownButtonProps> = ({
//   options,
//   defaultOption,
//   onSelect,
//   onPress, // onPress 핸들러 추가
//   hideIcon = false, // 아이콘 숨기기 옵션 기본값
//   buttonStyle,
//   buttonTextStyle,
//   dropdownStyle,
//   rowStyle,
//   rowTextStyle,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(
//     defaultOption || options[0], // 기본값 설정
//   );
//
//   const handleSelectOption = option => {
//     setSelectedOption(option);
//     onSelect(option); // 선택된 옵션을 상위 컴포넌트에 전달
//   };
//
//   const renderDropdownIcon = () => {
//     return hideIcon ? null : (
//       <SortingIcon style={{marginHorizontal: moderateScale(5)}} />
//     );
//   };
//
//   return (
//     <Menu>
//       <MenuTrigger
//         onPress={() => {
//           if (onPress) {
//             onPress(); // onPress 핸들러 호출
//           }
//         }}>
//         <View style={[styles.triggerContainer, buttonStyle]}>
//           <SvgWithNameBoxLabel
//             width={moderateScale(70)}
//             label={selectedOption.label}
//             Icon={SortingIcon}
//             isWithoutBorder={true}
//             isBold={false}
//             isSwitchComponentOrder={true}
//             isPressedEnabled={false}
//             textStyle={[{color: themeColors().grey.black}, buttonTextStyle]}
//           />
//           {renderDropdownIcon()}
//         </View>
//       </MenuTrigger>
//
//       {/* 메뉴 옵션 */}
//       <MenuOptions
//         optionsContainerStyle={[styles.optionsContainer, dropdownStyle]}>
//         {options.map((option, index) => (
//           <MenuOption key={index} onSelect={() => handleSelectOption(option)}>
//             <OptionText style={rowTextStyle}>{option.label}</OptionText>
//           </MenuOption>
//         ))}
//       </MenuOptions>
//     </Menu>
//   );
// };
//
// // 스타일 컴포넌트
// const OptionText = styled.Text`
//   font-size: ${moderateScale(14)}px;
//   color: ${themeColors().grey.black};
//   padding: ${moderateScale(10)}px;
// `;
//
// const styles = StyleSheet.create({
//   triggerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   optionsContainer: {
//     borderRadius: 8,
//     backgroundColor: '#ffffff',
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
// });
//
// export default SortingDropdownButton;
