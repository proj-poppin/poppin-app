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

  const loggedIn = useUserStore(state => state.isLoggedIn());

  const handleFavoritePress = async () => {
    if(!loggedIn) {
      // #RESACLE
      Alert.alert('로그인 모달 추가하기');
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

  const handleOpenLink = (link: string) => {
    Linking.openURL(link).catch(e => console.log(e));
  };

  const handleShare = () => {};

  const isLoading = loadingStates[popupDetail.id] ?? false;

  return (
    <IconSectionContainer>
      <LeftRightContainer>
        <Pressable onPress={() => handleOpenLink(popupDetail.homepageLink)}>
          {popupDetail.isInstagram ? (
            <SvgWithNameBoxLabel
              width={moderateScale(150)}
              height={moderateScale(35)}
              Icon={InstagramTestSvg}
              label="공식 인스타그램"
              isBold={false}
            />
          ) : (
            <SvgWithNameBoxLabel
              width={moderateScale(150)}
              height={moderateScale(35)}
              Icon={LinkCopySvg}
              label="공식 페이지"
              isBold={false}
            />
          )}
        </Pressable>
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
