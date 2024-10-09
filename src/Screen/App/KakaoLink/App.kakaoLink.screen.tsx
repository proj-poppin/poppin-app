import React, {useEffect} from 'react';
import {LinkingOptions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import shallow from 'zustand/shallow';
import {
  // makeFirebaseLogEvent,
  Destination,
  // navigateInAppScreen,
} from 'src/Util';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {useAppStore} from '../../../Zustand/App/app.zustand';
// import {APP_LOGS} from 'src/Constant';

export type KakaoLinkScreenProps = {
  kakaoLinkParams: string;
};

/**
 * 카카오톡 공유하기 링크를 통해 앱에 접근했을 때, 해당 링크를 처리하는 option 설정입니다.
 * 앱에 진입하게 만든 URL 이 prefixes 배열에 포함된 값으로 시작하는 경우, config 정보에 따라 화면을 이동합니다.
 *
 * 예시) 'kakaob3da3a535b2de034b324fbc77be89bc5://kakaolink?key1=value1&key2=value2'
 *   1) 'kakao{네이티브앱 키}://' 로 시작했으므로 config 에 따라 화면 이동 준비
 *   2) prefix 를 제외한 값인 'kakaolink?key1=value1&key2=value2' 의 path 가 'kakaolink' 에 해당하므로 KakaoLinkScreen 으로 이동
 *   3) URL query parameter 는 화면으로 이동하면서 자동으로 전달됨.
 *
 * @reference https://millo-l.github.io/ReactNative-kakao-deep-link/
 */
export const kakaoLinkingOption: LinkingOptions<any> = {
  prefixes: ['kakaob3da3a535b2de034b324fbc77be89bc5://'],
  config: {screens: {KakaoLinkScreen: 'kakaolink'}},
};

/**
 * 카카오톡 공유하기 링크를 통해 앱에 접근했을 때, 해당 링크를 처리하는 화면입니다.
 * (링크를 만드는 방법은 kakao.util.ts 를 참고)
 *
 * 카카오톡 공유하기 기능을 사용한 링크는 `kakao{네이티브앱 키}://kakaolink?key1=value1&key2=value2`로 설정되는데,
 * 이 때 Path 에 해당하는 kakaolink 는 바꿀 수 없고 Path 를 추가할 수도 없습니다.
 *
 * 따라서 `kakao${네이티브앱 키}://kakaolink` 로 시작하는 링크로 접근시 모두 이 화면으로 보내고,
 * (이에 대한 설정은 App.tsx 의 const linking 부분 참조)
 * 자동으로 전달된 parameter 를 분석하여 적절한 화면으로 이동시킵니다.
 *
 * @link https://developers.kakao.com/docs/latest/ko/message/js-link#custom-scheme
 * @author 도형
 */
export const KakaoLinkScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'KakaoLinkScreen'>) => {
  const {setInitialDestination} = useAppStore(
    state => ({setInitialDestination: state.setInitialDestination}),
    shallow,
  );

  const {kakaoLinkParams} = route.params;

  const destination = kakaoLinkParams
    ? (JSON.parse(kakaoLinkParams) as Destination)
    : {};

  const bootstrapped = useAppStore(state => state.bootstrapped);

  useEffect(() => {
    //* 만약 앱 실행시 초기 정보를 가져오지 않았다면, (= 카카오톡 공유하기 링크를 통해 앱이 처음 실행된 경우)
    //* initialDestination 를 설정하고 Splash Screen 으로 이동합니다.
    // if (!bootstrapped) {
    //   makeFirebaseLogEvent(APP_LOGS.open_app_by_kakao(destination));
    //   setInitialDestination(destination);
    //   navigation.replace('SplashScreen', {});
    //   return;
    // }
    //
    // //* 만약 그렇지 않다면, (= 앱이 이미 실행되어 있던 경우)
    // //* 어차피 이 화면은 비어있기 때문에, params 가 존재하든 하지 않든 일단 .goBack() 한 후 목적지로 이동합니다.
    // navigation.goBack();
    // makeFirebaseLogEvent(APP_LOGS.goto_app_by_kakao(destination));
    // if (destination.researchId) {
    //   axiosCountupKakaoShareAccessToResearch(destination.researchId);
    // }
    // if (destination.voteId) {
    //   axiosCountupKakaoShareAccessToVote(destination.voteId);
    // }
    //
    // navigateInAppScreen({navigation, destination});
  }, []);

  return <></>;
};
