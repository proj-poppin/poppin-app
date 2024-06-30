import React from 'react';
import {View, SafeAreaView, StyleSheet, Text, Pressable} from 'react-native';
import NoLikesSvg from '../../assets/likes/noLikes.svg';
import Text24B from '../../styles/texts/headline/Text24B';
import globalColors from '../../styles/color/globalColors.ts';
import Text20B from '../../styles/texts/title/Text20B.ts';
import {useNavigation} from '@react-navigation/native';

const NoSavedPopupsComponent = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Find');
  };

  return (
    <SafeAreaView style={[{flex: 1}]}>
      <View style={styles.header}>
        <Text style={[Text24B.text]}>관심 팝업</Text>
      </View>
      <View style={styles.content}>
        <NoLikesSvg
          style={[{justifyContent: 'center'}, {alignSelf: 'center'}]}
        />
        <View>
          <Text style={styles.text}>
            {'저장한 팝업이 없어요🫤'} {'\n'}
            {'관심있는 팝업을 저장해 보세요.'}
          </Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={[Text20B.text, {color: globalColors.white}]}>
          저장하러 가기
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
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

export default NoSavedPopupsComponent;
