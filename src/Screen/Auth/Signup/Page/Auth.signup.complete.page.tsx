import React from 'react';
import {Text, View} from 'react-native';
import WelcomeSvg from 'src/Resource/svg/signup-succeed-welcome-icon.svg';
import {FullViewPage} from '../../../../Component/Page';
import {SectionContainer} from '../../../../Unit/View';
import {moderateScale} from '../../../../Util';
import CommonTextFormField from '../../../../Component/CommonTextFormField';
import CommonCompleteButton from '../../../Popup/Landing/common.complete.button';
import styled from 'styled-components/native';
import {themeColors} from '../../../../Theme/theme';

export function SignupCompletePage() {
  return (
    <FullViewPage
      PageContent={
        <>
          <SectionContainer
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: moderateScale(20),
            }}>
            <WelcomeSvg></WelcomeSvg>
            <TitleText>팝업 러버님</TitleText>
            <TitleText>환영해요!</TitleText>
            <CommonCompleteButton
              style={[{marginTop: moderateScale(50)}, {width: '100%'}]}
              title="취향 설정하러 가기"
              textStyle={{fontWeight: '600'}}
              onPress={() => {}}
            />
            <ManualContainer>
              <ManualBlueDot></ManualBlueDot>
              <ManualBlueDot></ManualBlueDot>
              <ManualBlueDot></ManualBlueDot>
              <ManualBlueText>
                맞춤형 키워드 설정하고 {'\n'} 취향에 꼭 맞는 팝업 스토어 추천을
                받아보세요!
              </ManualBlueText>
            </ManualContainer>
          </SectionContainer>
          <CommonCompleteButton
            style={[
              {backgroundColor: '#F2F4F6'},
              {marginTop: moderateScale(220)},
            ]}
            title="다음에 하기"
            textStyle={[{fontWeight: '600'}, {color: themeColors().grey.black}]}
            onPress={() => {}}
          />
        </>
      }
    />
  );
}
const TitleText = styled.Text`
  color: black;
  font-size: ${moderateScale(22)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 600;
  line-height: ${moderateScale(30)}px;
`;

const ManualContainer = styled.View`
  align-items: center;
  margin-top: ${moderateScale(20)}px;
`;

const ManualBlueText = styled.Text`
  color: ${({theme}) => theme.color.blue.main};
  font-size: ${moderateScale(14)}px;
  text-align: center;
  margin-top: ${moderateScale(10)}px;
`;

const ManualBlueDot = styled.View`
  width: ${moderateScale(4)}px;
  height: ${moderateScale(4)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({theme}) => theme.color.blue.main};
  margin-top: ${moderateScale(2)}px;
`;
