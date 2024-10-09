import React, {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {usePopupDetailContext} from './Provider/Popup.detail.provider';
import {usePopupDetailReviewContext} from './Provider/Popup.detail.review.provider';
import {PopupReviewSchema} from '../../../Schema/Popup/popupReview.schema';
import {ReviewComponent} from '../../../Component/Popup/Popup.review.component';
import {PopupDetailScreenProps} from '../Popup.detail.screen';
import {FlatList, View} from 'react-native';
import {moderateScale} from 'src/Util';
import {VoteDetailLoadingScreen} from './Popup.detail.loading.screen';
import {PopupDetailScreenHeader} from './Popup.detail.screenHeader';
import {PopupDetailImageSection} from './Popup.detail.image.section';
import {PopupDetailTitleSection} from './Popup.detail.title.section';
import PopupDetailIconSection from './Popup.detail.icon.section';

export const PopupDetailContainer = ({
  params,
}: {
  params: PopupDetailScreenProps;
}) => {
  console.log('PopupDetailContainer', params);
  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'PopupDetailScreen'>>();

  const {
    randomizeOffset,
    popupDetail,
    setPopupDetail,
    getRecentPopupDetail,
    showPopupDetailModal,
  } = usePopupDetailContext();

  const {
    popupDetailReviews: reviews,
    getPopupDetailReviews,
    setTargetReview,
  } = usePopupDetailReviewContext();

  /**
   * 팝업 상세 정보와 리뷰를 가져오는 함수
   */
  const updatePopupDetailInfo = async () => {
    let popupId = '';
    if ('popup' in params) {
      popupId = params.popup.id;
    } else {
      popupId = params.popupId;
    }
    if (popupId === '') {
      navigation.goBack();
      return;
    }

    const updatePopupDetail = await getRecentPopupDetail(popupId);
    const updatePopupDetailReviews = await getPopupDetailReviews(popupId);
    Promise.all([updatePopupDetail, updatePopupDetailReviews]);
  };

  /**
   * 컴포넌트가 마운트되었을 때 팝업 정보를 업데이트합니다.
   */
  useEffect(() => {
    let updatePopupInfo: NodeJS.Timeout;
    if ('popup' in params) {
      /** 전체 투표 정보를 가져온 경우, reanimated thread 와 겹치지 않게 간극을 두고 투표 정보 업데이트를 진행합니다. */
      setPopupDetail(params.popup);
      updatePopupInfo = setTimeout(() => updatePopupDetailInfo(), 500);
    } else {
      updatePopupDetailInfo();
    }
    //* 2초 이상 페이지에 머무르는 경우 투표 조회를 요청합니다.
    const popupId = 'popup' in params ? params.popup.id : params.popupId;
    // const makeVoteView = setTimeout(() => viewVote(voteId), 2000);
    return () => {
      // clearTimeout(makeVoteView);
      clearTimeout(updatePopupInfo);
    };
  }, []);
  const loading = popupDetail.id === '';

  /**
   * 리뷰 아이템을 렌더링하는 함수
   */
  const RenderItem = ({item}: {item: PopupReviewSchema}) => (
    <ReviewComponent
      randomizeOffset={randomizeOffset}
      popupReviewAuthorId={item.userId}
      review={item}
      showPopupDetailModal={showPopupDetailModal}
      setTargetReview={setTargetReview}
    />
  );

  /**
   * 리스트의 각 아이템을 구분하는 키를 반환하는 함수
   */
  const keyExtractor = (item: PopupReviewSchema) => item.reviewId.toString();

  /**
   * 리스트 아이템들 사이의 구분선
   */
  const ItemSeparatorComponent = () => (
    <View
      style={{
        height: moderateScale(1),
        backgroundColor: '#e7e7e7',
        marginVertical: moderateScale(16),
      }}
    />
  );

  return (
    <>
      <PopupDetailScreenHeader />
      <FlatList
        data={reviews}
        renderItem={RenderItem}
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{paddingBottom: moderateScale(120)}}
        ListHeaderComponent={
          loading ? (
            <VoteDetailLoadingScreen />
          ) : (
            <>
              <PopupDetailImageSection />
              <PopupDetailTitleSection />
              <PopupDetailIconSection />
              {/*<PopupDetailTitleSection*/}
              {/*  popupName={popupDetail.name}*/}
              {/*  popupIntroduce={popupDetail.introduce}*/}
              {/*/>*/}
            </>
          )
        }
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </>
  );
};
