import React, {useState} from 'react';
import InfoSvg from 'src/Resource/svg/info-icon.svg';
import styled from 'styled-components/native';
import {H4, DetailText, SmallText} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';

/**
 * 앱 업데이트 유도 모달 및 강제 페이지에서
 * '!업데이트에 어려움이 있나요?' 파트
 * @author 도형
 */
export function UpdateGuide() {
  const [showMessage, setShowMessage] = useState(false);

  const onPressOpen = () => {
    setShowMessage(!showMessage);
  };
  const onPressClose = () => {
    setShowMessage(false);
  };

  return (
    <Container activeOpacity={1} onPress={onPressOpen}>
      {/*<InfoIcon*/}
      {/*  color={themeColors().purple.deep}*/}
      {/*  symbolColor={themeColors().purple.deep}*/}
      {/*  hollow*/}
      {/*  style={{marginRight: moderateScale(4)}}*/}
      {/*/>*/}
      <InfoSvg></InfoSvg>
      <GuideMessageText>업데이트에 어려움이 있나요?</GuideMessageText>
      {showMessage && <Message onPress={onPressClose} />}
    </Container>
  );
}

function Message({onPress}: {onPress: () => void}) {
  return (
    <Message__Container activeOpacity={1} onPress={onPress}>
      <Message__TitleContainer>
        {/*<InfoIcon*/}
        {/*  color={themeColors().purple.deep}*/}
        {/*  style={{marginRight: moderateScale(4)}}*/}
        {/*/>*/}
        <InfoSvg></InfoSvg>
        <Message__TitleText>업데이트에 어려움이 있나요?</Message__TitleText>
      </Message__TitleContainer>

      <Message__BodyContainer>
        <MessageRow content={`픽플리 앱 삭제 후 재설치`} />
        <MessageRow
          content={`픽플리 앱 삭제 후 Google play 스토어를 강제 종료한 뒤, 재설치`}
        />
        <MessageRow
          content={`안드로이드) 설정 - 어프리케이션 - Google play 스토어 - 저장공간 - 데이터 삭제 및 캐시 삭제, 강제 종료 후 재시작하여 픽플리 앱 재설치`}
        />
      </Message__BodyContainer>

      <Message__FurtherInfoContainer>
        <Message__FurtherInfoText>{`* `}</Message__FurtherInfoText>
        <Message__FurtherInfoText>
          {`다른 어려움이 발생한 경우, 카카오톡 채널로 문의해주시기 바랍니다. (카카오톡 ‘픽플리’ 검색)`}
        </Message__FurtherInfoText>
      </Message__FurtherInfoContainer>
    </Message__Container>
  );
}

function MessageRow({content}: {content: string}) {
  return (
    <MessageRow__Container>
      <MessageRow__Text>{`• `}</MessageRow__Text>
      <MessageRow__Text>{content}</MessageRow__Text>
    </MessageRow__Container>
  );
}

const Container = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: ${moderateScale(12)}px ${moderateScale(0)}px;
`;

const GuideMessageText = styled(DetailText)`
  color: ${({theme}) => theme.color.blue.main};
`;

const Message__Container = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 0;
  width: 80%;
  background-color: ${({theme}) => theme.color.purple.mild};
  padding: ${moderateScale(16)}px;
  border-radius: 8px;
`;

const Message__TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(16)}px;
`;
const Message__TitleText = styled(DetailText)`
  color: ${({theme}) => theme.color.blue.main};
`;

const Message__BodyContainer = styled.View`
  margin-bottom: ${moderateScale(16)}px;
`;

const MessageRow__Container = styled.View`
  flex-direction: row;
  margin-bottom: ${moderateScale(4)}px;
`;
const MessageRow__Text = styled(H4)`
  color: ${({theme}) => theme.color.grey.icon};
  line-height: ${moderateScale(16)}px;
`;

const Message__FurtherInfoContainer = styled.View`
  flex-direction: row;
`;
const Message__FurtherInfoText = styled(SmallText)`
  color: ${({theme}) => theme.color.grey.mild};
`;
