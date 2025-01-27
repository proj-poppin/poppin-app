import React from 'react';
import styled from 'styled-components/native';
import {Alert, Linking, Pressable, Text} from 'react-native';
import InstagramTestSvg from 'src/Resource/svg/instagram-border-button.svg';
import LinkCopySvg from 'src/Resource/svg/link-copy-blue-icon.svg';
import StarFilledSvg from 'src/Resource/svg/star-filled-icon.svg';
import StarOutlineBlackSvg from 'src/Resource/svg/star-outline-black-icon.svg';
import ShareSvg from 'src/Resource/svg/share-icon.svg';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import SvgWithNameBoxLabel from '../../../../Component/SvgWithNameBoxLabel';
import {moderateScale} from '../../../../Util';
import {useUserStore} from '../../../../Zustand/User/user.zustand';
import {usePopupStore} from '../../../../Zustand/Popup/popup.zustand';
import {shareFeedTemplate} from '@react-native-kakao/share';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import shallow from 'zustand/shallow';
import Config from 'react-native-config';
import {DETAIL, POPUP} from '../../../../Axios/axios.core';

const PopupDetailIconSection = () => {
  const {popupDetail, scrapping, scrapPopup, unScrapPopup} =
    usePopupDetailContext();

  const interestedPopupStores = usePopupStore(
    state => state.interestedPopupStores,
  );
  const loadingStates = usePopupStore(state => state.loadingStates);
  const setLoadingState = usePopupStore(state => state.setLoadingState);

  const scrapped =
    interestedPopupStores?.some(popup => popup.id === popupDetail.id) ?? false;

  const checkLoginAndShowModal = useAppStore(
    state => state.checkLoginAndShowModal,
    shallow,
  );

  const handleFavoritePress = async () => {
    // #RESACLE
    if (!checkLoginAndShowModal('POPUP_SCRAP')) {
      return;
    }

    setLoadingState(popupDetail.id, true); // 로딩 상태 시작

    try {
      if (scrapped) {
        await unScrapPopup();
      } else {
        await scrapPopup();
      }
    } catch (error) {
      console.error(`Error toggling scrap for popup ${popupDetail.id}:`, error);
    } finally {
      setLoadingState(popupDetail.id, false); // 로딩 상태 종료
    }
  };
  // 2차 배포시 수정 해주세요!!
  /**
   * @author 도형
   * 2차 배포시 공유 링크 테스트 링크에서 실제 배포 링크로 수정 해주세요!!
   */
  const handleOpenLink = (link: string) => {
    if (!link) {
      console.warn('유효하지 않은 링크입니다.');
      return;
    }
    Linking.openURL(link).catch(e => console.log(e));
  };

  const handleShare = async () => {
    try {
      const {name, introduce, imageUrls} = popupDetail;
      const mainImageUrl = imageUrls?.[0];

      const destination = {
        type: 'popup',
        popupId: popupDetail.id.toString(),
      };

      // Link parameters with correct typing
      const link = {
        webUrl: `${Config.API_URL}/popup/${popupDetail.id}`,
        mobileWebUrl: `${Config.API_URL}/popup/${popupDetail.id}`,
        androidExecutionParams: {
          kakaoLinkParams: JSON.stringify(destination),
        },
        iosExecutionParams: {
          kakaoLinkParams: JSON.stringify(destination),
        },
      };

      await shareFeedTemplate({
        template: {
          content: {
            title: name || '디폴트 팝업 이름',
            description: introduce || '팝업스토어 한줄 소개가 없습니다.',
            imageUrl: mainImageUrl,
            link,
          },
          buttons: [
            {
              title: '자세히 보기',
              link,
            },
          ],
        },
      });
    } catch (error) {
      console.error('카카오톡 공유 실패', error);
    }
  };

  const isLoading = loadingStates[popupDetail.id] ?? false;

  return (
    <IconSectionContainer>
      <LeftRightContainer>
        {/*
          클릭 이벤트는 SvgWithNameBoxLabel 내부 PressableContainer에서 처리됩니다.
          따라서 상위 Pressable을 삭제한 뒤 SvgWithNameBoxLabel에 직접 onPress를 전달하도록 수정하였습니다.
          @author 희진
        */}
        {/* <Pressable onPress={() => handleOpenLink(popupDetail.homepageLink)}> */}
        {popupDetail.isInstagram ? (
          <SvgWithNameBoxLabel
            width={moderateScale(150)}
            height={moderateScale(35)}
            Icon={InstagramTestSvg}
            label="공식 인스타그램"
            isBold={false}
            onPress={() => handleOpenLink(popupDetail.homepageLink)}
          />
        ) : (
          <SvgWithNameBoxLabel
            width={moderateScale(150)}
            height={moderateScale(35)}
            Icon={LinkCopySvg}
            label="공식 페이지"
            isBold={false}
            onPress={() => handleOpenLink(popupDetail.homepageLink)}
          />
        )}
        {/* </Pressable> */}
        <RightIconsContainer>
          <FavoriteButton>
            <Pressable
              onPress={handleFavoritePress}
              disabled={scrapping || isLoading}>
              {scrapped ? <StarFilledSvg /> : <StarOutlineBlackSvg />}
            </Pressable>
            {(isLoading || scrapping) && <LoadingText>로딩중...</LoadingText>}
          </FavoriteButton>
          <Pressable onPress={handleShare}>
            <ShareSvg style={{marginLeft: 20}} />
          </Pressable>
        </RightIconsContainer>
      </LeftRightContainer>
    </IconSectionContainer>
  );
};

const IconSectionContainer = styled.View`
  padding: ${moderateScale(16)}px;
`;

const LeftRightContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightIconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const FavoriteButton = styled.View`
  align-items: center;
  position: relative;
`;

const LoadingText = styled(Text)`
  font-size: ${moderateScale(10)}px;
  position: absolute;
  color: ${({theme}) => theme.color.blue.main};
  margin-left: ${moderateScale(55)}px;
  width: ${moderateScale(35)}px;
  top: ${moderateScale(30)}px;
`;

export default PopupDetailIconSection;
