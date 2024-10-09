# ZUSTAND

_@reference : https://github.com/pmndrs/zustand_

### **[ ROLE ]**

- 앱 전반에 걸쳐 사용되는 상태값을 관리합니다.

### **[ 네이밍 규칙 ]**

- _{ 카테고리 } . zustand.ts_
    - 유저, 전체 프로젝트 등 앱 전반에 걸쳐 사용되는 상태값을 관리하는 경우
    - _e.g. user.zustand.ts, research.zustand.ts_
      <br><br>

### **[ 작동 원리/규칙 ]**

- React 상태관리 라이브러리 zustand 를 사용합니다.
- 자동 완성 기능 및 타입 안정성을 위하여 Zustand 에서 사용할 변수/함수 타입을 모두 지정합니다.
- create 로 만들어지는 오브젝트명은 _{ use ~ Store }_ 로 짓습니다.
- e.g.

  ```TypeScript
  // ~ .zustand.ts 정의 예시
  import create from 'zustand';

  type SomeScreenProps = {
    numProperty: number;
    strProperty: string;

    getNumProperty: () => number;
    setStrProperty: (input: string) => string;
  };

  export const useSomeScreenStore = create<SomeScreenProps>((set, get) => ({
    numProperty: 0,
    strProperty: '',

    /** set, get 함수는 zustand 에서 정의한 상태값에 접근하거나 변경할 때 사용합니다. */
    getNumProperty: () => {
      return get().numProperty;
    },
    setStrProperty: (input: string) => {
      set({ strProperty: input })
    }
  }))

  // 상태값 호출/사용 예시
  import React from 'react';
  import shallow from 'zustand/shallow';
  import { useSomeScreenStore } from 'src/Zustand';

  export function SomeScreen() {
    //! 2개 이상의 상태값을 동시에 가져올 경우, shallow 를 사용해야 합니다.
    const { numProperty, strProperty, setStrProperty } =
      useSomeScreenStore(state => ({
        numProperty: state.numProperty,
        strProperty: state.strProperty,
        setStrProperty: state.setStrProperty,
      }), shallow)

    return ( ... )
  }
  ```

### **[ 기타 ]**

#### **< useContext 와의 차이점 >**

- useContext 는 해당 파일이 종속된 Screen 이 unmount 되는 경우 상태값이 초기화되는 반면, Zustand 의 상태값은 앱을 끄기 전까지 지속됩니다.

- 따라서 다음과 같은 경우 Zustand 를 사용합니다:

    1. 앱 전체에 걸쳐 하나만 존재해야 하는 화면에서 사용되는 상태값을 관리하는 경우
        - 회원가입 화면에 대한 Zustand
        - 제보하기 화면에 대한 Zustand
        - ...
    2. 앱 전반에서 접근해야 하는 정보를 담고 있어야 하는 경우
        - 유저 정보 저장 Zustand
        - 전체 팝업 스토어 정보 저장 Zustand
        - ...

- 반대로 useContext 를 사용하는 경우는 다음과 같습니다:
    1. 앱에서 여러 개의 화면이 존재할 수 있는 경우
        - 팝업 상세 페이지
        - ...
