// import create from 'zustand';
// import {useUserStore} from '../../../Zustand/User/user.zustand';
// import {getStorage} from 'src/Util';
// import {axiosLoginWithEmailPassword} from '../../../Axios/Auth/auth.axios';

/**
 * @deprecated
 *
 * 로그인 페이지에서 사용되는 값과 함수들을 정의하는 zustand
 * useContext, Provider를 사용하는 방식으로 변경되었습니다.
 * useContext가 필요한 직관적인 예시로 남겨둡니다
 * Problem)
 * useContext 는 해당 파일이 종속된 Screen 이 unmount 되는 경우
 * 상태값이 초기화되는 반면,
 * Zustand 의 상태값은 앱을 끄기 전까지 지속됩니다.
 * password 값을 입력하다가 뒤로가기햇다가 다시돌아왔을때
 * password 값이 초기화되지 않는 문제가 있습니다.
 * @author 도형
 */

// type Inputs = {
//   email: string;
//   password: string;
// };
//
// type LoginScreenStoreProps = {
//   /** Async Storage 에 저장된 이메일 입력값, 자동 로그인 사용 여부를 반영 */
//   setInitialInput: () => Promise<void>;
//
//   inputs: {
//     email: string;
//     password: string;
//   };
//   setInputs: (input: Partial<Inputs>) => void;
//
//   /** 이메일 오류 및 비밀번호 오류 */
//   emailError: string;
//   passwordError: string;
//   setEmailError: (error: string) => void;
//   setPasswordError: (error: string) => void;
//
//   /** 로그인 시도중 여부 */
//   isLoading: boolean;
//   /** 로그인 시도 함수 */
//   login: () => Promise<{success: boolean; jwt?: string}>;
//
//   clearStates: () => void;
// };
//
// /**
//  * 로그인 페이지에서 사용되는 값과 함수들을 정의하는 zustand 입니다.
//  */
// export const useLoginScreenStore = create<LoginScreenStoreProps>(
//   (set, get) => ({
//     setInitialInput: async () => {
//       const email = await getStorage('EMAIL');
//       if (email) {
//         set({inputs: {email, password: ''}});
//       }
//     },
//
//     inputs: {
//       email: '',
//       password: '',
//     },
//     setInputs: (input: Partial<Inputs>) => {
//       set({inputs: {...get().inputs, ...input}});
//     },
//
//     emailError: '',
//     passwordError: '',
//     setEmailError: (error: string) => set({emailError: error}),
//     setPasswordError: (error: string) => set({passwordError: error}),
//
//     isLoading: false,
//
//     login: async () => {
//       const {email, password} = get().inputs;
//       set({isLoading: true, emailError: '', passwordError: ''});
//
//       // Check if fields are empty and set errors
//       if (!email) {
//         set({emailError: 'Please enter an email', isLoading: false});
//         return {success: false};
//       }
//       if (!password) {
//         set({passwordError: 'Please enter a password', isLoading: false});
//         return {success: false};
//       }
//
//       try {
//         const loginResponse = await axiosLoginWithEmailPassword({
//           email: email.trim(),
//           password: password.trim(),
//         });
//
//         if (loginResponse?.success) {
//           await useUserStore.getState().setLoggedInUserInfo(loginResponse);
//           set({isLoading: false});
//           return {success: true};
//         }
//
//         // Error handling based on response error codes
//         if (loginResponse?.error?.code === '40400') {
//           set({emailError: 'X 등록되지 않은 사용자에요'});
//         } else if (loginResponse?.error?.code === '40019') {
//           set({passwordError: 'X 잘못된 비밀번호에요'});
//         } else {
//           set({emailError: 'X 등록되지 않은 사용자에요'});
//         }
//       } catch (error) {
//         set({emailError: 'An unexpected error occurred'});
//       } finally {
//         set({isLoading: false});
//       }
//       return {success: false};
//     },
//
//     clearStates: () => {
//       set({
//         inputs: {email: '', password: ''},
//         emailError: '',
//         passwordError: '',
//         isLoading: false,
//       });
//     },
//   }),
// );
