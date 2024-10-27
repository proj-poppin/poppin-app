import React from 'react';
import {Dimensions, View} from 'react-native';
import {moderateScale} from 'src/Util';
import {themeColors} from 'src/Theme/theme';

export const PopupDetailDividerSection = () => {
  const screenWidth = Dimensions.get('window').width;
  const segmentWidth = moderateScale(10);
  const segmentHeight = moderateScale(4);
  const numberOfSegments = Math.floor(screenWidth / (segmentWidth * 1.5));

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {Array.from({length: numberOfSegments}).map((_, index) => (
        <View
          key={index}
          style={{
            width: segmentWidth,
            height: segmentHeight,
            backgroundColor: themeColors().grey.component,
            borderRadius: segmentHeight / 2,
          }}
        />
      ))}
    </View>
  );
};
