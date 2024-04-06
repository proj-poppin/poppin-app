export type PreferenceData = {
  preference: {
    market: boolean;
    display: boolean;
    experience: boolean;
    wantFree: boolean;
  };
  taste: {
    fashionBeauty: boolean;
    characters: boolean;
    foodBeverage: boolean;
    webtoonAni: boolean;
    interiorThings: boolean;
    movie: boolean;
    musical: boolean;
    sports: boolean;
    game: boolean;
    itTech: boolean;
    kpop: boolean;
    alcohol: boolean;
    animalPlant: boolean;
  };
  whoWith: {
    solo: boolean;
    withFriend: boolean;
    withFamily: boolean;
    withLover: boolean;
  };
};
