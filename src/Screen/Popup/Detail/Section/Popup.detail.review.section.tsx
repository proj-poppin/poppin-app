import React, {useState} from 'react';
import {ScrollView, Pressable, View, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {SectionContainer} from '../../../../Unit/View';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {BodyLargeText} from '../../../../StyledComponents/Text/bodyLarge.component';
import {themeColors} from '../../../../Theme/theme';
import {deviceWidth, moderateScale} from '../../../../Util';
import {useUserStore} from '../../../../Zustand/User/user.zustand';
import SvgWithNameBoxLabel from '../../../../Component/SvgWithNameBoxLabel';
import ReviewWriteCheckIcon from 'src/Resource/svg/review-write-check-icon.svg';
import FastImage from 'react-native-fast-image';
import ReviewProfileSvg from 'src/Resource/svg/default-app-logo-icon.svg';
import VerifiedReviewSvg from 'src/Resource/svg/verified-review-check-icon.svg';
import LikeReviewSvg from 'src/Resource/svg/review-like-icon.svg';
import PurpleCheckSelectionRow from '../../../../Component/Purple.Selection.Component';
import {EnumValueWithName} from '../../../../Object/Type/enum.type';
import {BlankDropdown} from '../../../../Component/Dropdown';
import UnderlinedTextButton from '../../../../Component/UnderlineTextButton';
import DividerLine from '../../../../Component/DividerLine/DividerLine';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../../Navigator/App.stack.navigator';

const REVIEW_ORDER_TYPES: EnumValueWithName[] = [
  {displayName: '최근 작성 순', value: 'latest'},
  {displayName: '추천 순', value: 'recommend'},
];

const ItemSeparatorComponent = () => {
  return (
    <View
      style={{
        height: moderateScale(1),
        backgroundColor: '#e7e7e7',
        marginVertical: moderateScale(16),
      }}
    />
  );
};

export const PopupDetailReviewSection = () => {
  const user = useUserStore(state => state.user);
  const {popupDetail} = usePopupDetailContext();
  const {review} = popupDetail;
  const reviews = review || [];

  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  const navigateToReviewWriteScreen = () => {
    navigation.navigate('PopupDetailReviewWriteScreen', {
      popupId: popupDetail?.id,
      popup: popupDetail,
    });
  };

  const toggleReviewText = (reviewId: string) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const getDisplayedText = (text: string, isExpanded: boolean) =>
    isExpanded ? text : `${text.substring(0, 80)}...`;

  return (
    <SectionContainer>
      <SectionRow>
        <ReviewDataTitle>방문후기</ReviewDataTitle>
        <SvgWithNameBoxLabel
          onPress={navigateToReviewWriteScreen}
          textStyle={[
            {fontSize: moderateScale(13)},
            {marginRight: moderateScale(5)},
          ]}
          width={moderateScale(150)}
          height={moderateScale(33)}
          Icon={ReviewWriteCheckIcon}
          label="방문 후기 작성하기"
        />
      </SectionRow>

      <SectionRow style={{marginTop: moderateScale(10)}}>
        <PurpleCheckSelectionRow
          isSelected={false}
          label="인증된 방문자 후기만 보기"
          onClicked={() => {}}
        />
        <BlankDropdown
          buttonStyle={{width: moderateScale(120)}}
          data={REVIEW_ORDER_TYPES}
          onSelect={(selectedItem, index) => {}}
        />
      </SectionRow>

      {reviews.length > 0 ? (
        reviews.map(review => {
          const isExpanded = expandedReviews[review.reviewId] || false; // Fixed variable name
          const shouldShowMoreButton = review.text.length > 20;

          return (
            <ReviewContainer key={review.reviewId}>
              <RowBetween>
                <RecentReviewHeader>
                  <ReviewProfileSvg />
                  <Column style={{marginLeft: moderateScale(10)}}>
                    <Row>
                      <NicknameText>{review.nickname}</NicknameText>
                      {review.isCertificated && (
                        <VerifiedReviewSvg
                          style={{marginLeft: moderateScale(5)}}
                        />
                      )}
                    </Row>
                    <ReviewMetaText>리뷰 {reviews.length}개</ReviewMetaText>
                  </Column>
                </RecentReviewHeader>
                <Pressable onPress={() => console.log('신고하기')}>
                  <UnderlinedTextButton label="신고하기" onClicked={() => {}} />
                </Pressable>
              </RowBetween>

              <HorizontalScrollView horizontal>
                {review.imageUrls.map((url, index) => (
                  <ReviewImage key={index} source={{uri: url}} />
                ))}
              </HorizontalScrollView>

              <ReviewMetaText>
                {getDisplayedText(review.text, isExpanded)}
              </ReviewMetaText>

              {shouldShowMoreButton && (
                <UnderlinedTextButton
                  label={isExpanded ? '접기' : '더보기'}
                  onClicked={() => toggleReviewText(review.reviewId.toString())}
                />
              )}

              <Pressable onPress={() => console.log('추천하기')}>
                <RecommendContainer>
                  <SvgWithNameBoxLabel
                    textStyle={[{fontSize: moderateScale(13)}]}
                    borderRadius={15}
                    width={55}
                    height={30}
                    Icon={LikeReviewSvg}
                    iconStyle={{transform: [{scale: 0.9}]}}
                    label={`${review.recommendCnt}`}
                  />
                </RecommendContainer>
              </Pressable>
            </ReviewContainer>
          );
        })
      ) : (
        <NoReviewText>작성된 후기가 없습니다.</NoReviewText>
      )}
    </SectionContainer>
  );
};

// Styled Components
const SectionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ReviewDataTitle = styled(BodyLargeText)`
  color: ${({theme}) => themeColors().purple.main};
  font-weight: 600;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(14)}px;
`;

const ReviewContainer = styled.View`
  flex-direction: column;
  margin-vertical: ${moderateScale(10)}px;
`;

const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RecentReviewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(10)}px;
`;

const Column = styled.View`
  flex-direction: column;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NicknameText = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
`;

const ReviewMetaText = styled.Text`
  font-size: ${moderateScale(14)}px;
  margin-vertical: ${moderateScale(5)}px;
`;

const HorizontalScrollView = styled(ScrollView)`
  margin-vertical: ${moderateScale(10)}px;
`;

const ReviewImage = styled(FastImage)`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  margin-right: ${moderateScale(10)}px;
  border-radius: ${moderateScale(12)}px;
`;

const RecommendContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const NoReviewText = styled.Text`
  text-align: center;
  margin-top: ${moderateScale(20)}px;
`;

export default PopupDetailReviewSection;
