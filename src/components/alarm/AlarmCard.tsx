import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';

type Props = {
  elem: {
    id: number;
    icon: string;
    title: string;
    content: string;
    createdAt: string;
    isRead: boolean;
  };
  type: string;
};
const AlarmCard = ({type, elem}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: elem.isRead ? 'white' : globalColors.purpleLight},
      ]}>
      <View style={styles.leftWrapper}>
        <View style={styles.imgWrapper}></View>
      </View>
      <View style={styles.contentsWrapper}>
        <View style={{height: '80%', display: 'flex', gap: 5}}>
          <Text
            style={[
              styles.title,
              type !== 'notice' && {
                color: elem.isRead ? globalColors.stroke2 : 'black',
              },
            ]}>
            {elem.title}
          </Text>
          <Text
            style={[
              styles.content,
              type !== 'notice' && {
                color: elem.isRead ? globalColors.stroke2 : 'black',
              },
            ]}>
            {elem.content}
          </Text>
        </View>
        <Text style={styles.time}>{elem.createdAt}</Text>
      </View>
    </View>
  );
};

export default AlarmCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    height: 80,
    marginBottom: 5,
    backgroundColor: globalColors.purpleLight,
    gap: 10,
  },
  leftWrapper: {
    height: '100%',

    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgWrapper: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  contentsWrapper: {
    width: '80%',
    display: 'flex',
    gap: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    fontSize: 12,
  },
  time: {
    fontSize: 10,
    color: 'gray',
  },
});
