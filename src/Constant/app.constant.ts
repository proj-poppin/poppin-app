export const APP_VERSION = '1.7.15';

/**
 * localhost 에서 실행 중인 서버에 요청을 하는 경우,
 * $ adb -s <device 혹은 emulator 이름> reverse tcp:<backend port> tcp:<backend port>
 * 명령어를 입력하여 로컬 호스트 서버와 통신이 가능하도록 설정해야 합니다.
 * @author 도형
 */
// export const API_ENDPOINT = 'http://127.0.0.1:5000';
export const API_ENDPOINT = 'https://sample.com';

export const RESOURCE_ENDPOINT_PREFIX = 'https://resource.pickply.com';
/**
 * 다이나믹 링크를 생성하거나/다이나믹 링크를 통해 앱을 실행하는 경우 사용합니다.
 * 앱에서 사용되는 도메인입니다.
 */
export const WEB_DYNAMICLINK_URL_PREFIX = 'https://sample.com/?dynamicLink=';
export const WEB_ONELINK_URL_PREFIX = 'https://sample.onelink.me/U2AiT/';
