import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import FastImage from 'react-native-fast-image';

type NoticeDetailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'NoticeDetail'
>;

interface AlarmCardProps {
  id: number;
  alarmId: number;
  title: string;
  body: string;
  createdAt: number[];
  iconUrl: string;
  isRead: boolean;
  type: string;
}

const AlarmCard: React.FC<AlarmCardProps> = ({
  id,
  alarmId,
  title,
  body,
  createdAt,
  iconUrl,
  isRead,
  type,
}) => {
  const navigation = useNavigation<NoticeDetailScreenNavigationProp>();

  const loggedIn = useIsLoggedIn();

  const handlePress = () => {
    if (type === 'notice') {
      navigation.navigate('NoticeDetail', {nid: id});
    } else {
      navigation.navigate('PopUpDetail', {
        id: id,
        alarmId: alarmId,
        name: title,
        isAlarm: true,
        isLoggedIn: loggedIn,
      });
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.container,
          {backgroundColor: isRead ? 'white' : globalColors.purpleLight},
        ]}>
        <View style={styles.leftWrapper}>
          <View style={styles.imgWrapper}>
            <FastImage
              source={{uri: iconUrl}}
              style={{width: 28, height: 28, borderRadius: 100}}
            />
          </View>
        </View>
        <View style={styles.contentsWrapper}>
          <View style={styles.titleWrapper}>
            <Text
              style={[
                styles.title,
                type !== 'notice' && {
                  color: isRead ? globalColors.stroke2 : 'black',
                },
              ]}>
              {title}
            </Text>
            <Text
              style={[
                styles.content,
                type !== 'notice' && {
                  color: isRead ? globalColors.stroke2 : 'black',
                },
              ]}>
              {body}
            </Text>
          </View>
          <Text style={styles.time}>{convertTime(createdAt)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const convertTime = (time: number[]) => {
  return `${time[0]}년 ${time[1]}월 ${time[2]}일`;
};

export default AlarmCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    height: 80,
    marginBottom: 5,
    gap: 10,
  },
  leftWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgWrapper: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentsWrapper: {
    width: '80%',
    gap: 5,
  },
  titleWrapper: {
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
