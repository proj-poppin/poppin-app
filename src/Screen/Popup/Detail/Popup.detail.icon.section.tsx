import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Linking, Pressable} from 'react-native';
import InstagramTestSvg from 'src/Resource/svg/instagram-border-button.svg';
import LinkCopySvg from 'src/Resource/svg/link-copy-blue-icon.svg';
import StarFilledSvg from 'src/Resource/svg/star-filled-icon.svg';
import StarOutlineSvg from 'src/Resource/svg/star-outline-icon.svg';
import ShareSvg from 'src/Resource/svg/share-icon.svg';
import {usePopupDetailContext} from './Provider/Popup.detail.provider';
import SvgWithNameBoxLabel from '../../../Component/SvgWithNameBoxLabel';
import {moderateScale} from '../../../Util';
import {useUserStore} from '../../../Zustand/User/user.zustand';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';

const PopupDetailIconSection = () => {
  const user = useUserStore(state => state.user);
  const popupScraps = usePopupStore(state => state.popupScraps);
  const {
    popupDetail,
    scrapping,
    scrapPopup,
    unScrapPopup,
    showPopupDetailModal,
  } = usePopupDetailContext();

  //* 스크랩 여부
  const scrapped = popupScraps.some(popup => popup.popupId === popupDetail.id);

  console.log('scrapped : ', scrapped);

  const onPressUnScrap = () => {
    showPopupDetailModal('UNSCRAP');
  };

  const handleOpenLink = (link: string) => {
    Linking.openURL(link).catch(e => console.log(e));
  };

  const handleShare = () => {
    // Sharing logic
  };

  return (
    <IconSectionContainer>
      <LeftRightContainer>
        <Pressable onPress={() => handleOpenLink(popupDetail.homepageLink)}>
          {popupDetail.isInstagram ? (
            <SvgWithNameBoxLabel
              Icon={InstagramTestSvg}
              label="공식 인스타그램"
              isBold={false}
            />
          ) : (
            <SvgWithNameBoxLabel
              Icon={LinkCopySvg}
              label="공식 페이지"
              isBold={false}
            />
          )}
        </Pressable>

        <RightIconsContainer>
          <Pressable onPress={scrapped ? onPressUnScrap : scrapPopup}>
            {scrapped ? <StarFilledSvg /> : <StarOutlineSvg />}
          </Pressable>
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

export default PopupDetailIconSection;
