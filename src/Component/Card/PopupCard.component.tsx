import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

interface RowPopUpCardProps {
  id: number;
  imageUrl: string;
  name: string;
  introduce: string;
}

const RowPopUpCard: React.FC<RowPopUpCardProps> = ({
  imageUrl,
  name,
  introduce,
}) => {
  return (
    <CardContainer>
      <StyledFastImage source={{uri: imageUrl}} />
      <TextContainer>
        <Name numberOfLines={1}>{name}</Name>
        <Introduce numberOfLines={1}>{introduce}</Introduce>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  flex-direction: column;
  border-radius: 16px;
  margin-right: 10px;
  background-color: white;
  width: 180px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 5;
  border-width: 0.5px;
  border-color: #ddd;
`;

const StyledFastImage = styled(FastImage)`
  width: 100%;
  height: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const TextContainer = styled.View`
  padding: 10px;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: black;
  margin-bottom: 4px;
`;

const Introduce = styled.Text`
  font-size: 14px;
  color: gray;
`;

export default RowPopUpCard;
