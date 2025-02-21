import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../Navigator/App.stack.navigator';
import {Screen} from 'src/Component/Screen/Screen.component';
import {useUserStore} from '../../Zustand/User/user.zustand';
import shallow from 'zustand/shallow';
import {moderateScale} from '../../Util';
import {BlackBackgroundModal} from 'src/Component/Modal';
import {PreferenceSkipModal} from 'src/Component/Modal/Auth.preference.skip.modal';
import PreferenceProgressHeader from './Components/Auth.preference.header';
import PreferenceCategorySelection from './Components/Auth.preference.category.selection';
import PreferenceActionButtons from './Components/Auth.preference.action.button';
import {useAuthPreferenceSetting} from './Hooks/Use.auth.preference.setting';

export interface AuthPreferenceScreenProps {}

export const AuthPreferenceScreen = ({
  navigation,
}: NativeStackScreenProps<AppStackProps, 'AuthPreferenceScreen'>) => {
  const {user} = useUserStore(state => ({user: state.user}), shallow);
  const {
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
  } = useAuthPreferenceSetting(navigation);

  return (
    <>
      <Screen
        fullScreen
        ScreenHeader={
          <PreferenceProgressHeader
            currentStep={currentStep}
            onSkip={handleSkip}
          />
        }
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: moderateScale(20),
        }}
        ScreenContent={
          <PreferenceCategorySelection
            currentStep={currentStep}
            nickname={user?.nickname}
            draftSelectedTags={draftSelectedTags}
            toggleTag={toggleTag}
          />
        }
        BottomButton={
          <PreferenceActionButtons
            currentStep={currentStep}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isStepValid={isStepValid}
          />
        }
      />
      <BlackBackgroundModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        allowIgnore={true}>
        <PreferenceSkipModal
          onSkip={navigateHome}
          onComplete={() => setModalVisible(false)}
        />
      </BlackBackgroundModal>
    </>
  );
};

export default AuthPreferenceScreen;
