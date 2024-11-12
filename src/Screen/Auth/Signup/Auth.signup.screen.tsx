import React from 'react';
import {
  SignupScreenProvider,
  SignupScreenState,
  useSignupContext,
} from './Auth.signup.provider';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {SignupScreenHeader} from './Auth.signup.screenHeader';
import {BackHandler, View} from 'react-native';
import {SignupGuideTextSection} from './Section/Auth.signup.guideText.section';
import {SignupPage} from './Page/Auth.signup.page';

export type SignupScreenProps = {
  initialSignupState?: Partial<SignupScreenState>;
  popWhenCanceled?: number;
  popWhenSucceed?: number;
};

export function SignupScreen(
  screenProps: NativeStackScreenProps<AppStackProps, 'SignupScreen'>,
) {
  return (
    <SignupScreenProvider screenProps={screenProps}>
      <SignupScreenContainer {...screenProps} />
    </SignupScreenProvider>
  );
}

/**
 * 회원가입 화면입니다.
 *
 * @author 도형
 */
export const SignupScreenContainer = ({
  route,
}: NativeStackScreenProps<AppStackProps, 'SignupScreen'>) => {
  const {handleSignupStart, handleBackButton} = useSignupContext();

  useEffect(() => {
    handleSignupStart({initialState: route.params.initialSignupState});
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => {
      subscription.remove();
    };
  }, [handleBackButton]);

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <SignupScreenHeader />
      <SignupGuideTextSection />
      <SignupPage />
      {/*<SignupModal />*/}
    </View>
  );
};
