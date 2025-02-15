import React from 'react';
import {ScreenHeader} from 'src/Component/View';
import styled from 'styled-components/native';
import {Linking, TouchableOpacity} from 'react-native';

export interface MypagePolicyScreenProps {}

export const MypagePolicyScreen = () => {
  const handlePolicyPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <ScreenHeader title="이용 약관 및 정책" LeftComponents={'BACK_BUTTON'} />
      <Container>
        <PolicyList>
          <PolicyItem
            onPress={() =>
              handlePolicyPress(
                'https://translucent-saver-b25.notion.site/592d1e8dbf5749b4abaa93619aa9880f',
              )
            }>
            <PolicyText>서비스 이용약관</PolicyText>
            <PolicyArrow>{'>'}</PolicyArrow>
          </PolicyItem>
          <PolicyItem
            onPress={() =>
              handlePolicyPress(
                'https://translucent-saver-b25.notion.site/2-21ver-7f7b0bf6605748c388f2c0484f093808',
              )
            }>
            <PolicyText>개인정보 처리 방침 및 정책 가이드</PolicyText>
            <PolicyArrow>{'>'}</PolicyArrow>
          </PolicyItem>
        </PolicyList>
      </Container>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 16px;
`;

const PolicyList = styled.View`
  width: 100%;
`;

const PolicyItem = styled(TouchableOpacity)`
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
`;

const PolicyText = styled.Text`
  font-size: 16px;
  color:rgb(0, 0, 0);
`;

const PolicyArrow = styled.Text`
  position: absolute;
  right: 0;
  top: 50%;
`;
