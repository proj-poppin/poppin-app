// MainTitle.js
import React from 'react';
import {View, Text} from 'react-native';
import PoppinSvg from '../assets/icons/poppin.svg';
import {globalStyles} from '../style/textStyles.ts';

// @ts-ignore
const MainTitle = ({text1, text2}) => {
  return (
    <View>
      <PoppinSvg />
      <Text style={[globalStyles.headline, {marginTop: 5, marginBottom: 46}]}>
        {text1} {'\n'}
        {text2}
      </Text>
    </View>
  );
};

export default MainTitle;
