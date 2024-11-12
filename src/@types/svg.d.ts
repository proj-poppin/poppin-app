/**
 * #SETTING(svg) typescript에서 svg파일을 직접 가져와서 사용하기 위한 typescript용 세팅
 * @see https://github.com/kristerkari/react-native-svg-transformer#for-react-native-v057-or-newer--expo-sdk-v3100-or-newer
 * @author 도형
 */
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
