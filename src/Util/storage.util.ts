import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

/** AsyncStroage에 저장할 수 있는 키 값 타입 */
export type storageKey =
  | 'REFRESH_TOKEN' // refresh token
  | 'ACCESS_TOKEN' // access token
  | 'EMAIL' // 로그인/회원가입에 성공했던 마지막 이메일
  | 'SAW_GUIDE' // 서비스 가이드 페이지를 확인했는지 여부
  | 'TEMPORARY_ONELINK'; // onelink로 들어온 경우 임시로 저장하는 값;

/**
 * EncryptedStorage에 각 토큰 값을 저장합니다.
 * @author 도형
 */
export const setEncryptedStorage = async (key: storageKey, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
    console.log(`Successfully set ${key}`);
  } catch (error) {
    console.log(`setStorage of key ${key} error: ${error}`);
  }
};

/**
 * AsyncStroage에 저장된 값을 가져옵니다.
 * @author 도형
 */
export const getEncryptedStorage = async (key: storageKey) => {
  try {
    return await EncryptedStorage.getItem(key);
  } catch (error) {
    console.log(`getStroage of key ${key} error: ${error}`);
    return null;
  }
};

/**
 * AsyncStroage에 주어진 키:값을 저장합니다.
 * @author 도형
 */
export const setStorage = async (key: storageKey, value: any) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`setStroage of key ${key} error: ${error}`);
    return;
  }
};

/**
 * AsyncStroage에 저장된 값을 가져옵니다.
 * @author 도형
 */
export const getStorage = async (key: storageKey) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`getStroage of key ${key} error: ${error}`);
    return null;
  }
};

/**
 * AsyncStorage 를 사용할 때, Key 값이 고정되어 있지 않는 값에 접근하는 경우 사용합니다.
 * @author 도형
 */
export const setStringKeyStorage = async (key: string, value: any) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`setStringKeyStroage of key ${key} error: ${error}`);
    return;
  }
};

export const getStringKeyStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`getStringKeyStroage of key ${key} error: ${error}`);
    return null;
  }
};

export const removeStringKeyStorage = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`removeStringKeyStroage of key ${key} error: ${error}`);
    return null;
  }
};

//* JSON 값
export type jsonStorageKey = 'INTERESTED_POPUP_SCRAPS'; // 비회원으로 참여했던 투표 정보
// | 'RESEARCH_PARTICIPATIONS' // 비회원으로 참여했던 프로젝트 참여 정보
// | 'ERRORED_RESEARCH_PARTICIPATIONS'; // 에러가 일어났던 프로젝트 참여 정보

/**
 * AsyncStroage에 주어진 키:JSON 값을 저장합니다.
 * @author 도형
 */
export const setJsonStorage = async (key: jsonStorageKey, value: any) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

/**
 * AsyncStroage에 저장된 JSON 값을 가져옵니다.
 * @author 도형
 */
export const getJsonStorage = async (key: jsonStorageKey) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {}
};
