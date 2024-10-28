/**
 * @ServerSync
 * !IMPORTANT!
 * 서버에서 동적으로 받아오는 Enum 타입 등을 지정할 때 사용합니다.
 * value 는 DB 에 저장되는 값이고, displayName 은 UI 에 표시되는 값입니다.
 * 이 외에도 추가적인 데이터가 전달될 수 있습니다.
 * @author 도형
 */
export type EnumValueWithName = {
  value: string | any;
  displayName: string;
  // data?: any;
};
