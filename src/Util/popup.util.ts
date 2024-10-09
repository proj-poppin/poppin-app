// export const isScrappedPopup = (popupId: string) => {
//   return useResearchStore
//     .getState()
//     .researchParticipations.some(
//       participation => participation.researchId === researchId,
//     );
// }

// /**
//  * 프로젝트가 마감일이 지났거나 / 마감되었거나 / 블록되었는지 확인합니다.
//  * @author 도형
//  */
// export function isResearchClosed(research: ResearchSchema) {
//   return (
//     didDatePassedDeadline({
//       deadline: research.deadline,
//       defaultValue: false,
//     }) ||
//     research.closed ||
//     research.blocked
//   );
// }

// 순서 재배치할때 굿
// /**
//  * 새로운 프로젝트(들)를 기존의 프로젝트 리스트 맨 앞에 추가하고 반환합니다.
//  * @author 도형
//  */
// export function addResearchListItem(
//   newResearch: ResearchSchema | ResearchSchema[],
//   researchList: ResearchSchema[],
// ) {
//   return [newResearch, ...researchList].flat();
// }

// 업데이트 할때 굿
// /**
//  * 업데이트된 프로젝트를 기존의 프로젝트 리스트에서 찾고 교체한 후 반환합니다.
//  * @author 도형
//  */
// export function updateResearchListItem(
//   updatedResearch: ResearchSchema,
//   researchList: ResearchSchema[],
// ) {
//   return researchList.map(research =>
//     research._id === updatedResearch._id ? updatedResearch : research,
//   );
// }

// 차단하기 할때 굿
// /**
//  * 프로젝트 리스트에서 특정 프로젝트를 찾아 삭제하고 반환합니다.
//  * @author 도형
//  */
// export function removeResearchListItem(
//   researchId: string,
//   researchList: ResearchSchema[],
// ) {
//   return researchList.filter(research => {
//     return research._id !== researchId;
//   });
// }

// /**
//  * 투표 공유 시 사용할 이미지 주소를 반환합니다.
//  * @author 도형
//  */
// export const getVoteShareImage = (vote: VoteSchema) => {
//   if (vote.shareImageUrl) return vote.shareImageUrl;
//   // 일반 투표이고, 이미지가 존재하는 경우, 본문 첫번째 이미지, 혹은 선택지 첫번째 이미지를 반환합니다.
//   if (vote.imageUrls && vote.imageUrls.length > 0) return vote.imageUrls[0];
//   const imageOption = vote.options.find(option => option.imageUrl);
//   if (imageOption && imageOption.imageUrl) return imageOption.imageUrl;
//   // 이미지가 존재하지 않는 경우 기본 이미지를 반환합니다.
//   if (vote.challenge === true)
//     return useDynamicVoteConstant.getState().challengeVoteImageUrl;
//   return useDynamicVoteConstant.getState().defaultShareImageUrl;
// };
//
// /**
//  * 새로운 투표(들)를 기존의 투표 리스트 맨 앞에 추가하고 반환합니다.
//  * @author 도형
//  */
// export function addVoteListItem(
//   newVote: VoteSchema | VoteSchema[],
//   voteList: VoteSchema[],
// ) {
//   return [newVote, ...voteList].flat();
// }
//
// /**
//  * 새로운 투표(들)를 기존의 투표 리스트 맨 뒤에 추가하고 반환합니다.
//  * @author 도형
//  */
// export function appendVoteListItem(
//   newVote: VoteSchema | VoteSchema[],
//   voteList: VoteSchema[],
// ) {
//   return [...voteList, newVote].flat();
// }
//
// /**
//  * 업데이트된 투표를 기존의 투표 리스트에서 찾고 교체한 후 반환합니다.
//  * @author 도형
//  */
// export function updateVoteListItem(
//   updatedVote: VoteSchema,
//   voteList: VoteSchema[],
// ) {
//   return voteList.map(vote =>
//     vote._id === updatedVote._id ? updatedVote : vote,
//   );
// }
//
// /**
//  * 투표 리스트에서 특정 투표를 찾아 삭제하고 반환합니다.
//  * @author 도형
//  */
// export function removeVoteListItem(voteId: string, voteList: VoteSchema[]) {
//   return voteList.filter(vote => {
//     return vote._id !== voteId;
//   });
// }

import {PopupSchema} from 'src/Schema/Popup/popup.schema';

/**
 * 새로운 팝업(들)를 기존의 팝업 리스트 맨 앞에 추가하고 반환합니다.
 * @author 도형
 */
export function addPopupListItem(
  newPopup: PopupSchema | PopupSchema[],
  popupList: PopupSchema[],
) {
  return [newPopup, ...popupList].flat();
}

/**
 * 새로운 팝업(들)를 기존의 팝업 리스트 맨 뒤에 추가하고 반환합니다.
 * @author 도형
 */
export function appendVoteListItem(
  newPopup: PopupSchema | PopupSchema[],
  popupList: PopupSchema[],
) {
  return [newPopup, ...popupList].flat();
}

/**
 * 업데이트된 팝업을 기존의 팝업 리스트에서 찾고 교체한 후 반환합니다.
 * @author 도형
 */
export function updateVoteListItem(
  updatedPopup: PopupSchema,
  popupList: PopupSchema[],
) {
  return popupList.map(popup =>
    popup.id === updatedPopup.id ? updatedPopup : popup,
  );
}

/**
 * 팝업 리스트에서 특정 팝업을 찾아 삭제하고 반환합니다.
 * @author 도형
 */
export function removeVoteListItem(popupId: string, popupList: PopupSchema[]) {
  return popupList.filter(popup => {
    return popup.id !== popupId;
  });
}
