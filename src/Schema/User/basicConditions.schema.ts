/**
 * 프로젝트 / 투표 / 이벤트 / 배너 등을 노출할지 여부를 결정하는 기본 조건입니다.
 * @author 도형
 */
export type BasicConditionsSchema = {
  /** 이 값이 true 로 설정된 경우, 검증에서 모든 조건을 무시하고 true 를 반환합니다. */
  allowAll?: boolean;

  /** 이 값이 true 로 설정된 경우, 비회원은 무조건 false 값을 반환받습니다. */
  restrictNonMemberParticipation?: boolean;

  minAppVersion?: string;

  OS?: string[];

  student?: boolean;

  foreigner?: boolean;

  /** 성별 스크리닝 적용 여부 */
  useGenderScreening?: boolean;

  /** 연령 스크리닝 적용 여부 */
  useAgeScreening?: boolean;

  /** 연령 스크리닝 사용시, 나이를 직접 설정할 것인지 여부 */
  manuallySelectAge?: boolean;

  /** 한국식 나이 사용 여부 */
  useKoreanAge?: boolean;

  /** 참여/노출 성별 조건 */
  targetGenders?: string[];

  /** 참여/노출 조건: 최소 나이 */
  targetMinAge?: number;

  /** 참여/노출 조건: 최대 나이 */
  targetMaxAge?: number;

  /** 참여/노출 조건: 나이대 */
  targetAgeGroups?: string[];

  /** 추가 조건: 이곳에 명시된 key 값 중 하나라도 UserProperty 의 addtionalProperties 에 존재해야 조건을 만족합니다. */
  additionalPropertyKeys?: string[];

  /** 추가 조건: 이곳에 명시된 '모든' key 값이 UserProperty 의 addtionalProperties 존재해야 조건을 만족합니다. */
  requiredPropertyKeys?: string[];
};
