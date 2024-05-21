export const PreferenceCategories = {
  PREFERENCE: 'preference',
  TASTE: 'taste',
  WHO_WITH: 'whoWith',
} as const;

export const preferenceOptionsFirst = [
  {title: '🛍️ 소비형', key: 'market'},
  {title: '🖼️ 전시형', key: 'display'},
  {title: '🏃 체험형', key: 'experience'},
  {title: '무료 체험이었으면 좋겠어요', key: 'wantFree'},
];

export const preferenceOptionsSecond = [
  {title: '💄 패션/뷰티', key: 'fashionBeauty'},
  {title: '🥰 캐릭터', key: 'characters'},
  {title: '🍽️ 식품/음료', key: 'foodBeverage'},
  {title: '📚 웹툰/애니메이션', key: 'webtoonAni'},
  {title: '🛋️ 인테리어/소품', key: 'interiorThings'},
  {title: '🎬 영화/드라마/예능', key: 'movie'},
  {title: '🎼 뮤지컬/연극', key: 'musical'},
  {title: '⚽ 스포츠', key: 'sports'},
  {title: '🎮 게임', key: 'game'},
  {title: '💻 IT/테크', key: 'itTech'},
  {title: '🎤 K-POP', key: 'kpop'},
  {title: '🍷 주류', key: 'alcohol'},
  {title: '🪴 동물/식물', key: 'animalPlant'},
];

export const preferenceOptionsThird = [
  {title: '나 혼자 방문해요', key: 'solo'},
  {title: '친구와 방문해요', key: 'withFriend'},
  {title: '가족과 방문해요', key: 'withFamily'},
  {title: '연인과 방문해요', key: 'withLover'},
];
