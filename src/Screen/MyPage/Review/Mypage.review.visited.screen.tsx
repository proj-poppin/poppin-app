import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {moderateScale} from 'src/Util';
import {ScreenHeader} from 'src/Component/View';
import {useImagePicker} from 'src/hooks/useImagePicker';
import LinearGradient from 'react-native-linear-gradient';
import {ReviewSearchBar} from 'src/Component/MyPage/Review/Mypage.review.searchBar';
import {BeforeReviewPopupCard} from 'src/Component/MyPage/Review/Mypage.before.review.popupCard';
import {FlatList} from 'react-native';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import CommonCompleteButton from 'src/Screen/Popup/Landing/common.complete.button';
import VisitedReview from 'src/Resource/svg/visited-review.svg';
import {useReviewWriteContext} from './Mypage.review.write.context';
import {ReviewWriteSection} from 'src/Component/MyPage/Review/Mypage.review.write.section';
// props 인터페이스 정의
interface VisitedReviewWriteScreenProps {
  selectedPopup: PopupSchema | undefined;
}

// 컴포넌트 정의 수정
export const VisitedReviewWriteScreen: React.FC<
  VisitedReviewWriteScreenProps
> = ({selectedPopup}) => {
  const {
    setSelectedPopup,
    categoryGroups,
    reviewText,
    setReviewText,
    handleCategorySelect,
    images,
    handleAddImages: openGallery,
    handleDeleteImage,
    submitting,
    submitReview,
  } = useReviewWriteContext();

  useEffect(() => {
    setSelectedPopup(selectedPopup);
  }, [selectedPopup]);

  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'방문 후기 작성'} />
      }
      PageContent={
        <ContentContainer>
          <SelectedPopupSection>
            <ReivewTitleText>{selectedPopup?.name}</ReivewTitleText>
            <VisitedReview
              width={moderateScale(105)}
              height={moderateScale(24)}
            />
          </SelectedPopupSection>

          <ReviewWriteSection
            categoryGroups={categoryGroups}
            reviewText={reviewText}
            setReviewText={setReviewText}
            imageFileUri={images}
            openGallery={openGallery}
            handleDeleteImage={handleDeleteImage}
            handleCategorySelect={handleCategorySelect}
          />
        </ContentContainer>
      }
      BottomPart={
        <>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: moderateScale(100),
            }}
          />
          <CommonCompleteButton
            title={'방문 후기 제출하기'}
            onPress={() => {
              submitReview();
            }}
          />
        </>
      }
    />
  );
};

export const ReivewTitleText = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: 600;
`;
const ContentContainer = styled.View`
  flex: 1;
  background-color: white;
  padding: ${moderateScale(20)}px;
`;

const SelectedPopupSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${moderateScale(24)}px;
`;

export default VisitedReviewWriteScreen;
