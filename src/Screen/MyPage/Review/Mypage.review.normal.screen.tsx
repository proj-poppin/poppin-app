import React from 'react';
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
import {TitleText} from 'src/StyledComponents/Text/title.component';
import {useReviewWriteContext} from './Mypage.review.write.context';
import {ReviewWriteSection} from 'src/Component/MyPage/Review/Mypage.review.write.section';
import {ReivewTitleText} from './Mypage.review.visited.screen';

export const NormalReviewWriteScreen: React.FC = () => {
  const {
    searchedPopupStores,
    searchKeyword,
    setSearchKeyword,
    categoryGroups,
    reviewText,
    setReviewText,
    showResults,
    setShowResults,
    selectedPopup,
    setSelectedPopup,
    handleCategorySelect,
    images: imageFileUri,
    handleAddImages: openGallery,
    handleDeleteImage,
    submitReview,
  } = useReviewWriteContext();

  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'일반 후기 작성'} />
      }
      PageContent={
        <ContentContainer>
          {/* 팝업이 선택되었을 때 보여지는 화면, */}
          {selectedPopup ? (
            <SelectedPopupSection>
              <ReivewTitleText>{selectedPopup.name}</ReivewTitleText>
              <CancelText
                onPress={() => {
                  setSelectedPopup(undefined);
                }}>
                선택 취소
              </CancelText>
            </SelectedPopupSection>
          ) : (
            /* 팝업 미선택 시 보여지는 SearchBar */
            <SearchSection>
              <SearchTitle>후기 작성할 팝업 검색</SearchTitle>
              <ReviewSearchBar
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                onFocus={() => setShowResults(true)}
                onBlur={() => setShowResults(false)}
              />
            </SearchSection>
          )}

          {/* 검색 결과가 있을 때 보여지는 리스트 */}
          {showResults && searchKeyword.length > 0 ? (
            <ResultsContainer>
              <FlatList
                data={searchedPopupStores}
                keyExtractor={item => item.id}
                renderItem={({item}: {item: PopupSchema}) => (
                  <BeforeReviewPopupCard
                    popup={item}
                    key={item.id}
                    showWriteButton={false}
                    onPress={() => {
                      setSelectedPopup(item);
                      setShowResults(false);
                      setSearchKeyword('');
                    }}
                  />
                )}
              />
            </ResultsContainer>
          ) : (
            /* 후기 작성 화면 */
            <ReviewWriteSection
              categoryGroups={categoryGroups}
              reviewText={reviewText}
              setReviewText={setReviewText}
              imageFileUri={imageFileUri}
              openGallery={openGallery}
              handleDeleteImage={handleDeleteImage}
              handleCategorySelect={handleCategorySelect}
            />
          )}
        </ContentContainer>
      }
      BottomPart={
        showResults && searchKeyword.length > 0 ? undefined : (
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
              title={'일반 후기 제출하기'}
              //TODO-[규진] 제출 기능 연결하기
              onPress={() => {
                submitReview();
              }}
            />
          </>
        )
      }
    />
  );
};

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

const SearchSection = styled.View`
  margin-bottom: ${moderateScale(24)}px;
`;

const SearchTitle = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(12)}px;
`;
const ResultsContainer = styled.View`
  flex: 1;
`;

const CancelText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${props => props.theme.color.grey.main};
`;

export default NormalReviewWriteScreen;
