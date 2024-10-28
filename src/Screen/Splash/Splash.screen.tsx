import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {
  SplashScreenProvider,
  useSplashScreenContext,
} from './Splash.screen.provider';
import {SectionContainer} from 'src/Unit/View';
import {FastImageContainer} from 'src/Component/Image/FastImage.component';
import {openAppStore} from 'src/Util/service.util';
import {moderateScale} from 'src/Util';
import {H2} from 'src/StyledComponents/Text';
import {Screen} from 'src/Component/Screen/Screen.component';
import {themeColors} from 'src/Theme/theme';
/**
 * 카카오톡 공유하기 링크를 통해 앱을 최초로 실행하면서 접근한 경우,
 * Splash Screen 을 먼저 거치지 않고 Linking.kakao.screen.tsx 로 이동하게 됩니다.
 * (App.tsx#NavigationContainer 의 linking 설정 참고)
 *
 * 그러나 앱이 정상적으로 동작하기 위해서는 Splash Screen 을 거치며 앱 최초 정보를 로드해야 하므로,
 * Linking.kakao.screen.tsx 으로 이동했을 때 앱 최초 정보를 가져온 적이 없다면
 * 전달 받은 파라미터를 그대로 전달하면서 Splash Screen 으로 이동합니다.
 *
 * Splash Screen 을 통해 bootStrap 이 완료된 후엔,
 * 다시 파라미터를 그대로 가지고 Linking.kakao.screen.tsx 로 넘어갑니다.
 *
 * @author 도형
 */
export type SplashScreenProps = {};

export function SplashScreen(
  screenProps: NativeStackScreenProps<AppStackProps, 'SplashScreen'>,
) {
  return (
    <SplashScreenProvider screenProps={screenProps}>
      <SplashScreenContainer />
    </SplashScreenProvider>
  );
}

/**
 * 앱 최초 실행시
 * or 장시간(1시간 이상) 앱 백그라운드 상태 이후 복귀 시
 * or (안드로이드) 홈 랜딩에서 뒤로 가기 버튼을 눌러 앱 종료 후 복귀 시
 * 앱 정보를 가져오는 동안 보여주는 스플래시 화면입니다.
 *
 * 이 화면에서 수행하는 일은 다음과 같습니다:
 *   1. 앱 부트스트래핑 (최신 프로젝트, 투표, 공지 내용 등을 가져옵니다)
 *   2. 자동 로그인이 설정되어 있는 경우, 자동 로그인을 시행합니다.
 *   (1., 2. 는 하나의 함수를 통해 실행)
 *   // 3. 앱 상태 (active / background) 변화를 감지하고,
 *
 * @author 도형
 */
export function SplashScreenContainer() {
  const {loading, bootstrap} = useSplashScreenContext();

  // useMemo(() => {
  //   bootstrap().then(r => r);
  // }, [bootstrap]);

  useEffect(() => {
    bootstrap();

    return () => {};
  }, []);

  return (
    <Screen
      fullScreen
      ScreenContent={
        <SectionContainer fullPage style={{position: 'relative'}}>
          <FastImageContainer
            source={require('src/Resource/png/Splash/splash-screen-image.png')}
          />
          {loading ? (
            <LoadingDescription />
          ) : (
            <ErrorDescription bootstrap={bootstrap} />
          )}
        </SectionContainer>
      }
    />
  );
}

function LoadingDescription() {
  return (
    <LoadingState__Container>
      <LoadingText>{'앱 정보를 가져오는 중.. '}</LoadingText>
      <ActivityIndicator size="small" color={themeColors().grey.white} />
    </LoadingState__Container>
  );
}

function ErrorDescription({bootstrap}: {bootstrap: () => Promise<void>}) {
  return (
    <ErrorState__Container>
      <ErrorTextRow>
        <ErrorText>{'앱 정보를 가져오는 중 오류가 발생했습니다'}</ErrorText>
      </ErrorTextRow>
      <ErrorTextRow>
        <ErrorUnderlineText
          style={{textDecorationColor: themeColors().grey.white}}
          onPress={openAppStore}>
          앱 업데이트
        </ErrorUnderlineText>
        <ErrorText>{' 혹은 '}</ErrorText>
        <ErrorUnderlineText
          style={{textDecorationColor: themeColors().grey.white}}
          onPress={bootstrap}>
          다시 시도
        </ErrorUnderlineText>
        <ErrorText>{'하기'}</ErrorText>
      </ErrorTextRow>
    </ErrorState__Container>
  );
}

const LoadingState__Container = styled.View`
  position: absolute;
  bottom: 160px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled(H2)`
  color: ${({theme}) => theme.color.grey.white};
  margin-bottom: ${moderateScale(16)}px;
`;

const ErrorState__Container = styled(LoadingState__Container)``;

const ErrorText = styled(H2)`
  color: ${({theme}) => theme.color.grey.white};
`;

const ErrorTextRow = styled.View`
  flex-direction: row;
  margin-bottom: ${moderateScale(12)}px;
`;

const ErrorUnderlineText = styled(ErrorText)`
  font-weight: bold;
  text-decoration: underline;
`;
