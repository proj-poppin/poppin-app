import {Dimensions} from 'react-native';
export const {width: deviceWidth, height: deviceHeight} =
  Dimensions.get('window');

// S21 Ultra 사이즈 (실제: 384, 826.666..)
const guidelineWidth: number = 385;
const guidelineHeight = 827;

export const widthScale = (size: number) =>
  (~~((deviceWidth / guidelineWidth) * 100) / 100) * size;
export const verticalScale = (size: number) =>
  (~~((deviceHeight / guidelineHeight) * 100) / 100) * size;

/**
 * @important
 * 적용하려는 크기 (View 의 가로/세로 길이, 글꼴 크기, padding 및 margin 값 등)
 * 를 디바이스 크기에 맞게 적절히 조정해주는 함수입니다.
 * @refernce https://medium.com/soluto-engineering/size-matters-5aeeb462900a
 * @author 도형
 */
export const moderateScale = (size: number, factor = 0.7) =>
  size + (widthScale(size) - size) * factor;
