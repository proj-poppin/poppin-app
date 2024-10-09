import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TempPopupSchema} from '../../../../Schema/Popup/tempPopup.schema';
import {BodyLargeText} from '../../../../StyledComponents/Text/bodyLarge.component';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import DownIcon from 'src/Resource/svg/down-arrow-gray-icon.svg';
import UpIcon from 'src/Resource/svg/up-arrow-gray-icon.svg';
import QuestionIcon from 'src/Resource/svg/question.svg';
import {FastImageContainer} from 'src/Component/Image/FastImage.component';
import {moderateScale} from 'src/Util';
import {themeColors} from 'src/Theme/theme';
import {BodyMediumText} from 'src/StyledComponents/Text/bodyMedium.component';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';

interface PopularTop5PopupSectionProps {
  popups: PopupSchema[];
}

const PopularTop5PopupSection: React.FC<PopularTop5PopupSectionProps> = ({
  popups,
}) => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Index to show when dropdown is closed

  // 자동으로 항목이 변경되는 기능 추가 (3초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % popups.length);
    }, 3000);
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 클리어
  }, [popups]);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleNotice = () => {
    setShowNotice(prev => !prev);
  };

  // 일단 대체
  if (popups.length === 0)
    return <ActivityIndicator size="large" color={themeColors().purple.main} />;

  return (
    <Container>
      <HeaderContainer>
        <LeftContainer>
          <BodyLargeText>인기 TOP 5</BodyLargeText>
          <QuestionContainer>
            <Pressable onPress={toggleNotice}>
              <QuestionIcon width={24} height={24} />
            </Pressable>
            {showNotice && (
              <TooltipContainer>
                <FastImageContainer
                  fitOnHeight
                  style={{
                    height: moderateScale(40),
                  }}
                  source={require('src/Resource/png/home-hot-list-tooltip.png')}
                />
              </TooltipContainer>
            )}
          </QuestionContainer>
        </LeftContainer>

        <Pressable onPress={toggleDropdown}>
          {isDropdownOpen ? <UpIcon /> : <DownIcon />}
        </Pressable>
      </HeaderContainer>

      {isDropdownOpen ? (
        <HotListContainer>
          {popups.map(popup => (
            <Pressable
              key={popup.id}
              onPress={() =>
                navigation.navigate('PopupDetailScreen', {
                  popup: popup,
                })
              }
              // hot 팝업마다 줄 간격 띄우기
              style={{paddingVertical: moderateScale(6)}}>
              <BodyMediumText numberOfLines={1} ellipsizeMode="tail">
                🔥 {popup.name}
              </BodyMediumText>
            </Pressable>
          ))}
        </HotListContainer>
      ) : (
        <HotListContainer>
          <Pressable
            onPress={() =>
              navigation.navigate('PopupDetailScreen', {
                popup: popups[currentIndex],
              })
            }>
            <HotListText numberOfLines={1} ellipsizeMode="tail">
              🔥 {popups[currentIndex].name}
            </HotListText>
          </Pressable>
        </HotListContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  padding: ${moderateScale(20)}px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const QuestionContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: ${moderateScale(10)}px;
  position: relative;
`;

const TooltipContainer = styled.View`
  position: absolute;
  left: ${moderateScale(5)}px;
  bottom: ${moderateScale(20)}px;
`;

const HotListContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  background-color: ${themeColors().purple.mild};
  border-radius: ${moderateScale(10)}px;
  padding: ${moderateScale(10)}px;
  margin-top: ${moderateScale(10)}px;
`;

const HotListText = styled(BodyMediumText)``;

export default PopularTop5PopupSection;
