import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import {useNavigation} from '@react-navigation/native';
import SkipModal from '../../components/SkipModal.tsx';
import ProgressBarLayout from '../../templates/ProgressBarLayout.tsx';
import PreferenceSectionFirst from '../../components/organisms/middle_select_box/PreferenceSectionFirst.tsx';
import PreferenceSectionSecond from '../../components/organisms/middle_select_box/PreferenceSectionSecond.tsx';
import PreferenceSectionThird from '../../components/organisms/middle_select_box/PreferenceSectionThird.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../../redux/stores';
import userSlice from '../../redux/slices/user.ts';
import usePreferenceSetting from '../../hooks/password/usePreferenceSetting.tsx';
import {RootState} from '../../redux/stores/reducer.ts';
import {useSelector} from 'react-redux';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

type PreferenceScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'SignUpPreferenceSetting'
>;

function SignUpPreferenceSettingScreen({route}) {
  const {nickname} = route.params;
  const {preferences, updatePreference, submitPreferences} =
    usePreferenceSetting();
  const [step, setStep] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<PreferenceScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const handleSkipComplete = () => {
    setModalVisible(false);
    dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
  };

  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );
  console.log(
    '🍉🍉🍉isFinishedPreferenceSetting in screen',
    isFinishedPreferenceSetting,
  );

  useEffect(() => {
    console.log(
      '✅✅✅✅✅isFinishedPreferenceSetting in SignUpPreferenceSettingScreen',
      isFinishedPreferenceSetting,
    );
    if (isFinishedPreferenceSetting) {
      navigation.navigate('MainTabNavigator');
    }
  }, [isFinishedPreferenceSetting, navigation]);

  const handleComplete = () => {
    setModalVisible(false);
    submitPreferences().then(response => {
      if (response.success) {
        dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
        navigation.reset({routes: [{name: 'MainTabNavigator' as never}]});
      }
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View style={{width: 0, height: 0}} />,
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{color: globalColors.font, marginRight: 10}}>
            건너뛰기
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, setModalVisible]);

  const renderSection = () => {
    switch (step) {
      case 1:
        return (
          <PreferenceSectionFirst
            updatePreference={updatePreference}
            preferences={preferences}
            nickname={nickname}
          />
        );
      case 2:
        return (
          <PreferenceSectionSecond
            updatePreference={updatePreference}
            preferences={preferences}
            nickname={nickname}
          />
        );
      case 3:
        return (
          <PreferenceSectionThird
            updatePreference={updatePreference}
            preferences={preferences}
            nickname={nickname}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ProgressBarLayout
      step={step}
      maxStep={3}
      handleBack={() => setStep(step - 1)}
      handleNext={() => setStep(step + 1)}
      onComplete={handleComplete}>
      <ScrollView>{renderSection()}</ScrollView>
      <SkipModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSetNow={handleSkipComplete}
      />
    </ProgressBarLayout>
  );
}

export default SignUpPreferenceSettingScreen;
