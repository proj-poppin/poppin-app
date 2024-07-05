import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import WelcomeSvg from '../../assets/icons/welcome.svg';
import CompleteButton from '../../components/atoms/button/CompleteButton.tsx';
import BlueDotsThreeSvg from '../../assets/icons/blueDotsThree.svg';
import globalColors from '../../styles/color/globalColors.ts';
import ActiveGreyNextButton from '../../components/atoms/button/ActiveGreyNextButton.tsx';

import Text20B from '../../styles/texts/title/Text20B.ts';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';
import {useAppDispatch} from '../../redux/stores';
import userSlice from '../../redux/slices/user.ts';
import usePreferenceSetting from '../../hooks/password/usePreferenceSetting.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/stores/reducer.ts';
import {resetInterests} from '../../redux/slices/interestSlice.ts';

function SignUpSucceedScreen({route, navigation}) {
  const dispatch = useAppDispatch();
  const {nickname} = route.params;
  const {resetPreference} = usePreferenceSetting();
  const handleOnComplete = () => {
    resetPreference();
    navigation.navigate('SignUpPreferenceSetting', {nickname});
  };

  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );

  useEffect(() => {
    dispatch(resetInterests());
    if (isFinishedPreferenceSetting) {
      navigation.navigate('MainTabNavigator');
    }
  }, [isFinishedPreferenceSetting, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}>
        <WelcomeSvg />
        <Text
          style={[Text20B.text, styles.nicknameText]}>{`${nickname}님`}</Text>
        <Text style={[Text20B.text, styles.welcomeText]}>환영해요!</Text>
        <CompleteButton
          onPress={handleOnComplete}
          title="취향 설정하러 가기"
          loading={false}
          disabled={false}
        />
        <BlueDotsThreeSvg style={styles.svgStyle} />
        <Text style={[Text14M.text, styles.informationText]}>
          맞춤형 키워드를 설정하고{'\n'}취향에 꼭 맞는 팝업 스토어 추천을
          받아보세요.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ActiveGreyNextButton
          onPress={() => {
            dispatch(userSlice.actions.setIsFinishedPreferenceProcess(false));
            navigation.reset({routes: [{name: 'MainTabNavigator' as never}]});
          }}
          title="다음에 하기"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  nicknameText: {
    marginTop: 20,
    fontSize: 24,
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  svgStyle: {
    marginVertical: 20,
  },
  informationText: {
    color: globalColors.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default SignUpSucceedScreen;
