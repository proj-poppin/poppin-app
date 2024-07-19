import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DismissKeyboardView from '../components/DismissKeyboardView.tsx';
import Text20B from '../styles/texts/title/Text20B.ts';
import Text14M from '../styles/texts/body_medium/Text14M.ts';
import CompleteButton from '../components/atoms/button/CompleteButton.tsx';

function DeleteCompleteScreen() {
  const navigation = useNavigation();
  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.completeContainer}>
        <Text style={Text20B.text}>회원 탈퇴 완료</Text>
        <Text style={[Text14M.text, styles.completeText]}>
          그동안 Poppin을{'\n'}이용해주셔서 감사합니다.
        </Text>
      </View>
      <View style={{paddingTop: 150}}>
        <CompleteButton
          onPress={() => navigation.navigate('MainTabNavigator')}
          title={'완료'}
          buttonStyle={{
            marginTop: 150,
          }}
        />
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 80,
  },
  completeContainer: {
    marginTop: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DeleteCompleteScreen;
