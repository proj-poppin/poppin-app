import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';

function NoticeDetailScreen() {
  const route = useRoute();
  const {nid} = route.params;
  //   console.log('uid', nid);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>공지사항이 있어요</Text>
      <Text>
        공지사항이 있어요공지사항이 있어요 공지사항이 있어요공지사항이 있어요
        공지사항이 있어요 공지사항이 있어요 공지사항이 있어요 공지사항이 있어요
        공지사항이 있어요 공지사항이 있어요 공지사항이 있어요 공지사항이 있어요
      </Text>
      <Text style={styles.time}>02.01</Text>
    </View>
  );
}

export default NoticeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },

  time: {
    fontSize: 10,
    color: 'gray',
  },
});
