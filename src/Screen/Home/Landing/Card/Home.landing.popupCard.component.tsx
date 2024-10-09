import React from 'react';
import styled from 'styled-components/native';
import {FastImageContainer} from 'src/Component/Image/FastImage.component';
import {moderateScale} from 'src/Util';
import {DetailText} from 'src/StyledComponents/Text';
import {themeColors} from '../../../../Theme/theme';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AppStackProps} from '../../../../Navigator/App.stack.navigator';

interface HomeLandingPopupCardProps {
  id: string;
  imageUrl: string;
  name: string;
  introduce: string;
}

const HomeLandingPopupCard: React.FC<HomeLandingPopupCardProps> = ({
  id,
  imageUrl,
  name,
  introduce,
}) => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const onPressCard = () => {
    navigation.navigate('PopupDetailScreen', {popupId: id});
  };

  return (
    <CardContainer onPress={onPressCard}>
      <FastImageContainer
        source={{uri: imageUrl}}
        style={{flex: 1}} // 이미지를 부모 컨테이너 크기에 맞춤
      />
      <TextContainer>
        <NameText numberOfLines={1}>{name}</NameText>
        <IntroduceText numberOfLines={1}>{introduce}</IntroduceText>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin-right: ${moderateScale(10)}px;
  width: ${moderateScale(170)}px;
  height: ${moderateScale(220)}px;
  border-radius: ${moderateScale(12)}px;
  border-width: ${moderateScale(0.5)}px;
  border-color: #ddd;
  overflow: hidden;
`;

const TextContainer = styled.View`
  padding: ${moderateScale(8)}px;
`;

const NameText = styled(DetailText)`
  font-weight: 600;
  margin-bottom: ${moderateScale(4)}px;
`;

const IntroduceText = styled(DetailText)`
  color: ${themeColors().grey.main};
`;

export default HomeLandingPopupCard;
