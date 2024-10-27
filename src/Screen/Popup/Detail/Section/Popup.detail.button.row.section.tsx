import React, {useState} from 'react';
import {View, StyleSheet, Pressable, GestureResponderEvent} from 'react-native';
import SvgWithNameBoxLabel from 'src/Component/SvgWithNameBoxLabel';
import RealTimeToolTip from 'src/Resource/png/real-time-visitors-alert-tooltip.png';
import QuestionIcon from 'src/Resource/svg/question.svg';
import {moderateScale} from 'src/Util';
import styled from 'styled-components/native';
import {FastImageContainer} from 'src/Component/Image/FastImage.component';
import {themeColors} from 'src/Theme/theme';

interface PopupDetailBottomButtonRowSectionProps {
  onRealTimePress: () => void;
  onVisitPress: () => void;
}

const PopupDetailBottomButtonRowSection: React.FC<
  PopupDetailBottomButtonRowSectionProps
> = ({onRealTimePress, onVisitPress}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => setTooltipVisible(prev => !prev);

  return (
    <View style={styles.bottomBar}>
      <RowSection>
        {/* 실시간 방문자 수 버튼 */}
        <Pressable
          onPress={() => {
            toggleTooltip();
            onRealTimePress();
          }}
          style={styles.visitorButton}>
          <RowContainer>
            <QuestionIcon style={styles.icon} />
            <LabelText>실시간 방문자 수</LabelText>
            <CountText>12명</CountText>
          </RowContainer>
        </Pressable>

        {isTooltipVisible && (
          <TooltipContainer>
            <FastImageContainer
              fitOnHeight
              style={{height: moderateScale(37)}}
              source={require('src/Resource/png/real-time-visitors-alert-tooltip.png')}
            />
          </TooltipContainer>
        )}

        <View style={{width: moderateScale(10)}} />

        {/* 방문하기 버튼 */}
        <SvgWithNameBoxLabel
          height={moderateScale(50)}
          width={moderateScale(175)}
          label="방문하기"
          textStyle={{fontSize: moderateScale(17)}}
          onPress={onVisitPress}
          isWithoutBorder={false}
        />
      </RowSection>
    </View>
  );
};

export default PopupDetailBottomButtonRowSection;

// Styled Components
const RowSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${moderateScale(10)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled.Text`
  font-size: ${moderateScale(12)}px;
  font-weight: 600;
  color: ${themeColors().grey.main};
  margin-right: ${moderateScale(5)}px;
`;

const CountText = styled.Text`
  font-size: ${moderateScale(17)}px;
  font-weight: 700;
  color: ${themeColors().blue.main};
`;

const TooltipContainer = styled.View`
  position: absolute;
  top: -${moderateScale(25)}px;
  left: ${moderateScale(10)}px;
  z-index: 10;
`;

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    width: '100%',
    height: moderateScale(70),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
  },
  visitorButton: {
    width: moderateScale(175),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: themeColors().grey.mild,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: moderateScale(5),
    transform: [{scale: 0.7}],
  },
});
