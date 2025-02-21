import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

interface PreferenceHeaderProps {
  nickname: string;
}

const PreferenceHeader: React.FC<PreferenceHeaderProps> = ({nickname}) => {
  return (
    <TitleContainer>
      <TitleText>
        <NicknameBlueText>{nickname}</NicknameBlueText>님의 팝업 취향을
      </TitleText>
      <SelectionRow>
        <SelectionTitleText>선택해주세요</SelectionTitleText>
        <SelectionSubText>(카테고리 당 1개 이상 필수 선택)</SelectionSubText>
      </SelectionRow>
    </TitleContainer>
  );
};

const TitleContainer = styled.View`
  padding: 20px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NicknameBlueText = styled.Text`
  color: ${({theme}) => theme.color.blue.main};
`;

const SelectionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SelectionTitleText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const SelectionSubText = styled.Text`
  font-size: ${moderateScale(12)}px;
  margin-left: ${moderateScale(5)}px;
  color: ${({theme}) => theme.color.grey.black};
`;

export default PreferenceHeader;
