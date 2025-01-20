// src/Screen/Review/ReviewListContainer.tsx
import React from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {moderateScale} from 'src/Util';
import {NavigationProp} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ScreenHeader} from 'src/Component/View';
import KeywordAlarmOff from 'src/Resource/svg/keywordAlarmOff.svg';
import KeywordAlarmOn from 'src/Resource/svg/keywordAlarmOn.svg';
import {
  KeywordAlarm,
  useKeywordAlarmContext,
} from './Mypage.keywordAlarm.context';

interface KeywordAlarmContainerProps {
  navigation: NavigationProp<AppStackProps, 'MypageKeywordAlarmScreen'>;
}

export const KeywordAlarmContainer: React.FC<KeywordAlarmContainerProps> = ({
  navigation,
}) => {
  const {
    keywordAlarms,
    deleteKeyword,
    searchKeyword,
    setSearchKeyword,
    addKeywordAlarm,
    toggleKeywordAlarm,
  } = useKeywordAlarmContext();
  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'키워드 알림'} />
      }
      PageContent={
        <>
          <Container>
            <SearchContainer>
              <SearchInput
                value={searchKeyword}
                onChangeText={setSearchKeyword}
                placeholder="텍스트를 입력하세요"
                returnKeyType="done"
              />
              <RegisterButton
                onPress={addKeywordAlarm}
                disabled={!searchKeyword.trim()}>
                <RegisterText isActive={!!searchKeyword.trim()}>
                  등록
                </RegisterText>
              </RegisterButton>
            </SearchContainer>
            <KeywordContainer>
              <SubscribeText>구독 키워드</SubscribeText>
              <KeywordItemContainer>
                {keywordAlarms.length === 0 ? (
                  <EmptyStateContainer>
                    <EmptyStateText>
                      {`팝업 이름이나 내용에 포함될 수 있는\n키워드를 등록해주세요.\n예) 슬램덩크, 먼작귀, 오뚜기 등`}
                    </EmptyStateText>
                  </EmptyStateContainer>
                ) : (
                  keywordAlarms.map((keyword: KeywordAlarm, index: number) => (
                    <KeywordItem key={index}>
                      <KeywordContentContainer>
                        <KeywordAlarmIconContainer
                          onPress={() =>
                            toggleKeywordAlarm(keyword.keywordId, keyword.isOn)
                          }>
                          {keyword.isOn ? (
                            <KeywordAlarmOn />
                          ) : (
                            <KeywordAlarmOff />
                          )}
                        </KeywordAlarmIconContainer>
                        <KeywordText>{keyword.keyword}</KeywordText>
                      </KeywordContentContainer>

                      <DeleteButton
                        onPress={() => deleteKeyword(keyword.keywordId)}>
                        <DeleteIcon>×</DeleteIcon>
                      </DeleteButton>
                    </KeywordItem>
                  ))
                )}
              </KeywordItemContainer>
            </KeywordContainer>
          </Container>
        </>
      }
    />
  );
};

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: ${moderateScale(22)}px;
  border-width: 1px;
  border-color: ${theme => theme.theme.color.grey.main};
`;
const KeywordAlarmIconContainer = styled.TouchableOpacity``;
const SearchInput = styled.TextInput`
  flex: 1;
  color: ${theme => theme.theme.color.grey.main}
  height: ${moderateScale(44)}px;
  padding: 0 ${moderateScale(16)}px;
`;

const RegisterButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px ${moderateScale(12)}px;
`;

const RegisterText = styled.Text<{isActive: boolean}>`
  color: ${props =>
    props.isActive ? props.theme.color.blue.main : props.theme.color.grey.main};
  font-size: ${moderateScale(14)}px;
`;

const Container = styled.View`
  flex: 1;
  padding: ${moderateScale(20)}px;
`;

const KeywordContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: ${moderateScale(10)}px;
  margin-top: ${moderateScale(40)}px;
`;
const KeywordItemContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const SubscribeText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme => theme.theme.color.grey.main};
`;
const KeywordItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${moderateScale(8)}px ${moderateScale(12)}px;
  margin-top: ${moderateScale(10)}px;
  border-radius: ${moderateScale(20)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme => theme.theme.color.grey.mild};
`;
const KeywordContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
const KeywordText = styled.Text`
  font-size: ${moderateScale(18)}px;
  margin-left: ${moderateScale(8)}px;
`;

const DeleteButton = styled.TouchableOpacity`
  width: ${moderateScale(16)}px;
  height: ${moderateScale(16)}px;
  justify-content: center;
  align-items: center;
`;

const DeleteIcon = styled.Text`
  color: ${theme => theme.theme.color.grey.main};
  font-size: ${moderateScale(16)}px;
`;

const EmptyStateContainer = styled.View`
  margin-top: ${moderateScale(200)}px;
  align-self: center;
`;

const EmptyStateText = styled.Text`
  color: ${theme => theme.theme.color.grey.main};
  text-align: center;
  line-height: ${moderateScale(20)}px;
`;

export default KeywordAlarmContainer;
