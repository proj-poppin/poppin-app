import create from 'zustand';

/**
 * @ServerSync
 * 서버에서 동적으로 받아오는 서비스 관련 상수 타입
 * 예) 버전을 체크하고 업데이트 할 수 있도록 합니다.
 * @author 도형
 */
export type DynamicServiceConstants = {
  APP_VERSION_INFO: {
    recentVersion: string;
    requiredVersion: string; // 1.1.2 > 1.1.2
    requiredAndroidVersion: string;
    requiredIOSVersion: string;
  };

  APPLE_APP_STORE_URL: string;
  KAKAO_CHAT_URL: string;
  SERVICE_TERMS: string;
  PRIVACY_TERMS: string;
};

type DynamicServiceConstantStoreProps = DynamicServiceConstants & {
  updateServiceConstants: (
    serviceConstants: Partial<DynamicServiceConstants>,
  ) => void;
};

/**
 * 앱 서비스 자체와 관련된 상수를 customHook 으로 관리합니다.
 * 서버에서 동적으로 데이터가 변경될 수 있습니다.
 * 현재 1.4.1 - 2025.02.16
 * @author 도형, 규진
 */
export const useDynamicServiceConstant =
  create<DynamicServiceConstantStoreProps>((set, get) => ({
    APP_VERSION_INFO: {
      recentVersion: '0.0.0',
      requiredVersion: '0.0.0',
      requiredAndroidVersion: '0.0.0',
      requiredIOSVersion: '0.0.0',
      requiredVersionForResearchUpload: '0.0.0',
      requiredVersionForVoteUpload: '0.0.0',
    },
    APPLE_APP_STORE_URL:
      'https://apps.apple.com/kr/app/팝핀-맞춤형-팝업-스토어-추천/id6482994685',

    KAKAO_CHAT_URL: 'http://pf.kakao.com/_CCtFG/chat',
    SERVICE_TERMS:
      'https://docs.google.com/document/d/1gFo_QEY_lea3pzP9fJH9X0oWx7yF6PgefenNWsJDMvM/edit?usp=sharing',
    PRIVACY_TERMS:
      'https://docs.google.com/document/d/1KgYNHqbleQ3r9lbhuVjbCDEpxW-zPzDKka8D2qVZ2UI/edit?usp=sharing',

    updateServiceConstants: (
      serviceConstants: Partial<DynamicServiceConstants>,
    ) => {
      set({
        ...get(),
        ...serviceConstants,
      });
    },
  }));
