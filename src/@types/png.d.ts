/**
 * ReactNative 에서 png 파일을 직접 import하여 사용할 수 있도록 합니다.
 * @see https://stackoverflow.com/questions/51100401/typescript-image-import
 * @author 도형
 */
declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
