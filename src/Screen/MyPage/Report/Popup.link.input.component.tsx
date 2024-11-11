// import React, { useState } from 'react';
// import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
// import axios from 'axios';
// import styled from 'styled-components/native';
// import { ResearchInputHeader } from './Research.input.header.component';
// import { TextInputSubText } from 'src/Component/Text';
// import { NewLinedTextInput } from 'src/Component/TextInput';
// import { useDynamicResearchConstant } from 'src/Zustand/Research';
// import { debounce, isSupportedResearchLink } from 'src/Util';
// import { themeColors } from 'src/Theme';
// import { CheckSymbol, UpCaretSymbol, DownCaretSymbol } from 'src/Symbol/RNsvg';
// import { BodyText, H4 } from 'src/StyledComponents/Text';
// import { moderateScale } from 'src/Util';
//
// /**
//  * 프로젝트 리서치 링크 입력 컴포넌트입니다.
//  * @author 도형
//  */
// export const PopupLinkInput = ({
//   editable,
//   link,
//   setLink,
//   validLink,
//   setValidLink,
//   style,
// }: {
//   editable: boolean;
//   link: string;
//   setLink: (input: string) => void;
//   validLink: string;
//   setValidLink: (link: string) => void;
//   style?: StyleProp<ViewStyle>;
// }) => {
//   const [linkValidating, setLinkValidating] = useState(false);
//
//   return (
//     <Container style={style}>
//       <ResearchInputHeader required text={'리서치 링크 🔗'} />
//       <LinkInput
//         editable={editable}
//         link={link}
//         setLink={setLink}
//         validLink={validLink}
//         setValidLink={setValidLink}
//         linkValidating={linkValidating}
//         setLinkValidating={setLinkValidating}
//       />
//
//       {Boolean(link) && (
//         <SubTextContainer>
//           <SubText
//             link={link}
//             linkValidating={linkValidating}
//             validLink={validLink}
//           />
//         </SubTextContainer>
//       )}
//
//       <SupportedFormsInfo />
//     </Container>
//   );
// };
//
// const LinkInput = ({
//   editable,
//   link,
//   setLink,
//   validLink,
//   setValidLink,
//   linkValidating,
//   setLinkValidating,
// }: {
//   editable: boolean;
//   link: string;
//   setLink: (input: string) => void;
//   validLink: string;
//   setValidLink: (link: string) => void;
//   linkValidating: boolean;
//   setLinkValidating: (input: boolean) => void;
// }) => {
//   //* 링크가 유효한지 검사하는 용도도 있지만,
//   //* webView 에 bit.ly 링크를 곧바로 넣었을 때 완료 페이지를 감지하지 못하는 문제가 있어서 한차례 변환한 주소를 사용합니다.
//   const checkLinkValid = debounce(async (input: string) => {
//     setValidLink('');
//     await axios
//       .get(input)
//       .then(response => {
//         if (response.request.responseURL) {
//           setValidLink(response.request.responseURL as string);
//           return;
//         }
//         setValidLink('');
//       })
//       .catch(error => {
//         setValidLink('');
//       })
//       .finally(() => setLinkValidating(false));
//   }, 200);
//
//   return (
//     <LinkInput__Container>
//       <IndicatorContainer>
//         {linkValidating ? (
//           <ActivityIndicator size="small" color={themeColors().blue.main} />
//         ) : (
//           <CheckSymbolContainer valid={Boolean(validLink)}>
//             <CheckSymbol size={12} color="white" />
//           </CheckSymbolContainer>
//         )}
//       </IndicatorContainer>
//
//       <NewLinedTextInput
//         props={{
//           editable,
//           multiline: false,
//           placeholder: `https://forms.gle/pi00ck9pl1y`,
//           value: link,
//           onChangeText: (input: string) => {
//             setLink(input);
//             setLinkValidating(true);
//             checkLinkValid(input);
//           },
//           maxLength: 160,
//         }}
//         active={Boolean(validLink)}
//         activeBorderColor="#8BBFF5"
//         style={[
//           editable ? undefined : { color: '#bbbbbb' },
//           Boolean(validLink)
//             ? { borderColor: themeColors().blue.main }
//             : undefined,
//           { paddingRight: moderateScale(40) },
//         ]}
//       />
//     </LinkInput__Container>
//   );
// };
//
// const SubText = ({
//   link,
//   linkValidating,
//   validLink,
// }: {
//   link: string;
//   linkValidating: boolean;
//   validLink: string;
// }) => {
//   const isSupportedLink = isSupportedResearchLink(link);
//
//   if (Boolean(validLink) && !isSupportedLink) {
//     return (
//       <TextInputSubText
//         text={`현재 지원되지 않는 폼을 사용하신 경우, 별도의 검토 시간이 소요됩니다.`}
//         visible={Boolean(link)}
//       />
//     );
//   }
//
//   if (linkValidating) {
//     return (
//       <TextInputSubText
//         text={
//           '링크 유효성을 확인 중입니다. 단축 URL 보다 전체 URL 입력을 권장합니다.'
//         }
//         visible={Boolean(link)}
//       />
//     );
//   }
//
//   if (Boolean(validLink)) {
//     return (
//       <TextInputSubText
//         text={'확인되었습니다'}
//         visible={Boolean(link)}
//         color="BLUE"
//       />
//     );
//   }
//
//   return (
//     <TextInputSubText
//       text={'유효한 링크가 아닙니다. 링크에 오타가 있는지 확인해 주세요.'}
//       visible={Boolean(link) && !Boolean(validLink) && !linkValidating}
//     />
//   );
// };
//
// const SupportedFormsInfo = () => {
//   const [expanded, setExpanded] = useState(false);
//   const forms = useDynamicResearchConstant(state => state.forms);
//
//   const availableForms = forms
//     .filter(form => !!form.formName)
//     .map(formData => formData.formName)
//     .join(', ');
//
//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };
//
//   return (
//     <FormsInfoContainer>
//       <FormsInfoHeader activeOpacity={1} onPress={toggleExpand}>
//         <FormsInfoHeaderText>지원되고 있는 폼</FormsInfoHeaderText>
//         {expanded ? (
//           <UpCaretSymbol color="black" size={18} />
//         ) : (
//           <DownCaretSymbol color="black" size={18} />
//         )}
//       </FormsInfoHeader>
//       {expanded && <FormsInfoText>{availableForms}</FormsInfoText>}
//     </FormsInfoContainer>
//   );
// };
//
// const Container = styled.View``;
//
// const LinkInput__Container = styled.View`
//   position: relative;
// `;
//
// const IndicatorContainer = styled.View`
//   position: absolute;
//   flex-direction: row;
//   justify-content: flex-end;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// `;
//
// const CheckSymbolContainer = styled.View<{ valid: boolean }>`
//   justify-content: center;
//   align-items: center;
//   width: ${moderateScale(16)}px;
//   height: ${moderateScale(16)}px;
//   background-color: ${({ valid, theme }) =>
//     valid ? theme.color.blue.main : theme.color.grey.mild};
//   border-radius: 100px;
// `;
//
// const SubTextContainer = styled.View`
//   flex-wrap: wrap;
//   margin-bottom: ${moderateScale(8)}px;
// `;
//
// const FormsInfoContainer = styled.View`
//   padding: ${moderateScale(0)}px ${moderateScale(8)}px;
// `;
//
// const FormsInfoHeader = styled.TouchableOpacity`
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding: ${moderateScale(8)}px ${moderateScale(0)}px;
// `;
//
// const FormsInfoHeaderText = styled(H4)`
//   font-weight: bold;
// `;
//
// const FormsInfoText = styled(BodyText)`
//   color: ${({ theme }) => theme.color.grey.main};
// `;
