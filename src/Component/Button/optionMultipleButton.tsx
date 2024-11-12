// import React from 'react';
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import globalColors from '../../styles/color/globalColors.ts';
// import CategoryButtonDeleteSvg from '../../../assets/icons/categoryButtonClose.svg';
//
// interface OptionMultipleButtonProps {
//   id: string;
//   title: string;
//   onPress: (isSelected: boolean) => void;
//   isSelected: boolean;
//   tagDeleteClick?: (id: string) => void;
// }
//
// const OptionMultipleButton: React.FC<OptionMultipleButtonProps> = ({
//   id,
//   title,
//   onPress,
//   isSelected,
//   tagDeleteClick,
// }) => {
//   const handlePress = () => {
//     onPress(!isSelected);
//   };
//
//   return (
//     <Pressable onPress={handlePress}>
//       {isSelected ? (
//         <LinearGradient
//           colors={globalColors.blueToPurpleGradient}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 1}}
//           style={styles.gradientBorder}>
//           <View style={styles.innerContent}>
//             <Text style={styles.selectedText}>{title}</Text>
//             {tagDeleteClick && (
//               <TouchableOpacity onPress={() => tagDeleteClick(id)}>
//                 <CategoryButtonDeleteSvg />
//               </TouchableOpacity>
//             )}
//           </View>
//         </LinearGradient>
//       ) : (
//         <View style={styles.tag}>
//           <Text style={styles.text}>{title}</Text>
//         </View>
//       )}
//     </Pressable>
//   );
// };
//
// const styles = StyleSheet.create({
//   tag: {
//     borderRadius: 30,
//     borderWidth: 1.5,
//     borderColor: globalColors.warmGray,
//     paddingTop: 8,
//     paddingBottom: 8,
//     paddingLeft: 14,
//     paddingRight: 14,
//     margin: 5,
//   },
//   gradientBorder: {
//     borderRadius: 30,
//     padding: 1.5,
//     margin: 5,
//   },
//   innerContent: {
//     borderRadius: 28,
//     backgroundColor: globalColors.blueLight,
//     paddingTop: 8,
//     paddingBottom: 8,
//     paddingLeft: 14,
//     paddingRight: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//   },
//   selectedText: {
//     fontSize: 16,
//   },
// });
//
// export default OptionMultipleButton;
