// import React, {useState, useEffect} from 'react';
// import {Animated, StyleSheet, View, Text} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import globalColors from '../../styles/color/globalColors.ts';
// import Splash1 from '../../assets/images/splash1.svg';
// import Splash2 from '../../assets/images/splash2.svg';
// import Splash3 from '../../assets/images/splash3.svg';
// import Splash4 from '../../assets/images/splash4.svg';
//
// // 첫 번째 화면은 SVG 자체가 없으므로 null 추가, Splash4를 두 번 사용
// const svgs = [null, Splash1, Splash2, Splash3, Splash4, Splash4];
//
// const SplashScreen: React.FC = () => {
//   const [imageIndex, setImageIndex] = useState(0);
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageIndex(prevIndex => (prevIndex + 1) % svgs.length);
//     }, 800); // 화면 전환 간격을 1초로 변경
//
//     return () => clearInterval(interval);
//   }, []);
//
//   const SvgComponent = svgs[imageIndex];
//
//   return (
//     <LinearGradient
//       colors={[globalColors.blue, globalColors.purple]}
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}
//       style={styles.container}>
//       <View style={styles.imageContainer}>
//         {/* SVG 컴포넌트가 null이 아닐 때만 렌더링 */}
//         {SvgComponent && <SvgComponent width="100" height="100" />}
//         {/* 마지막 화면에서 'POPPIN' 텍스트 추가 */}
//         {imageIndex === svgs.length - 1 && (
//           <Text style={styles.popinText}>POPPIN</Text>
//         )}
//       </View>
//     </LinearGradient>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     width: 100,
//     height: 120, // 이미지와 텍스트를 모두 수용할 충분한 높이
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   popinText: {
//     position: 'absolute',
//     bottom: -20,
//     color: 'white',
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
// });
//
// export default SplashScreen;

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
