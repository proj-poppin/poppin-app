export type TFilter = {
  id: number;
  label: string;
  name: string;
  selected: boolean;
};
export const POP_UP_TYPES: TFilter[] = [
  {id: 1, name: 'fashionBeauty', label: '💄 패션/뷰티', selected: false},
  {id: 2, name: 'characters', label: '🥰 캐릭터', selected: false},
  {id: 3, name: 'foodBeverage', label: '🍽️ 식품/음료', selected: false},
  {id: 4, name: 'webtoonAni', label: '📚 웹툰/애니메이션', selected: false},
  {id: 5, name: 'interiorThings', label: '🛋️ 인테리어/소품', selected: false},
  {id: 6, name: 'movie', label: '🎬 영화/드라마/예능', selected: false},
  {id: 7, name: 'musical', label: '🎼 뮤지컬/연극', selected: false},
  {id: 8, name: 'sports', label: '⚽ 스포츠', selected: false},
  {id: 9, name: 'game', label: '🎮 게임', selected: false},
  {id: 10, name: 'itTech', label: '💻 IT/테크', selected: false},
  {id: 11, name: 'kpop', label: '🎤 K-POP', selected: false},
  {id: 12, name: 'alcohol', label: '🍷 주류', selected: false},
  {id: 13, name: 'animalPlant', label: '🪴 동물/식물', selected: false},
  {id: 14, name: 'etc', label: '기타', selected: false},

  {id: 15, name: 'market', label: '🛍️ 소비형', selected: false},
  {id: 16, name: 'display', label: '🖼️ 전시형', selected: false},
  {id: 17, name: 'experience', label: '🏃 체험형', selected: false},
  {
    id: 18,
    name: 'freeExperience',
    label: '무료 체험이었으면 좋겠어요',
    selected: false,
  },
  {id: 19, name: 'alone', label: '나 혼자 방문해요', selected: false},
  {id: 20, name: 'withFriend', label: '친구와 방문해요', selected: false},
  {id: 21, name: 'withFamily', label: '가족과 방문해요', selected: false},
  {id: 22, name: 'withLover', label: '연인과 방문해요', selected: false},

  {id: 23, name: 'G_RATED', label: '전체', selected: false},
  {id: 24, name: 'PG_7', label: '7세 이상', selected: false},
  {id: 25, name: 'PG_12', label: '12세 이상', selected: false},
  {id: 26, name: 'PG_15', label: '15세 이상', selected: false},
  {id: 27, name: 'PG_18', label: '성인', selected: false},
];
