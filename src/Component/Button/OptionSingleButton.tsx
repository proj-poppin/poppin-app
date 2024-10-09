// import React from 'react';
// import {Pressable, Text, StyleSheet, View} from 'react-native';
// import globalColors from '../../styles/color/globalColors.ts';
//
// const OptionSingleButton = ({id, title, onPress, isSelected}) => {
//   const handlePress = () => {
//     onPress(id);
//   };
//
//   return (
//     <Pressable onPress={handlePress}>
//       {({pressed}) => (
//         <View
//           style={[
//             styles.button,
//             {
//               backgroundColor: isSelected ? `${globalColors.blue}1A` : 'white',
//               borderColor: isSelected
//                 ? globalColors.blue
//                 : globalColors.warmGray,
//             },
//           ]}>
//           <Text style={styles.text}>{title}</Text>
//         </View>
//       )}
//     </Pressable>
//   );
// };
//
// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 35,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     margin: 5,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//   },
//   text: {
//     color: 'black',
//     fontSize: 16,
//   },
// });
//
// export default OptionSingleButton;
