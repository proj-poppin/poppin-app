// styles.js
import {StyleSheet} from 'react-native';
import Colors from './primaryColors.ts';
import primaryColors from './primaryColors.ts';
import PrimaryColors from './primaryColors.ts';

export const globalStyles = StyleSheet.create({
  bottomNavigationTab: {
    fontFamily: 'Pretandard-Bold',
    fontSize: 12,
    fontWeight: '700',
  },
  headline: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  title: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  bodyLargePrimaryBlack: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  bodyLargePrimaryBlue: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 18,
    fontWeight: '600',
    color: PrimaryColors.blue,
    marginTop: 5,
  },
  bodyLargePrimaryGray: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 18,
    fontWeight: '600',
    color: primaryColors.font,
    marginTop: 5,
  },
  bodyLargeSub: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 18,
    fontWeight: '300',
    color: Colors.black,
  },
  bodyMediumPrimary: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  bodyMediumSub: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 14,
    fontWeight: '300',
    color: Colors.black,
  },
  labelPrimary: {
    fontFamily: 'Pretandard-Bold',
    fontSize: 15,
    fontWeight: '400',
    color: Colors.black,
  },
  labelPrimaryGray: {
    fontFamily: 'Pretandard-Bold',
    fontSize: 15,
    fontWeight: '400',
    color: primaryColors.font,
  },
  labelSubGray: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 13,
    fontWeight: '300',
    color: primaryColors.font,
  },
  labelSub: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: Colors.black,
  },
  labelSubStroke: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: primaryColors.stroke2,
  },
});
