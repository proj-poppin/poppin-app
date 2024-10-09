// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import globalColors from '../styles/color/globalColors.ts';
// import {CongestionRate} from '../types/CongestionRate.ts';
//
// interface HorizontalBarChartProps {
//   congestionRatio: number;
//   congestionRate: CongestionRate;
// }
//
// const HorizontalBarChart = ({
//   congestionRatio,
//   congestionRate,
// }: HorizontalBarChartProps) => {
//   const filledWidth = `${congestionRatio}%`;
//   const unfilledWidth = `${100 - congestionRatio}%`;
//
//   // eslint-disable-next-line @typescript-eslint/no-shadow
//   const getColorForCongestionRate = (congestionRate: CongestionRate) => {
//     switch (congestionRate) {
//       case CongestionRate.Low:
//         return globalColors.blue;
//       case CongestionRate.Medium:
//         return globalColors.chartNormal;
//       case CongestionRate.High:
//         return globalColors.red;
//       default:
//         return globalColors.chartNormal;
//     }
//   };
//
//   return (
//     <View style={styles.barContainer}>
//       <View
//         style={[
//           styles.filledSection,
//           {
//             width: filledWidth,
//             backgroundColor: getColorForCongestionRate(congestionRate),
//           },
//         ]}
//       />
//       <View style={[styles.unfilledSection, {width: unfilledWidth}]} />
//     </View>
//   );
// };
//
// // Correct the syntax for defining styles
// const styles = StyleSheet.create({
//   barContainer: {
//     flexDirection: 'row',
//     height: '20%',
//     width: '35%',
//     backgroundColor: globalColors.component,
//     // borderRadius: 5,
//   },
//   filledSection: {
//     height: '100%',
//   },
//   unfilledSection: {
//     backgroundColor: globalColors.component,
//     height: '100%',
//     // borderTopRightRadius: 10,
//     // borderBottomRightRadius: 10,
//   },
// });
//
// export default HorizontalBarChart;
