import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type NoticeDetailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'NoticeDetail'
>;

interface AlarmCardProps {
  props: AlarmCardInfoProps;
  type: string;
}

interface AlarmCardInfoProps {
  id: number;
  title: string;
  body: string;
  createdAt: number[];
  iconUrl: string;
  isRead: boolean;
}

const AlarmCard: React.FC<AlarmCardProps> = ({props, type}) => {
  const navigation = useNavigation<NoticeDetailScreenNavigationProp>();
  const handlePress = () => {
    if (type === 'notice') {
      navigation.navigate('NoticeDetail', {nid: props.id});
    } else {
      navigation.navigate('PopUpDetail', {id: props.id});
    }
  };
  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.container,
          {backgroundColor: props.isRead ? 'white' : globalColors.purpleLight},
        ]}>
        <View style={styles.leftWrapper}>
          <View style={styles.imgWrapper}>
            <Image
              source={{uri: props.iconUrl}}
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
                  color: props.isRead ? globalColors.stroke2 : 'black',
                },
              ]}>
              {props.title}
            </Text>
            <Text
              style={[
                styles.content,
                type !== 'notice' && {
                  color: props.isRead ? globalColors.stroke2 : 'black',
                },
              ]}>
              {props.body}
            </Text>
          </View>
          <Text style={styles.time}>{convertTime(props.createdAt)}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentsWrapper: {
    width: '80%',
    display: 'flex',
    gap: 5,
  },
  titleWrapper: {
    height: '80%',
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
