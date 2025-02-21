import {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AppStackProps } from 'src/Navigator/App.stack.navigator';
import {useAuthPreferenceSettingScreenStore} from '../Zustand/Auth.preference.zustand';

export const useAuthPreferenceSetting = (
  navigation: NativeStackNavigationProp<AppStackProps, 'AuthPreferenceScreen'>,
) => {
  const {draftSelectedTags, toggleTag, isStepValid, savePreferences} =
    useAuthPreferenceSettingScreenStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      const success = await savePreferences();
      if (success) {
        alert('취향 설정이 완료되었습니다!');
        navigation.navigate('LandingBottomTabNavigator');
      } else {
        alert('취향 설정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setModalVisible(true); // 모달 열기
  };

  const navigateHome = () => {
    setModalVisible(false); // 모달 닫기
    navigation.navigate('LandingBottomTabNavigator'); // 홈으로 이동
  };

  return {
    currentStep,
    modalVisible,
    setModalVisible,
    draftSelectedTags,
    toggleTag,
    isStepValid,
    handleNext,
    handlePrevious,
    handleSkip,
    navigateHome,
  };
};