// src/contexts/ReviewWriteContext.tsx
import React, {createContext, useContext, useState} from 'react';
import {Asset} from 'react-native-image-picker';
import {useImagePicker} from 'src/hooks/useImagePicker';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {usePopupScreenStore} from 'src/Screen/Popup/Landing/Popup.landing.zustand';
import {Alert} from 'react-native';
import {axiosMypageReviewReport} from 'src/Axios/Mypage/mypage.post.axios';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';

export interface CategoryType {
  id: number;
  label: string;
  selected: boolean;
}

export interface CategoryGroupType {
  title: string;
  categories: CategoryType[];
}

interface ReviewSubmitType {
  popupId: string;
  visitDate: string;
  satisfaction: string;
  congestion: string;
  text: string;
  images: Asset[] | undefined;
}

type ReviewWriteContextProp = {
  // Zustand store 연결 값
  searchedPopupStores: PopupSchema[];
  searchKeyword: string;
  setSearchKeyword: (text: string) => void;

  // 리뷰 작성 상태
  categoryGroups: CategoryGroupType[];
  reviewText: string;
  setReviewText: (text: string) => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  selectedPopup: PopupSchema | undefined;
  setSelectedPopup: (popup: PopupSchema | undefined) => void;

  // 카테고리 관리
  handleCategorySelect: (groupIndex: number, categoryId: number) => void;
  getSelectedCategories: () => {
    visitDate: string;
    satisfaction: string;
    congestion: string;
  };

  // 이미지 관리
  images: Asset[] | undefined;
  handleAddImages: () => void;
  handleDeleteImage: (index: number) => void;

  // 리뷰 제출
  submitting: boolean;
  submitReview: () => Promise<void>;
  validateReview: () => boolean;
};

const ReviewWriteContext = createContext<ReviewWriteContextProp>({
  searchedPopupStores: [],
  searchKeyword: '',
  setSearchKeyword: () => {},
  categoryGroups: [],
  reviewText: '',
  setReviewText: () => {},
  showResults: false,
  setShowResults: () => {},
  selectedPopup: undefined,
  setSelectedPopup: () => {},
  handleCategorySelect: () => {},
  getSelectedCategories: () => ({
    visitDate: '',
    satisfaction: '',
    congestion: '',
  }),
  images: [],
  handleAddImages: () => {},
  handleDeleteImage: () => {},
  submitting: false,
  submitReview: async () => {},
  validateReview: () => false,
});

export const useReviewWriteContext = () => useContext(ReviewWriteContext);

export const ReviewWriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Zustand store 연결
  const {
    OPERATING: {searchedPopupStores},
    searchKeyword,
    setSearchKeyword,
  } = usePopupScreenStore();

  // 상태 관리
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroupType[]>([
    {
      title: '방문 일시',
      categories: [
        {id: 1, label: '평일 오전', selected: false},
        {id: 2, label: '평일 오후', selected: false},
        {id: 3, label: '주말 오전', selected: false},
        {id: 4, label: '주말 오후', selected: false},
      ],
    },
    {
      title: '팝업 만족도',
      categories: [
        {id: 5, label: '만족', selected: false},
        {id: 6, label: '보통', selected: false},
        {id: 7, label: '불만족', selected: false},
      ],
    },
    {
      title: '혼잡도',
      categories: [
        {id: 8, label: '여유', selected: false},
        {id: 9, label: '보통', selected: false},
        {id: 10, label: '혼잡', selected: false},
      ],
    },
  ]);

  const [reviewText, setReviewText] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<PopupSchema>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  // 이미지 피커 설정
  const {images, handleAddImages, handleDeleteImage} = useImagePicker({
    maxImages: 5,
    maxWidth: 512,
    maxHeight: 512,
  });

  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'MypageReviewListScreen'>>();

  // 카테고리 관리
  const handleCategorySelect = (groupIndex: number, categoryId: number) => {
    setCategoryGroups(prev =>
      prev.map((group, idx) => {
        if (idx === groupIndex) {
          return {
            ...group,
            categories: group.categories.map(cat => ({
              ...cat,
              selected: cat.id === categoryId,
            })),
          };
        }
        return group;
      }),
    );
  };

  const getSelectedCategories = () => {
    const visitDate =
      categoryGroups[0].categories.find(cat => cat.selected)?.label || '';
    const satisfaction =
      categoryGroups[1].categories.find(cat => cat.selected)?.label || '';
    const congestion =
      categoryGroups[2].categories.find(cat => cat.selected)?.label || '';

    return {visitDate, satisfaction, congestion};
  };

  const submitReview = async () => {
    if (submitting || !validateReview()) return;

    try {
      setSubmitting(true);
      const {visitDate, satisfaction, congestion} = getSelectedCategories();

      // FormData 생성
      const formData = new FormData();

      // 필수 데이터 추가
      formData.append('popupId', selectedPopup!.id);
      formData.append('visitDate', visitDate);
      formData.append('satisfaction', satisfaction);
      formData.append('congestion', congestion);
      formData.append('text', reviewText);

      images?.forEach((image, index) => {
        if (image.uri) {
          formData.append('images', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || `image${index}.jpg`,
          } as any);
        }
      });

      // API 호출
      const response = await axiosMypageReviewReport(formData);

      if (response?.success) {
        // 성공 시 초기화
        setCategoryGroups(prev =>
          prev.map(group => ({
            ...group,
            categories: group.categories.map(cat => ({
              ...cat,
              selected: false,
            })),
          })),
        );
        setReviewText('');
        setSelectedPopup(undefined);

        // TODO: 성공 메시지 또는 네비게이션 처리
        Alert.alert('알림', '리뷰가 성공적으로 제출되었습니다.');

        navigation.dispatch(StackActions.replace('LandingBottomTabNavigator'));
      }
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
      Alert.alert('알림', '리뷰 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  // 유효성 검사 함수 수정
  const validateReview = (): boolean => {
    if (!selectedPopup) {
      Alert.alert('알림', '팝업을 선택해주세요.');
      return false;
    }

    const {visitDate, satisfaction, congestion} = getSelectedCategories();

    if (!visitDate) {
      Alert.alert('알림', '방문 일시를 선택해주세요.');
      return false;
    }
    if (!satisfaction) {
      Alert.alert('알림', '만족도를 선택해주세요.');
      return false;
    }
    if (!congestion) {
      Alert.alert('알림', '혼잡도를 선택해주세요.');
      return false;
    }
    if (reviewText.length < 10) {
      Alert.alert('알림', '후기는 10자 이상 작성해주세요.');
      return false;
    }
    if (images?.length === 0) {
      Alert.alert('알림', '이미지를 추가해주세요.');
      return false;
    }

    return true;
  };

  const reviewWriteContext = {
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
    getSelectedCategories,
    images,
    handleAddImages,
    handleDeleteImage,
    submitting,
    submitReview,
    validateReview,
  };

  return (
    <ReviewWriteContext.Provider value={reviewWriteContext}>
      {children}
    </ReviewWriteContext.Provider>
  );
};
