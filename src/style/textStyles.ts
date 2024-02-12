// styles.js
import {StyleSheet} from 'react-native';
import Colors from './primaryColors.ts';
import primaryColors from './primaryColors.ts';

export const globalStyles = StyleSheet.create({
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
  bodyLargePrimary: {
    fontFamily: 'Pretandard-Semibold',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
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
    fontSize: 12,
    fontWeight: '700',
    color: Colors.black,
  },
  labelPrimary: {
    fontFamily: 'Pretandard-Bold',
    fontSize: 12,
    fontWeight: '700',
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
