// import React from 'react';
// import {
//   createContext,
//   RefObject,
//   useCallback,
//   useContext,
//   useReducer,
//   useRef,
// } from 'react';
// import {TextInput} from 'react-native';
// import {
//   debounce,
//   isValidEmail,
//   isValidNickname,
//   showBlackToast,
// } from '../../../Util';
// import {axiosVerifyEmailAuthCode} from '../../../Axios/Auth/auth.axios';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {AppStackProps} from '../../../Navigator/App.stack.navigator';
// import {axiosGetRandomNickname} from '../../../Axios/User/user.get.axios';
// import {useUserStore} from '../../../Zustand/User/user.zustand';
//
// type SignupStep = 'EMAIL' | 'AUTH_CODE' | 'NICKNAME' | 'COMPLETE';
//
// export const signupStepOrder: SignupStep[] = [
//   'EMAIL',
//   'AUTH_CODE',
//   'NICKNAME',
//   'COMPLETE',
// ];
//
// type SignupInput = {
//   accountType: 'EMAIL' | 'KAKAO' | 'APPLE' | 'GOOGLE' | 'NAVER';
//   email: string;
//   password: string;
//   nickname: string;
//   authCode: string;
//   appleUserId?: string;
// };
//
// type SignupScreenStatus = {
//   authCodeCorrect: boolean;
//   nicknameVerifying: boolean;
//   nicknameUnique: boolean;
// };
//
// /** */
// type SignupScreenModalType = '';
//
// export type SignupScreenState = SignupInput &
//   SignupScreenStatus & {
//     modalVisible: boolean;
//     modalType: SignupScreenModalType;
//     step: SignupStep;
//   };
//
// const initialSignupScreenState: SignupScreenState = {
//   step: 'EMAIL',
//   accountType: 'EMAIL',
//   email: '',
//   password: '',
//   nickname: '',
//   authCode: '',
//   // status
//   authCodeCorrect: false,
//   nicknameVerifying: false,
//   nicknameUnique: false,
//   modalType: '',
//   modalVisible: false,
// };
//
// function signupScreenStateReducer(
//   signupState: SignupScreenState,
//   action:
//     | {type: 'SETUP_INITIAL_STATE'; payload: Partial<SignupScreenState>}
//     | {type: 'SET_MODAL_VISIBLE'; payload: boolean}
//     | {type: 'SHOW_MODAL'; payload: SignupScreenModalType}
//     | {type: 'UPDATE_STEP'; payload: SignupStep}
//     | {type: 'UPDATE_INPUT'; payload: Partial<SignupInput>}
//     | {type: 'UPDATE_STATUS'; payload: Partial<SignupScreenStatus>},
// ): SignupScreenState {
//   switch (action.type) {
//     /** 회원가입 초기 상태값 설정 */
//     case 'SETUP_INITIAL_STATE':
//       return {...signupState, ...action.payload};
//     /** 모달 표시 */
//     case 'SET_MODAL_VISIBLE':
//       return {...signupState, modalVisible: action.payload};
//     /** 모달 표시 */
//     case 'SHOW_MODAL':
//       return {...signupState, modalVisible: true, modalType: action.payload};
//     /** */
//     case 'UPDATE_STEP':
//       return {...signupState, step: action.payload};
//     /** */
//     case 'UPDATE_INPUT':
//       return {...signupState, ...action.payload};
//     /** */
//     case 'UPDATE_STATUS':
//       return {...signupState, ...action.payload};
//     default:
//       return signupState;
//   }
// }
//
// type SignupContextType = SignupScreenState & {
//   emailInputRef: RefObject<TextInput>;
//
//   // drived states
//   emailValid: boolean;
//   passwordValid: boolean;
//   nicknameValid: boolean;
//
//   /**
//    * 회원가입을 시작 시 초기값을 세팅합니다:
//    * - 회원 가입 시작 로그를 남깁니다
//    * - 서버로부터 랜덤한 닉네임을 가져옵니다.
//    * - 서비스 동의 모달을 띄웁니다.
//    * - 인자로 전달된 초기값이 있다면 해당 값을 설정합니다.
//    * @author 도형
//    */
//   handleSignupStart: (param: {
//     initialState?: Partial<SignupScreenState>;
//   }) => void;
//   goNextStep: () => void;
//   handleBackButton: () => boolean;
//
//   updateInput: (input: Partial<SignupInput>) => void;
//   updateStatus: (status: Partial<SignupScreenStatus>) => void;
//
//   setModalVisible: (visible: boolean) => void;
//
//   sendSignupAuthCode: (authCode: string) => Promise<boolean>;
//
//   getRandomNickname: (param?: {makeLog: boolean}) => Promise<void>;
//   handleNicknameInputChange: (nickname: string) => void;
//
//   onPressEmailStepBottomButton: () => Promise<void>;
//   onPressAuthCodeStepBottomButton: () => Promise<void>;
//   onPressPasswordStepBottomButton: () => Promise<void>;
//   onPressNicknameStepBottomButton: () => Promise<void>;
// };
//
// const SignupScreenContext = createContext<SignupContextType | undefined>(
//   undefined,
// );
//
// /**
//  * 회원가입 화면에서 사용되는 상태와 함수를 제공합니다.
//  * @author 도형
//  */
//
// /** */
// export function useSignupContext() {
//   const context = useContext(SignupScreenContext);
//   if (context === undefined) {
//     throw new Error('회원가입 콘텍스트가 제공되지 않았습니다.');
//   }
//   return context;
// }
//
// /**
//  * 회원가입 화면에서 사용되는 상태와 함수를 제공합니다.
//  * @author 도형
//  */
// export function SignupScreenProvider({
//   screenProps,
//   children,
// }: {
//   screenProps: NativeStackScreenProps<AppStackProps, 'SignupScreen'>;
//   children: React.ReactNode;
// }) {
//   const [signupState, dispatch] = useReducer(
//     signupScreenStateReducer,
//     initialSignupScreenState,
//   );
//
//   const emailInputRef = useRef<TextInput>(null);
//
//   /** 입력 이메일 형식 유효성 여부 */
//   const emailValid =
//     signupState.email.length >= 5 && isValidEmail(signupState.email);
//
//   /** 비밀번호 유효성 여부. 8자 이상이기만 하면 됩니다. */
//   const passwordValid = signupState.password.length >= 8;
//
//   /** 입력 닉네임 형식 유효성 여부 */
//   const nicknameValid = isValidNickname(signupState.nickname);
//
//   /**
//    * 회원가입을 시작합니다.
//    * 서버로부터 랜덤한 닉네임을 가져오고 서비스 동의 모달을 띄웁니다.
//    * 인자로 전달된 초기값이 있다면 해당 값을 설정합니다.
//    * @author 도형
//    */
//   async function handleSignupStart(param: {
//     initialState?: Partial<SignupScreenState>;
//   }) {
//     if (param.initialState) {
//       dispatch({type: 'SETUP_INITIAL_STATE', payload: param.initialState});
//     }
//     getRandomNickname();
//     setTimeout(() => {
//       setModalVisible(true);
//     }, 350);
//   }
//
//   /** 회원가입에 사용되는 입력값을 업데이트합니다. */
//   function updateInput(input: Partial<SignupInput>) {
//     dispatch({type: 'UPDATE_INPUT', payload: input});
//   }
//
//   /** */
//   function updateStatus(status: Partial<SignupScreenStatus>) {
//     dispatch({type: 'UPDATE_STATUS', payload: status});
//   }
//
//   /** */
//   function goNextStep() {
//     const nextStep =
//       signupStepOrder[signupStepOrder.indexOf(signupState.step) + 1];
//     dispatch({type: 'UPDATE_STEP', payload: nextStep});
//   }
//
//   /** 뒤로 가기 버튼을 눌렀을 때 행동 지정 */
//   const handleBackbutton = useCallback(() => {
//     const step = signupState.step;
//     if (step === 'EMAIL') {
//       // 이메일 입력 페이지: 뒤로 가기 버튼을 intercept 하지 않습니다. 바로 전 화면 (Auth.landing) 으로 이동합니다.
//       return false;
//     } else if (step === 'AUTH_CODE') {
//       // 인증 번호 입력 페이지: 이메일 입력 단계로 돌아갑니다.
//       dispatch({type: 'UPDATE_STEP', payload: 'EMAIL'});
//       return true;
//     } else if (step === 'NICKNAME') {
//       // 닉네임 입력 페이지: 비밀번호 입력 단계로 돌아갑니다. 단, 카카오 간편 가입인 경우 가입 자체를 취소하고 이전 화면으로 돌아갑니다.
//       if (signupState.accountType === 'KAKAO') {
//         return false;
//       } else if (signupState.accountType === 'APPLE') {
//         return false;
//       }
//     } else if (step === 'COMPLETE') {
//       // 회원가입 완료 페이지: 뒤로 가기 버튼을 무시합니다.
//       return true;
//     }
//     return false;
//   }, [signupState.step]);
//
//   /** */
//   const setModalVisible = (visible: boolean) => {
//     dispatch({type: 'SET_MODAL_VISIBLE', payload: visible});
//   };
//
//   /** */
//   const getRandomNickname = async (param?: {makeLog: boolean}) => {
//     const nickname = await axiosGetRandomNickname();
//     if (nickname !== null) {
//       updateInput({nickname, useRandomNickname: true});
//       updateStatus({nicknameVerifying: false, nicknameUnique: true});
//     }
//   };
//
//   /** */
//   function handleNicknameInputChange(nickname: string) {
//     const refinedNickname = nickname.trim().replace(/ /g, '');
//     updateInput({nickname: refinedNickname});
//     if (refinedNickname.length >= 2) {
//       updateStatus({nicknameUnique: false, nicknameVerifying: true});
//     }
//   }
//   /**
//    * 인증 번호 6자리를 입력했을 때 호출합니다.
//    * 입력한 인증 번호를 검증하고 맞다면 다음 단계로 넘어갑니다.
//    */
//   async function sendSignupAuthCode() {
//     const response = await axiosVerifyEmailAuthCode({
//       email: signupState.email,
//       verificationType: 'SIGN_UP',
//     });
//     if (response !== null && response.result === true) {
//       dispatch({type: 'UPDATE_STEP', payload: 'EMAIL_VERIFY_COMPLETE'});
//       return true;
//     }
//     return false;
//   }
//
//   /** */
//   const onPressEmailStepBottomButton = async () => {
//     if (emailValid === false) {
//       showBlackToast({text1: '유효한 이메일 형식이 아닙니다.'});
//       return;
//     }
//     const result = await axiosVerifyEmailAuthCode({
//       email: signupState.email,
//       verificationType: 'SIGN_UP',
//     });
//     if (result) {
//       dispatch({type: 'UPDATE_STEP', payload: 'AUTH_CODE'});
//     }
//   };
//
//   /** */
//   const onPressAuthCodeStepBottomButton = async () => {
//     const result = await axiosVerifyEmailAuthCode({
//       email: signupState.email,
//       verificationType: 'SIGN_UP',
//     });
//     if (result) {
//       showBlackToast({text1: '인증 번호가 재전송 되었습니다.'});
//     }
//   };
//
//   /** */
//   const onPressPasswordStepBottomButton = async () => {
//     if (passwordValid) {
//       goNextStep();
//     } else {
//       showBlackToast({text1: '8자 이상의 비밀번호를 입력해 주세요.'});
//     }
//   };
//
//   /**
//    * 닉네임 입력 페이지 하단 버튼을 눌렀을 때 실행 함수.
//    * 닉네임 형식이 올바른 경우 회원가입합니다.
//    */
//   const onPressNicknameStepBottomButton = async () => {
//     if (signupState.nicknameVerifying) {
//       return;
//     }
//     if (signupState.useRandomNickname === false && nicknameValid === false) {
//       showBlackToast({
//         text1: '2자 이상의 한글/영문/숫자 조합으로 입력해주세요',
//       });
//       return;
//     }
//     if (signupState.nicknameUnique === false) {
//       showBlackToast({
//         text1: '이미 사용 중인 닉네임입니다.',
//       });
//       return;
//     }
//     const signupSucceed = await useUserStore.getState().signup({
//       accountType: signupState.accountType,
//       email: signupState.email,
//       password: signupState.password,
//       passwordConfirm: signupState.password,
//       nickname: signupState.nickname,
//       fcmToken: '',
//       agreedToPrivacyPolicy: true,
//       agreedToServiceTerms: true,
//     });
//
//     if (signupSucceed) {
//       goNextStep();
//     }
//   };
//
//   const value: SignupContextType = {
//     ...signupState,
//
//     emailInputRef,
//
//     emailValid,
//     passwordValid,
//     nicknameValid,
//
//     handleSignupStart,
//     goNextStep,
//     handleBackbutton,
//
//     updateInput,
//     updateStatus,
//
//     setModalVisible,
//
//     sendSignupAuthCode: sendSignupAuthCode,
//
//     getRandomNickname,
//     handleNicknameInputChange,
//
//     onPressEmailStepBottomButton,
//     onPressAuthCodeStepBottomButton,
//     onPressPasswordStepBottomButton,
//     onPressNicknameStepBottomButton,
//   };
//
//   return (
//     <SignupScreenContext.Provider value={value}>
//       {children}
//     </SignupScreenContext.Provider>
//   );
// }
import React, {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {TextInput} from 'react-native';
import {isValidEmail, isValidNickname, showBlackToast} from '../../../Util';
import {axiosSendEmailAuthCode, axiosSignUp} from 'src/Axios/Auth/auth.axios';
import {axiosGetRandomNickname} from '../../../Axios/User/user.get.axios';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import {useUserStore} from '../../../Zustand/User/user.zustand';

type SignupStep = 'EMAIL' | 'AUTH_CODE' | 'NICKNAME' | 'COMPLETE';

/** */
type SignupScreenModalType = '';

export const signupStepOrder: SignupStep[] = [
  'EMAIL',
  'AUTH_CODE',
  'NICKNAME',
  'COMPLETE',
];

type SignupInput = {
  email: string;
  accountType: 'DEFAULT' | 'KAKAO' | 'APPLE' | 'GOOGLE' | 'NAVER';
  password: string;
  authCode: string;
  nickname: string;
  useRandomNickname: boolean;
  birthday: string;
  appleUserId?: string;
};

/** */
type SignupScreenStatus = {
  authCodeCorrect: boolean;
  nicknameVerifying: boolean;
  nicknameUnique: boolean;
};

export type SignupScreenState = SignupInput &
  SignupScreenStatus & {
    modalVisible: boolean;
    modalType: SignupScreenModalType;
    step: SignupStep;
    /** 회원가입을 유도한 유저/프로젝트 정보 */
    referrerUserId?: string;
    referrerResearchId?: string;
  };
const initialSignupScreenState: SignupScreenState = {
  step: 'EMAIL',
  modalVisible: false,
  modalType: '',
  nicknameUnique: false,
  nicknameVerifying: false,
  authCodeCorrect: false,
  email: '',
  accountType: 'DEFAULT',
  password: '',
  authCode: '',
  nickname: '',
  useRandomNickname: false,
  birthday: '',
};

function signupScreenStateReducer(
  signupState: SignupScreenState,
  action:
    | {type: 'SETUP_INITIAL_STATE'; payload: Partial<SignupScreenState>}
    | {type: 'UPDATE_STEP'; payload: SignupStep}
    | {type: 'UPDATE_INPUT'; payload: Partial<SignupInput>},
): SignupScreenState {
  switch (action.type) {
    /** 회원가입 초기 상태값 설정 */
    case 'SETUP_INITIAL_STATE':
      return {...signupState, ...action.payload};
    case 'UPDATE_STEP':
      return {...signupState, step: action.payload};
    case 'UPDATE_INPUT':
      return {...signupState, ...action.payload};
    default:
      return signupState;
  }
}

type SignupContextType = SignupScreenState & {
  emailInputRef: RefObject<TextInput>;

  // Derived states
  emailValid: boolean;
  passwordValid: boolean;
  nicknameValid: boolean;
  birthdayValid: boolean;
  /**
   * 회원가입을 시작 시 초기값을 세팅합니다:
   * - 회원 가입 시작 로그를 남깁니다
   * - 서버로부터 랜덤한 닉네임을 가져옵니다.
   * - 서비스 동의 모달을 띄웁니다.
   * - 인자로 전달된 초기값이 있다면 해당 값을 설정합니다.
   * @author 도형
   */
  handleSignupStart: (param: {
    initialState?: Partial<SignupScreenState>;
  }) => void;
  updateInput: (input: Partial<SignupInput>) => void;
  goNextStep: () => void;
  handleBackButton: () => boolean;
  sendSignupAuthCode: () => Promise<boolean>;
  getRandomNickname: (param?: {makeLog: boolean}) => Promise<void>;
  verifyAuthCode: (authCode: string) => Promise<boolean>;
  onPressEmailStepBottomButton: () => Promise<void>;
  onPressAuthCodeResendButton: () => Promise<void>;
  onPressAuthCodeStepBottomButton: () => Promise<void>;
  onPressNicknameStepBottomButton: () => Promise<void>;
  onPressSetPreferenceLater: () => void;
};

const SignupScreenContext = createContext<SignupContextType | undefined>(
  undefined,
);

export function useSignupContext() {
  const context = useContext(SignupScreenContext);
  if (context === undefined) {
    throw new Error('회원가입 콘텍스트가 제공되지 않았습니다.');
  }
  return context;
}

export function SignupScreenProvider({
  screenProps,
  children,
}: {
  screenProps: NativeStackScreenProps<AppStackProps, 'SignupScreen'>;
  children: React.ReactNode;
}) {
  const [signupState, dispatch] = useReducer(
    signupScreenStateReducer,
    initialSignupScreenState,
  );

  const emailInputRef = useRef<TextInput>(null);

  const emailValid =
    signupState.email.length >= 5 && isValidEmail(signupState.email);
  const passwordValid = signupState.password.length >= 8;
  const nicknameValid = isValidNickname(signupState.nickname);
  const birthdayValid = /^\d{4}\.\d{2}\.\d{2}$/.test(signupState.birthday);

  /** 회원가입에 사용되는 입력값을 업데이트합니다. */
  function updateInput(input: Partial<SignupInput>) {
    dispatch({type: 'UPDATE_INPUT', payload: input});
  }

  /** */
  function updateStatus(status: Partial<SignupScreenStatus>) {
    dispatch({type: 'UPDATE_STATUS', payload: status});
  }

  function goNextStep() {
    const nextStep =
      signupStepOrder[signupStepOrder.indexOf(signupState.step) + 1];
    dispatch({type: 'UPDATE_STEP', payload: nextStep});
  }

  //   /** 뒤로 가기 버튼을 눌렀을 때 행동 지정 */
  const handleBackButton = useCallback(() => {
    const step = signupState.step;
    if (step === 'EMAIL') {
      // 이메일 입력 페이지: 뒤로 가기 버튼을 intercept 하지 않습니다. 바로 전 화면 (Auth.landing) 으로 이동합니다.
      return false;
    } else if (step === 'AUTH_CODE') {
      // 인증 번호 입력 페이지: 이메일 입력 단계로 돌아갑니다.
      dispatch({type: 'UPDATE_STEP', payload: 'EMAIL'});
      return true;
    } else if (step === 'NICKNAME') {
      // 닉네임 입력 페이지: 비밀번호 입력 단계로 돌아갑니다. 단, 카카오 간편 가입인 경우 가입 자체를 취소하고 이전 화면으로 돌아갑니다.
      // if (signupState.accountType === 'KAKAO') {
      //   return false;
      // } else if (signupState.accountType === 'APPLE') {
      //   return false;
      // }
    } else if (step === 'COMPLETE') {
      // 회원가입 완료 페이지: 뒤로 가기 버튼을 무시합니다.
      return true;
    }
    return false;
  }, [signupState.step]);

  /**
   * 회원가입을 시작합니다.
   * 서버로부터 랜덤한 닉네임을 가져오고 서비스 동의 모달을 띄웁니다.
   * 인자로 전달된 초기값이 있다면 해당 값을 설정합니다.
   * @author 도형
   */
  async function handleSignupStart(param: {
    initialState?: Partial<SignupScreenState>;
  }) {
    if (param.initialState) {
      dispatch({type: 'SETUP_INITIAL_STATE', payload: param.initialState});
    }
    getRandomNickname();
    setTimeout(() => {}, 350);
  }

  async function sendSignupAuthCode() {
    const response = await axiosSendEmailAuthCode({
      email: signupState.email,
      verificationType: 'SIGN_UP',
    });
    if (response) {
      goNextStep();
      return true;
    }
    return false;
  }

  /** */
  const getRandomNickname = async (param?: {makeLog: boolean}) => {
    const randomNicknameState = await axiosGetRandomNickname();
    if (randomNicknameState !== null) {
      console.log('randomNicknameState: ', randomNicknameState.randomNickname);
      updateInput({
        nickname: randomNicknameState.randomNickname,
        useRandomNickname: true,
      });
      updateStatus({nicknameVerifying: false, nicknameUnique: true});
    }
  };

  /** */
  function handleNicknameInputChange(nickname: string) {
    const refinedNickname = nickname.trim().replace(/ /g, '');
    updateInput({nickname: refinedNickname});
    if (refinedNickname.length >= 2) {
      updateStatus({nicknameUnique: false, nicknameVerifying: true});
    }
  }

  /**
   * 인증 번호 6자리를 입력했을 때 호출합니다.
   * 입력한 인증 번호를 검증하고 맞다면 다음 단계로 넘어갑니다.
   */
  async function verifyAuthCode(authCode: string) {
    // const response = await axiosVerifyEmailAuthCode({
    //   email: signupState.email,
    //   authCode,
    // });
    // if (response !== null && response.result === true) {
    //   makeFirebaseLogEvent(AUTH_LOGS.signup.verify_auth_code);
    //   appsFlyer.logEvent(AUTH_LOGS.signup.verify_auth_code, {});
    //
    //   dispatch({ type: 'UPDATE_STEP', payload: 'EMAIL_VERIFY_COMPLETE' });
    return true;
    // }
    return false;
  }

  const onPressEmailStepBottomButton = async () => {
    if (emailValid === false) {
      showBlackToast({text1: '유효한 이메일 형식이 아닙니다.'});
      return;
    }
    const result = await axiosSendEmailAuthCode({
      email: signupState.email,
      verificationType: 'SIGN_UP',
    });
    if (result) {
      goNextStep();
    }
  };

  const onPressAuthCodeResendButton = async () => {
    const result = await axiosSendEmailAuthCode({
      email: signupState.email,
      verificationType: 'SIGN_UP',
    });
    if (result) {
      showBlackToast({text1: '인증 번호가 재전송 되었습니다.'});
    }
  };

  const onPressAuthCodeStepBottomButton = async () => {
    goNextStep();
  };

  const onPressNicknameStepBottomButton = async () => {
    // Trim any whitespace from the nickname
    const trimmedNickname = signupState.nickname.trim();

    // Validate nickname and birthday
    if (trimmedNickname.length < 2 || trimmedNickname.length > 10) {
      showBlackToast({
        text1: '2자 이상, 10자 이하의 유효한 닉네임을 입력해주세요.',
      });
      return;
    }

    const isBirthdateValid = /^\d{4}\.\d{2}\.\d{2}$/.test(signupState.birthday);
    console.log('signupState.nickname: ', signupState.nickname);
    console.log('signupState.nickname: ', signupState.authCode);

    if (!birthdayValid) {
      showBlackToast({
        text1: '올바른 생년월일 형식(YYYY.MM.DD)으로 입력해주세요.',
      });
      return;
    }

    const fcmToken = await messaging().getToken();

    const signupSucceed = await useUserStore.getState().signup({
      accountType: signupState.accountType,
      email: signupState.email,
      password: signupState.password,
      passwordConfirm: signupState.password,
      nickname: trimmedNickname,
      fcmToken: fcmToken,
      agreedToPrivacyPolicy: true,
      agreedToServiceTerms: true,
      appleUserId: signupState?.appleUserId,
    });
    if (signupSucceed) {
      goNextStep();
    } else {
      showBlackToast({text1: '회원가입에 실패했습니다. 다시 시도해주세요.'});
    }
  };

  /** */
  function onPressSetPreferenceLater() {
    // makeFirebaseLogEvent(AUTH_LOGS.signup.ignore_cert(signupState.accountType));
    // appsFlyer.logEvent(
    //   AUTH_LOGS.signup.ignore_cert(signupState.accountType),
    //   {},
    // );
    const popWhenSucceed = screenProps.route.params.popWhenSucceed;
    if (popWhenSucceed !== undefined) {
      screenProps.navigation.pop(popWhenSucceed);
    } else {
      screenProps.navigation.goBack();
    }
  }

  const value: SignupContextType = {
    ...signupState,
    emailInputRef,
    emailValid,
    passwordValid,
    nicknameValid,
    birthdayValid,
    handleSignupStart,
    updateInput,
    goNextStep,
    handleBackButton,
    sendSignupAuthCode,
    getRandomNickname,
    verifyAuthCode,
    onPressEmailStepBottomButton,
    onPressAuthCodeResendButton,
    onPressAuthCodeStepBottomButton,
    onPressNicknameStepBottomButton,
    onPressSetPreferenceLater,
  };

  return (
    <SignupScreenContext.Provider value={value}>
      {children}
    </SignupScreenContext.Provider>
  );
}
