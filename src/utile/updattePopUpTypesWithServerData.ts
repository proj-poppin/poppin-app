import { POP_UP_TYPES } from "../pages/myPage/preferenceSetting/types";

export const updatePopUpTypesWithServerData = (data) => {
  return POP_UP_TYPES.map(item => {
    if (data.preference && data.preference[item.name] !== undefined) {
      return { ...item, selected: data.preference[item.name] };
    }
    if (data.taste && data.taste[item.name] !== undefined) {
      return { ...item, selected: data.taste[item.name] };
    }
    if (data.whoWith && data.whoWith[item.name] !== undefined) {
      return { ...item, selected: data.whoWith[item.name] };
    }
    return item;
  });
};
export const transformData = (data) => {
 const transformed = {
    preference: {
      market: false,
      display: false,
      experience: false,
      wantFree: false,
    },
    taste: {
      fashionBeauty: false,
      characters: false,
      foodBeverage: false,
      webtoonAni: false,
      interiorThings: false,
      movie: false,
      musical: false,
      sports: false,
      game: false,
      itTech: false,
      kpop: false,
      alcohol: false,
      animalPlant: false,
    },
    whoWith: {
      solo: false,
      withFriend: false,
      withFamily: false,
      withLover: false,
    },
  };

  data.forEach(item => {
    if (item.name in transformed.preference) {
      transformed.preference[item.name] = item.selected;
    } else if (item.name in transformed.taste) {
      transformed.taste[item.name] = item.selected;
    } else if (item.name in transformed.whoWith) {
      transformed.whoWith[item.name] = item.selected;
    }
  });

  return transformed;
};


