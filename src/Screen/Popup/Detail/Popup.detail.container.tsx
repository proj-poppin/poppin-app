import React, {useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {usePopupDetailContext} from './Provider/Popup.detail.provider';
import {usePopupDetailReviewContext} from './Provider/Popup.detail.review.provider';
import {PopupReviewSchema} from '../../../Schema/Popup/popupReview.schema';
import {ReviewComponent} from '../../../Component/Popup/Popup.review.component';
import {PopupDetailScreenProps} from './Popup.detail.screen';
import {FlatList, View} from 'react-native';
import {moderateScale} from 'src/Util';
import {PopupDetailLoadingScreen} from './Popup.detail.loading.screen';
import {PopupDetailScreenHeader} from './Popup.detail.screenHeader';
import {PopupDetailImageSection} from './Section/Popup.detail.image.section';
import {PopupDetailTitleSection} from './Section/Popup.detail.title.section';
import PopupDetailIconSection from './Section/Popup.detail.icon.section';
import {PopupDetailDividerSection} from './Section/Popup.detail.divider.section';
import {PopupDetailInfoSection} from './Section/Popup.detail.info.section';
import {PopupDetailVisitorSection} from './Section/Popup.detail.visitor.section';
import DividerLine from 'src/Component/DividerLine/DividerLine';
import {PopupDetailReviewSection} from './Section/Popup.detail.review.section';
import PopupDetailBottomButtonRowSection from './Section/Popup.detail.button.row.section';
import {BlackBackgroundModal} from 'src/Component/Modal';
import styled from 'styled-components/native';
import {PopupDetailVisitAlertModal} from 'src/Component/Modal/Popup.detail.visit.alert.modal';

export const PopupDetailContainer = ({
  params,
}: {
  params: PopupDetailScreenProps;
}) => {
  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'PopupDetailScreen'>>();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    randomizeOffset,
    popupDetail,
    setPopupDetail,
    getRecentPopupDetail,
    showPopupDetailModal,
    visitPopup,
    requestReopenPopup,
    visitButtonType,
  } = usePopupDetailContext();

  const {
    popupDetailReviews: reviews,
    getPopupDetailReviews,
    setTargetReview,
  } = usePopupDetailReviewContext();

  const navigateHome = () => {
    setModalVisible(false);
    // navigation.navigate('LandingBottomTabNavigator');
  };

  /**
   * 팝업 상세 정보 상태값을 설정합니다.
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

  useEffect(() => {
    let updatePopupInfo: NodeJS.Timeout;
    if ('popup' in params) {
      setPopupDetail(params.popup);
      updatePopupInfo = setTimeout(() => updatePopupDetailInfo(), 500);
    } else {
      updatePopupDetailInfo();
    }
    const popupId = 'popup' in params ? params.popup.id : params.popupId;
    return () => {
      clearTimeout(updatePopupInfo);
    };
  }, []);

  const loading = popupDetail.id === '';

  const RenderItem = ({item}: {item: PopupReviewSchema}) => (
    <ReviewComponent
      randomizeOffset={randomizeOffset}
      popupReviewAuthorId={item.userId}
      review={item}
      showPopupDetailModal={showPopupDetailModal}
      setTargetReview={setTargetReview}
    />
  );

  const keyExtractor = (item: PopupReviewSchema) => item.reviewId.toString();

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
    <PopupDetailContainerView>
      <PopupDetailScreenHeader />
      <FlatList
        data={reviews}
        renderItem={RenderItem}
        style={{backgroundColor: 'white'}}
        ListHeaderComponent={
          loading ? (
            <PopupDetailLoadingScreen />
          ) : (
            <>
              <PopupDetailImageSection />
              <PopupDetailTitleSection />
              <PopupDetailIconSection />
              <PopupDetailDividerSection />
              <PopupDetailInfoSection />
              <DividerLine style={[{marginTop: moderateScale(20)}]} />
              <PopupDetailVisitorSection />
              <DividerLine
                style={[
                  {marginTop: moderateScale(30)},
                  {marginBottom: moderateScale(30)},
                ]}
              />
              <PopupDetailReviewSection />
            </>
          )
        }
        keyExtractor={keyExtractor}
      />
      <PopupDetailBottomButtonRowSection
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <BlackBackgroundModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        allowIgnore={true}>
        <PopupDetailVisitAlertModal onComplete={navigateHome} />
      </BlackBackgroundModal>
    </PopupDetailContainerView>
  );
};

const PopupDetailContainerView = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
