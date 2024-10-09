import React from 'react';
import HorizontalScrollContainer from '../../../../Component/HorizontalScrollContainer/HorizontalScrollContainer.component';
import {BodyLargeText} from '../../../../StyledComponents/Text/bodyLarge.component';
import {SectionContainer} from '../../../../Unit/View';
import {moderateScale} from '../../../../Util';
import styled from 'styled-components/native';
import {HomeLandingSectionType} from '../../../../Zustand/App/app.zustand';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import HomeLandingPopupCard from '../Card/Home.landing.popupCard.component';

interface HomeLandingPopupSectionProps {
  sectionType: HomeLandingSectionType;
  popups: PopupSchema[];
}

const HomeLandingPopupSection: React.FC<HomeLandingPopupSectionProps> = ({
  sectionType,
  popups,
}) => {
  const sectionText = () => {
    switch (sectionType) {
      case 'NEWLY_OPENED':
        return '새로 오픈';
      case 'CLOSING_SOON':
        return '종료 임박';
      case 'POPULAR_TOP5':
        return '인기 TOP5';
      case 'PREFERENCE_TARGETED':
        return '';
    }
  };

  return (
    <SectionContainer
      style={{
        paddingBottom: moderateScale(20),
        marginBottom: moderateScale(20),
      }}>
      <HomeLandingSectionText>{sectionText()}</HomeLandingSectionText>
      <HorizontalScrollContainer
        images={popups?.map(popup => (
          <HomeLandingPopupCard
            key={popup.id}
            id={popup.id}
            imageUrl={popup.imageUrls[0]}
            name={popup.name}
            introduce={popup.introduce}
          />
        ))}
      />
    </SectionContainer>
  );
};

const HomeLandingSectionText = styled(BodyLargeText)`
  margin-bottom: ${moderateScale(10)}px;
`;

export default HomeLandingPopupSection;
