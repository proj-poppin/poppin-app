import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import MiniLogo from 'src/Resource/svg/app-logo-p-icon.svg';
import {HelperText} from '../Report/ReportStepTwo';
import {Asset} from 'react-native-image-picker';
import {CategoryGroupType} from 'src/Screen/MyPage/Review/Mypage.review.write.context';

interface ReviewWriteSectionProps {
  categoryGroups: CategoryGroupType[];
  handleCategorySelect: (groupIndex: number, categoryId: number) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  imageFileUri: Asset[] | undefined;
  handleDeleteImage: (index: number) => void;
  openGallery: () => void;
}

export const ReviewWriteSection: React.FC<ReviewWriteSectionProps> = ({
  categoryGroups,
  handleCategorySelect,
  reviewText,
  setReviewText,
  imageFileUri,
  handleDeleteImage,
  openGallery,
}) => {
  return (
    <ReviewSection>
      {categoryGroups.map((group, groupIndex) => (
        <CategoryGroupSection key={group.title}>
          <CategoryGroupTitle>{group.title}</CategoryGroupTitle>
          <CategoryRow>
            {group.categories.map(category => (
              <CategoryChip
                key={category.id}
                selected={category.selected}
                onPress={() => handleCategorySelect(groupIndex, category.id)}>
                <CategoryText selected={category.selected}>
                  {category.label}
                </CategoryText>
              </CategoryChip>
            ))}
          </CategoryRow>
        </CategoryGroupSection>
      ))}

      <MinimumLength isValid={reviewText.length >= 10}>
        ✓10자 이상
      </MinimumLength>
      <ReviewInput
        placeholder="팝업에 대한 후기를 입력해 주세요."
        multiline
        textAlignVertical="top"
        numberOfLines={6}
        value={reviewText}
        onChangeText={setReviewText}
      />

      <TipSection>
        <TipTitle>
          <MiniLogo width={14} height={14} />
          <TipTitleText>팝핀이 알려주는 후기 작성 TIP!</TipTitleText>
        </TipTitle>
        <TipText>
          • <TipHighlight>어떤 프로그램</TipHighlight>이 있었나요?
        </TipText>
        <TipText>
          • <TipHighlight>혼잡도</TipHighlight>는 어땠나요?
        </TipText>
        <TipText>
          • 나만의 <TipHighlight>꿀팁</TipHighlight>이 있나요?
        </TipText>
      </TipSection>

      <ImageUploadSection>
        {imageFileUri?.map((image, index) => (
          <ImageContainer key={image.uri}>
            <UploadedImage source={{uri: image.uri}} />
            <DeleteButton onPress={() => handleDeleteImage(index)}>
              <DeleteButtonText>×</DeleteButtonText>
            </DeleteButton>
          </ImageContainer>
        ))}
        {(!imageFileUri || imageFileUri.length < 5) && (
          <ImageUploadButton onPress={openGallery}>
            <PlusIcon>+</PlusIcon>
            <UploadText>
              사진 추가하기{'\n'}
              (최대 5장)
            </UploadText>
          </ImageUploadButton>
        )}
      </ImageUploadSection>
      <HelperText>*방문 후기 작성 후 수정이 불가합니다.</HelperText>
      <HelperText>
        *첨부파일은 20MB 이하의 파일만 업로드 가능하며, 최대 5장까지 등록
        가능합니다.
      </HelperText>
    </ReviewSection>
  );
};

const ReviewSection = styled.View``;

const CategoryGroupSection = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${moderateScale(20)}px;
`;

const CategoryGroupTitle = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
  color: ${props => props.theme.color.purple.main};
  width: ${moderateScale(80)}px;
`;
const CategoryRow = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: moderateScale(20),
  },
})``;
const CategoryChip = styled.TouchableOpacity<{selected: boolean}>`
  background-color: ${props =>
    props.selected
      ? props.theme.color.blue.mild
      : props.theme.color.grey.white};
  padding: ${moderateScale(8)}px ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  border: 1px solid
    ${props =>
      props.selected
        ? props.theme.color.blue.main
        : props.theme.color.grey.mild};
  margin-right: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const CategoryText = styled.Text<{selected: boolean}>`
  color: ${props =>
    props.selected
      ? props.theme.color.grey.black
      : props.theme.color.grey.black};
  font-size: ${moderateScale(14)}px;
`;

const MinimumLength = styled.Text<{isValid: boolean}>`
  color: ${props =>
    props.isValid ? props.theme.color.blue.main : props.theme.color.grey.main};
  font-size: ${moderateScale(14)}px;
  margin-bottom: ${moderateScale(8)}px;
`;
const ReviewInput = styled.TextInput`
  border: 1px solid ${props => props.theme.color.grey.mild};
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(12)}px;
  height: ${moderateScale(150)}px;
  font-size: ${moderateScale(16)}px;
`;
const TipSection = styled.View`
  margin-top: ${moderateScale(16)}px;
  margin-left: ${moderateScale(10)}px;
`;

const TipTitle = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${moderateScale(8)}px;
`;

const TipTitleText = styled.Text`
  color: ${props => props.theme.color.blue.main};
  font-size: ${moderateScale(14)}px;
  font-weight: bold;
  margin-left: ${moderateScale(4)}px;
`;

const TipText = styled.Text`
  color: ${props => props.theme.color.grey.main};
  font-size: ${moderateScale(14)}px;
  margin-left: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(4)}px;
`;

const TipHighlight = styled.Text`
  color: ${props => props.theme.color.blue.main};
`;

const ImageUploadSection = styled.View`
  margin-top: ${moderateScale(24)}px;

  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const ImageContainer = styled.View`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: ${moderateScale(8)}px;
  overflow: hidden;
  position: relative;
`;

const ImageUploadButton = styled.TouchableOpacity`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border: 1px dashed ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(8)}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${moderateScale(8)}px;
`;

const PlusIcon = styled.Text`
  font-size: ${moderateScale(24)}px;
  color: ${props => props.theme.color.grey.main};
  margin-bottom: ${moderateScale(4)}px;
`;

const UploadText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${props => props.theme.color.grey.main};
  text-align: center;
`;
const UploadedImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${moderateScale(4)}px;
  right: ${moderateScale(4)}px;
  width: ${moderateScale(20)}px;
  height: ${moderateScale(20)}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${moderateScale(10)}px;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  color: ${props => props.theme.color.grey.white};
  font-size: ${moderateScale(14)}px;
`;
