import React from 'react';
import {LandingScreenHeader} from 'src/Component/View';
import styled from 'styled-components/native';
import CalendarSvg from 'src/Resource/svg/show-calendar-blue-icon.svg';
import ListIconSvg from 'src/Resource/svg/show-list-blue-icon.svg';
import {moderateScale} from 'src/Util';
import {themeColors} from 'src/Theme/theme';
import {useUserStore} from 'src/Zustand/User/user.zustand';

interface PopupLikesLandingScreenHeaderProps {
  isCalendarView: boolean;
  toggleView: () => void;
}

export const PopupLikesLandingScreenHeader: React.FC<
  PopupLikesLandingScreenHeaderProps
> = ({isCalendarView, toggleView}) => {
  const {isLoggedIn} = useUserStore(state => ({isLoggedIn: state.isLoggedIn}));

  const loggedIn = isLoggedIn();

  return (
    <LandingScreenHeader
      title="관심 팝업"
      RightComponents={
        loggedIn ? (
          <ToggleViewButton onPress={toggleView}>
            {isCalendarView ? (
              <>
                <IconSmallBlueText>리스트 보기</IconSmallBlueText>
                <ListIconSvg width={24} height={24} />
              </>
            ) : (
              <>
                <IconSmallBlueText>캘린더 보기</IconSmallBlueText>
                <CalendarSvg width={24} height={24} />
              </>
            )}
          </ToggleViewButton>
        ) : null
      }
    />
  );
};

const IconSmallBlueText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${themeColors().blue.main};
`;

const ToggleViewButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
