export type TFilter = {
  id: number;
  label: string;
  name: string;
  selected: boolean;
};
export const POP_UP_TYPES: TFilter[] = [
  {id: 1, name: 'fashionBeauty', label: '패션/뷰티', selected: false},
  {id: 2, name: 'characters', label: '캐릭터', selected: false},
  {id: 3, name: 'foodBeverage', label: '식품/음료', selected: false},
  {id: 4, name: 'webtoonAni', label: '웹툰/애니메이션', selected: false},
  {id: 5, name: 'interiorThings', label: '인테리어/소품', selected: false},
  {id: 6, name: 'movie', label: '영화/드라마/예능', selected: false},
  {id: 7, name: 'musical', label: '뮤지컬/연극', selected: false},
  {id: 8, name: 'sports', label: '스포츠', selected: false},
  {id: 9, name: 'game', label: '게임', selected: false},
  {id: 10, name: 'itTech', label: 'IT/테크', selected: false},
  {id: 11, name: 'kpop', label: 'K-POP', selected: false},
  {id: 12, name: 'alcchol', label: '주류', selected: false},
  {id: 13, name: 'animalPlant', label: '동물/식물', selected: false},
  {id: 14, name: 'etc', label: '기타', selected: false},

  {id: 15, name: 'market', label: '🛍️소비형', selected: false},
  {id: 16, name: 'display', label: '🖼️전시형', selected: false},
  {id: 17, name: 'experience', label: '🏃체험형', selected: false},
];
