/**
 * 취향 설정 enum
 * @author 도형
 */

export function getPreferenceTitle(key: string): string {
  switch (key) {
    // PREFERENCE options
    case 'market':
      return '🛍️ 소비형';
    case 'display':
      return '🖼️ 전시형';
    case 'experience':
      return '🏃 체험형';
    case 'wantFree':
      return '무료 체험이었으면 좋겠어요';

    // TASTE options
    case 'fashionBeauty':
      return '💄 패션/뷰티';
    case 'characters':
      return '🥰 캐릭터';
    case 'foodBeverage':
      return '🍽️ 식품/음료';
    case 'webtoonAni':
      return '📚 웹툰/애니메이션';
    case 'interiorThings':
      return '🛋️ 인테리어/소품';
    case 'movie':
      return '🎬 영화/드라마/예능';
    case 'musical':
      return '🎼 뮤지컬/연극';
    case 'sports':
      return '⚽ 스포츠';
    case 'game':
      return '🎮 게임';
    case 'itTech':
      return '💻 IT/테크';
    case 'kpop':
      return '🎤 K-POP';
    case 'alcohol':
      return '🍷 주류';
    case 'animalPlant':
      return '🪴 동물/식물';

    // WHO_WITH options
    case 'solo':
      return '나 혼자 방문해요';
    case 'withFriend':
      return '친구와 방문해요';
    case 'withFamily':
      return '가족과 방문해요';
    case 'withLover':
      return '연인과 방문해요';

    default:
      return 'Unknown Preference';
  }
}
