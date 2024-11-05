// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import globalColors from '../../styles/color/globalColors';
//
// interface ProgressBarProps {
//   step: number;
// }
//
// const ProgressBar: React.FC<ProgressBarProps> = ({step}) => {
//   const progressBarContainerStyle = {
//     height: 5,
//     backgroundColor: globalColors.warmGray,
//     borderRadius: 20,
//     paddingRight: undefined as number | undefined,
//     paddingLeft: undefined as number | undefined,
//   };
//
//   // Adjust padding based on step
//   if (step === 1) {
//     progressBarContainerStyle.paddingRight = 220;
//   } else if (step === 2) {
//     progressBarContainerStyle.paddingLeft = 110;
//     progressBarContainerStyle.paddingRight = 110;
//   } else if (step === 3) {
//     progressBarContainerStyle.paddingLeft = 220;
//   }
//
//   return (
//     <View style={[styles.progressBarContainer, progressBarContainerStyle]}>
//       <View style={[styles.progressBarFill]} />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   progressBarContainer: {
//     height: 5,
//     backgroundColor: globalColors.warmGray,
//     borderRadius: 20,
//     marginHorizontal: 16,
//   },
//   progressBarFill: {
//     width: '100%',
//     backgroundColor: globalColors.blue,
//     borderRadius: 20,
//     height: '100%',
//   },
// });
//
// export default ProgressBar;
