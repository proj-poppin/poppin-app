import React from 'react';
import {View, SafeAreaView, StyleSheet, Text, Pressable} from 'react-native';
import NoLikesSvg from '../../assets/likes/noLikes.svg';
import Text24B from '../../styles/texts/headline/Text24B';
import globalColors from '../../styles/color/globalColors.ts';
import Text20B from '../../styles/texts/title/Text20B.ts';
import {useNavigation} from '@react-navigation/native';

interface NoSavedPopupsComponentProps {
  text?: string;
  buttonText?: string;
  status?: 'OPERATING' | 'NOTYET' | 'TERMINATED';
  isFiltering?: boolean;
}

const NoSavedPopupsComponentZero: React.FC<NoSavedPopupsComponentProps> = ({
  text,
  buttonText,
  status,
  isFiltering = false,
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Find', {status, order: 'OPEN'});
  };

  return (
    <SafeAreaView style={[{flex: 1}]}>
      {!isFiltering && (
        <View style={styles.header}>
          <Text style={[Text24B.text]}>관심 팝업</Text>
        </View>
      )}
      <View style={[styles.content, isFiltering && styles.contentFiltered]}>
        <NoLikesSvg
          style={[{justifyContent: 'center'}, {alignSelf: 'center'}]}
        />
        <View>
          <Text style={styles.text}>
            {text || '저장한 팝업이 없어요🫤\n관심있는 팝업을 저장해 보세요.'}
          </Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={[Text20B.text, {color: globalColors.white}]}>
          {buttonText || '저장하러 가기'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentFiltered: {
    justifyContent: 'flex-end',
    marginBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Pretandard-Semibold',
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    height: 55,
    backgroundColor: globalColors.blue,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 100,
  },
});

export default NoSavedPopupsComponentZero;
