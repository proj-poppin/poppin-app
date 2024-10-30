// Section/RecentPopupSection.tsx
import React from 'react';
import styled from 'styled-components/native';
import {FlatList, Platform} from 'react-native';
import {moderateScale} from '../../../../Util';

interface PopupItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

export const MyPageLandingRecentPopupSection = () => {
  const recentMockPopups: PopupItem[] = [
    {
      id: '1',
      title: '팝업 스토어 제빵왕 김탁구 힝구리 퐁퐁ㅍ옾옾오퐁...',
      date: '01.01-02.02',
      imageUrl:
        'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/2/images.jpg',
    },
    {
      id: '2',
      title: '팝업 스토어 제빵왕 김탁구 힝구리 퐁퐁ㅍ옾옾오퐁...',
      date: '01.01-02.02',
      imageUrl:
        'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/2/images.jpg',
    },
    {
      id: '3',
      title: '팝업 스토어 제빵왕 김탁구 힝구리 퐁퐁ㅍ옾옾오퐁...',
      date: '01.01-02.02',
      imageUrl:
        'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/2/images.jpg',
    },
    {
      id: '4',
      title: '팝업 스토어 제빵왕 김탁구 힝구리 퐁퐁ㅍ옾옾오퐁...',
      date: '01.01-02.02',
      imageUrl:
        'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/2/images.jpg',
    },
    {
      id: '5',
      title: '팝업 스토어 제빵왕 김탁구 힝구리 퐁퐁ㅍ옾옾오퐁...',
      date: '01.01-02.02',
      imageUrl:
        'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/2/images.jpg',
    },
    {
      id: '6',
      title: '팝업 스토어 제빵왕 김탁구 힝구리 퐁퐁ㅍ옾옾오퐁...',
      date: '01.01-02.02',
      imageUrl:
        'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/2/images.jpg',
    },
    // ... more items
  ];

  const renderItem = ({item}: {item: PopupItem}) => (
    <PopupItemContainer>
      <PopupImage source={{uri: item.imageUrl}} />
      <PopupTextContainer>
        <PopupTitle numberOfLines={1}>{item.title}</PopupTitle>
        <PopupDate>{item.date}</PopupDate>
      </PopupTextContainer>
    </PopupItemContainer>
  );

  return (
    <Container>
      <SectionHeader>
        <HeaderTitle>최근 본 팝업</HeaderTitle>
      </SectionHeader>
      <FlatList
        data={recentMockPopups.slice(0, 10)} // 최대 10개로 제한
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: moderateScale(16)}}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
};

const Container = styled.View`
  margin-top: ${moderateScale(4)}px;
`;

const SectionHeader = styled.View`
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const HeaderTitle = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
`;

const PopupItemContainer = styled.TouchableOpacity`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(140)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: #fff;
  ${Platform.select({
    ios: `
     shadow-color: #000;
     shadow-offset: 0px 2px;
     shadow-opacity: 0.25;
     shadow-radius: 3.84px;
   `,
    android: `
     elevation: 5;
   `,
  })}
`;

const PopupImage = styled.Image`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(80)}px;
  border-radius: ${moderateScale(8)}px;
`;
const PopupTextContainer = styled.View`
  padding: ${moderateScale(8)}px;
`;
const PopupTitle = styled.Text`
  font-size: ${moderateScale(12)}px;
  margin-top: ${moderateScale(8)}px;
`;

const PopupDate = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: #666;
  margin-top: ${moderateScale(4)}px;
`;

const Separator = styled.View`
  width: ${moderateScale(12)}px;
`;
