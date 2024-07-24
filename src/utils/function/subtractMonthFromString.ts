export function subtractMonthFromString(dateString: string) {
  // 입력된 문자열을 연도와 월로 분리
  const [year, month] = dateString.split('.').map(Number);
  // 새로운 Date 객체 생성
  const date = new Date(year, month - 1); // month - 1로 0부터 시작하는 월 보정
  // 한 달 빼기
  date.setMonth(date.getMonth() - 1);
  // 결과 문자열 생성 (월을 2자리로 맞춤)
  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, '0'); // month + 1로 보정 후 2자리로 포맷

  return `${newYear}.${newMonth}`;
}
