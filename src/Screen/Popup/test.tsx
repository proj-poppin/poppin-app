// import React from 'react';
// import {StyleSheet, View, ActivityIndicator} from 'react-native';
// import {SharedElement} from 'react-navigation-shared-element';
// import {useWindowDimensions} from 'react-native';
// import Animated from 'react-native-reanimated';
// import FastImage from 'react-native-fast-image';
//
// const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
//
// const PopUpDetailScreen = ({route}) => {
//   const {id, imageUrl} = route.params;
//   const {width} = useWindowDimensions();
//   const [loading, setLoading] = React.useState(true);
//
//   console.log(`PopUpDetailScreen - Received id: ${id}, imageUrl: ${imageUrl}`);
//   return (
//     <View style={styles.container}>
//       <SharedElement id={`itemPhoto.${id}`}>
//         <AnimatedFastImage
//           sharedTransitionTag={`itemPhoto.${id}`}
//           source={{uri: imageUrl}}
//           style={{width: width, height: width}}
//           resizeMode={FastImage.resizeMode.cover}
//           onLoadEnd={() => setLoading(false)}
//         />
//       </SharedElement>
//       {loading && (
//         <ActivityIndicator
//           size="large"
//           color="#0000ff"
//           style={styles.loadingIndicator}
//         />
//       )}
//     </View>
//   );
// };
//
// PopUpDetailScreen.sharedElements = route => {
//   const {id} = route.params;
//   console.log('PopUpDetailScreen.sharedElements - id:', id);
//   return [`itemPhoto.${id}`];
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   loadingIndicator: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{translateX: -25}, {translateY: -25}],
//   },
// });
//
// export default PopUpDetailScreen;
