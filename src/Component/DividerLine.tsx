// // DividerLine.js
// import React from 'react';
// import {View, StyleSheet, ViewStyle} from 'react-native';
// import globalColors from '../styles/color/globalColors.ts';
// import {StyleProp} from 'react-native';
//
// interface DividerLineProps {
//   height?: number;
//   style?: StyleProp<ViewStyle>; // 스타일을 위한 옵셔널 타입 정의
// }
//
// const DividerLine: React.FC<DividerLineProps> = ({height = 1, style}) => {
//   return <View style={[styles.divider, {height}, style]} />;
// };
//
// const styles = StyleSheet.create({
//   divider: {
//     backgroundColor: globalColors.component, // 색상은 globalColors에서 관리
//   },
// });
//
// export default DividerLine;
