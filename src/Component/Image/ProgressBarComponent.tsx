import React from 'react';
import {FastImageContainer} from './FastImage.component';
import {Dimensions, StyleProp, ViewStyle, View} from 'react-native';

type ProgressBarStepComponentHeaderProps = {
  step: 1 | 2 | 3; // 단계 값 제한
  style?: StyleProp<ViewStyle>; // 추가 스타일 속성
};

export const ProgressBarStepComponentHeader: React.FC<
  ProgressBarStepComponentHeaderProps
> = ({step, style}) => {
  const {width} = Dimensions.get('window');

  const renderProgressBar = () => {
    let source;
    switch (step) {
      case 1:
        source = require('src/Resource/png/progress-bar-step-1.png');
        break;
      case 2:
        source = require('src/Resource/png/progress-bar-step-2.png');
        break;
      case 3:
        source = require('src/Resource/png/progress-bar-step-3.png');
        break;
      default:
        return null;
    }

    return (
      <FastImageContainer
        style={[
          {
            width: width * 0.8, // 너비를 화면의 80%로 설정
            height: 10,
            alignSelf: 'center', // 수평 중앙 정렬
          },
          style, // 커스텀 스타일 병합
        ]}
        source={source}
      />
    );
  };

  return (
    <View
      style={{
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
        width: '100%', // 부모 컨테이너 너비
      }}>
      {renderProgressBar()}
    </View>
  );
};
