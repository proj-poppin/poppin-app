// import React from 'react';
// import {RouteProp, useRoute} from '@react-navigation/native';
// import {Image, StyleSheet, Text, View} from 'react-native';
// import FastImage from 'react-native-fast-image';
//
// type ParamList = {
//   NoticeDetail: {
//     nid: string; // nid 속성을 정의합니다.
//   };
// };
//
// function NoticeDetailScreen() {
//   const route = useRoute<RouteProp<ParamList, 'NoticeDetail'>>();
//   const {nid} = route.params;
//   const noticeDetail = useGetNoticeDetail(nid);
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{noticeDetail?.title}</Text>
//       <DividerLine />
//       <Text style={styles.body}>{noticeDetail?.body}</Text>
//       <Text style={styles.time}>{noticeDetail?.createdAt}</Text>
//       <View>
//         <FastImage
//           source={{uri: noticeDetail?.posterUrl}}
//           style={styles.noticeImg}
//         />
//       </View>
//     </View>
//   );
// }
//
// export default NoticeDetailScreen;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     gap: 15,
//   },
//   body: {
//     fontSize: 12,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//
//   time: {
//     fontSize: 10,
//     color: 'gray',
//   },
//   noticeImg: {
//     width: '100%',
//     height: 344,
//     borderRadius: 20,
//     backgroundColor: globalColors.warmGray,
//   },
// });
