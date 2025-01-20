import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {Screen} from 'src/Component/Screen/Screen.component';
import {ScreenHeader} from '../../../Component/View';
import {ProgressBarStepComponentHeader} from '../../../Component/Image/ProgressBarComponent';
import {useUserStore} from '../../../Zustand/User/user.zustand';
import shallow from 'zustand/shallow';
import {moderateScale} from '../../../Util';
import CommonCompleteButton from '../../Popup/Landing/common.complete.button';
import CategorySelectButton from '../../Popup/Landing/category.select.button';
import {
  preferenceKeysForPopupCategory,
  preferenceKeysForPopupInterest,
  preferenceKeysForPopupMate,
  getPreferenceTitle,
} from 'src/Object/preference.enum';
import {useAuthPreferenceSettingScreenStore} from './Auth.preference.zustand';

export interface AuthPreferenceScreenProps {}
export const AuthPreferenceScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'AuthPreferenceScreen'>) => {
  const {user} = useUserStore(state => ({user: state.user}), shallow);
  const {selectedTags, toggleTag, isStepValid, savePreferences} =
    useAuthPreferenceSettingScreenStore();

  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    preferenceKeysForPopupCategory,
    preferenceKeysForPopupInterest,
    preferenceKeysForPopupMate,
  ];

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      const success = await savePreferences();
      if (success) {
        alert('취향 설정이 완료되었습니다!');
        // navigation.navigate('LandingBottomTabNavigator');
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
    navigation.navigate('LandingBottomTabNavigator');
  };

  return (
    <Screen
      fullScreen
      ScreenHeader={
        <>
          <ScreenHeader
            title="나의 취향 설정하기"
            onPressRightComponent={handleSkip}
            RightStyle={{paddingLeft: 36}}
            RightComponents={<SkipText>건너뛰기</SkipText>}
          />
          <ProgressBarStepComponentHeader
            step={currentStep}
            style={{width: '90%', alignItems: 'center'}}
          />
        </>
      }
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: moderateScale(20),
      }}
      ScreenContent={
        <>
          <PreferenceSettingMotivationText>
            {currentStep === 1
              ? `${user?.nickname}님이 \n선호하는 팝업을 알려주세요`
              : currentStep === 2
              ? `${user?.nickname}님의 관심사가 궁금해요`
              : `${user?.nickname}님은\n주로 누구와 팝업에 방문하시나요?`}
          </PreferenceSettingMotivationText>
          <CenterCategoryContainer>
            <MultipleChoicePossibleBlueText>
              *복수 선택 가능
            </MultipleChoicePossibleBlueText>
            <CategoryWrapper>
              {categories[currentStep - 1].map(key => (
                <CategorySelectButton
                  key={key}
                  preferenceKey={key}
                  isSelected={selectedTags[key]}
                  onPress={() => toggleTag(key)}>
                  {getPreferenceTitle(key)}
                </CategorySelectButton>
              ))}
            </CategoryWrapper>
          </CenterCategoryContainer>
          <GreyText>마이페이지에서 언제든지 수정할 수 있어요!</GreyText>
        </>
      }
      BottomButton={
        currentStep === 1 ? (
          <CommonCompleteButton
            onPress={handleNext}
            isDisabled={!isStepValid(currentStep)}
            title="다음"
          />
        ) : (
          <RowButtonContainer>
            <CommonCompleteButton
              isPreviousButton
              style={{width: '48%'}}
              onPress={handlePrevious}
              isDisabled={false}
              title="이전"
            />
            <CommonCompleteButton
              style={{width: '48%'}}
              onPress={handleNext}
              isDisabled={!isStepValid(currentStep)}
              title={currentStep === 3 ? '완료' : '다음'}
            />
          </RowButtonContainer>
        )
      }
    />
  );
};

const CenterCategoryContainer = styled.View`
  margin-top: ${moderateScale(100)}px;
  justify-content: center;
  align-items: center;
`;

const RowButtonContainer = styled.View`
  flex-direction: row;
  margin-top: ${moderateScale(12)}px;
  justify-content: space-between;
`;

const SkipText = styled.Text`
  color: ${({theme}) => theme.color.grey.main};
  font-weight: 500;
`;

const PreferenceSettingMotivationText = styled.Text`
  color: ${({theme}) => theme.color.grey.black};
  font-size: ${moderateScale(24)}px;
  font-weight: 600;
  margin-top: ${moderateScale(20)}px;
  text-align: center;
`;

const MultipleChoicePossibleBlueText = styled.Text`
  color: ${({theme}) => theme.color.blue.main};
  font-size: ${moderateScale(12)}px;
  font-weight: 400;
`;

const GreyText = styled.Text`
  color: ${({theme}) => theme.color.grey.main};
  font-size: ${moderateScale(12)}px;
  font-weight: 400;
  text-align: center;
  margin-top: ${moderateScale(10)}px;
`;

const CategoryWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${moderateScale(8)}px;
  margin: ${moderateScale(16)}px 0;
`;
