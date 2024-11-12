import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import UnderlinedTextButton from '../../../../Component/UnderlineTextButton';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {SectionContainer} from '../../../../Unit/View';
import {H1} from '../../../../StyledComponents/Text';
import {moderateScale} from '../../../../Util';
import {BodyLargeText} from '../../../../StyledComponents/Text/bodyLarge.component';

interface PopupDetailTitleSectionProps {
  popupName: string;
  popupIntroduce: string;
}

export const PopupDetailTitleSection = () => {
  const {popupDetail} = usePopupDetailContext();
  const [showFullText, setShowFullText] = useState(false);
  return (
    <SectionContainer style={{paddingHorizontal: 16, paddingVertical: 8}}>
      <TitleText>{popupDetail.name}</TitleText>
      {popupDetail.introduce && (
        <>
          <IntroduceText
            numberOfLines={showFullText ? 0 : 2}
            ellipsizeMode="tail">
            {popupDetail.introduce}
          </IntroduceText>
          {popupDetail.introduce.length > 100 && (
            <UnderlinedTextButton
              label={showFullText ? '접기' : '더보기'}
              onClicked={() => setShowFullText(!showFullText)}
            />
          )}
        </>
      )}
    </SectionContainer>
  );
};

const TitleText = styled(BodyLargeText)`
  font-weight: bold;
  margin-top: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(24)}px;
`;

const IntroduceText = styled.Text`
  font-size: ${moderateScale(14)}px;
  margin-top: ${moderateScale(8)}px;
`;

// export const PopupDetailTitleSection: React.FC<
//   PopupDetailTitleSectionProps
// > = ({popupName, popupIntroduce}) => {
//   const [showFullText, setShowFullText] = useState(false);
//
//   return (
//     <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
//       <TitleText>{popupName}</TitleText>
//       {popupIntroduce && (
//         <>
//           <IntroduceText
//             numberOfLines={showFullText ? 0 : 2}
//             ellipsizeMode="tail">
//             {popupIntroduce}
//           </IntroduceText>
//           {popupIntroduce.length > 100 && (
//             <UnderlinedTextButton
//               label={showFullText ? '접기' : '더보기'}
//               onClicked={() => setShowFullText(!showFullText)}
//             />
//           )}
//         </>
//       )}
//     </View>
//   );
// };
