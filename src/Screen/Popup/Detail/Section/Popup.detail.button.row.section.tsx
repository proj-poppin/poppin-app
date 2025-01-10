import React, {useState} from 'react';
import SvgWithNameBoxLabel from 'src/Component/SvgWithNameBoxLabel';
import QuestionIcon from 'src/Resource/svg/question.svg';
import {moderateScale} from 'src/Util';
import styled from 'styled-components/native';
import {FastImageContainer} from 'src/Component/Image/FastImage.component';
import {themeColors} from 'src/Theme/theme';
import PopupDetailVisitButton from './Popup.detail.visit.button';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';

interface PopupDetailBottomButtonRowSectionProps {
  onRealTimePress: () => void;
  onVisitPress: () => void;
}

const PopupDetailBottomButtonRowSection: React.FC<
  PopupDetailBottomButtonRowSectionProps
> = ({onRealTimePress, onVisitPress}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const {popupDetail, visitButtonType} = usePopupDetailContext();

  const toggleTooltip = () => setTooltipVisible(prev => !prev);

  return (
    <BottomBar>
      <RowSection>
        {/* 실시간 방문자 수 버튼 */}
        <VisitorButton
          onPress={() => {
            toggleTooltip();
            onRealTimePress();
          }}>
          <RowContainer>
            <QuestionIcon
              style={{marginRight: moderateScale(5), transform: [{scale: 0.7}]}}
            />
            <LabelText>실시간 방문자 수</LabelText>
            <CountText />
          </RowContainer>
        </VisitorButton>

        {isTooltipVisible && (
          <TooltipContainer>
            <FastImageContainer
              fitOnHeight
              style={{height: moderateScale(37)}}
              source={require('src/Resource/png/real-time-visitors-alert-tooltip.png')}
            />
          </TooltipContainer>
        )}

        {/* 방문하기 버튼 */}
        <Spacer />
        <PopupDetailVisitButton
          onPress={onVisitPress}
          visitButtonType={visitButtonType}
        />
      </RowSection>
    </BottomBar>
  );
};

export default PopupDetailBottomButtonRowSection;

// Styled Components
const BottomBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: white;
  border-radius: ${moderateScale(25)}px;
  border-top-width: 1px;
  border-top-color: white;
  padding: 0;
  position: absolute;
  bottom: 0;
`;

const RowSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${moderateScale(10)}px;
`;

const VisitorButton = styled.Pressable`
  width: ${moderateScale(175)}px;
  height: ${moderateScale(50)}px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-width: 1px;
  border-color: ${themeColors().grey.mild};
  background-color: white;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled.Text`
  font-size: ${moderateScale(12)}px;
  font-weight: 500;
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

const Spacer = styled.View`
  width: ${moderateScale(10)}px;
`;
