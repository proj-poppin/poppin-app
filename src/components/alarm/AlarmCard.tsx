import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

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

type NoticeDetailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'NoticeDetail'
>;
const AlarmCard = ({type, elem}: Props) => {
  const navigation = useNavigation<NoticeDetailScreenNavigationProp>();

  const handlePress = () => {
    if (type === 'notice') {
      navigation.navigate('NoticeDetail', {nid: elem.id});
    }
  };
  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.container,
          {backgroundColor: elem.isRead ? 'white' : globalColors.purpleLight},
        ]}>
        <View style={styles.leftWrapper}>
          <View style={styles.imgWrapper}></View>
        </View>
        <View style={styles.contentsWrapper}>
          <View style={styles.titleWrapper}>
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
    </Pressable>
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
