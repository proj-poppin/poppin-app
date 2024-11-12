import messaging from '@react-native-firebase/messaging';

/** 로그인, 자동 로그인, 알림 설정 페이지에서 활용합니다. */

type FirebaseTopic = 'RESEARCH_RECOMM' | 'VOTE_RECOMM' | 'EVENT' | 'NOTICE';

const allFirebaseTopics: FirebaseTopic[] = [
  'RESEARCH_RECOMM',
  'VOTE_RECOMM',
  'EVENT',
  'NOTICE',
];

/**
 * Firebase 에서 보내는 푸시알림에 대한 수신 여부를 앱단에서의 appPush 설정과 동기화하기 위해,
 * 앱단에서 appPush 를 설정하면 Firebase 의 Topic 을 구독/구독해제 하는 형식으로 처리합니다.
 * @author 도형
 */
export const subscribeFirebaseTopics = (topics: FirebaseTopic[]) => {
  topics.forEach(topic => {
    messaging().subscribeToTopic(topic);
  });
};

/**
 * 현재 사용 중인 모든 Topic 을 구독합니다.
 * 로그인하지 않은 기기에 대해 적용됩니다.
 */
export const subscribeAllFirebaseTopics = () => {
  allFirebaseTopics.forEach(topic => {
    messaging().subscribeToTopic(topic);
  });
};

/** 특정 Topic 을 구독해제합니다. */
export const unsubscribeFirebaseTopics = (topics: FirebaseTopic[]) => {
  topics.forEach(topic => {
    messaging().unsubscribeFromTopic(topic);
  });
};

/** 모든 Topic 을 구독해제합니다. */
export const unsubscribeAllFirebaseTopics = () => {
  allFirebaseTopics.forEach(topic => {
    messaging().unsubscribeFromTopic(topic);
  });
};
