# 7장 전역 상태 관리
* 코드 실행(GitHub Page): <https://uzoolove.github.io/febc11-react/workspace-ins/index.html#07>

## 전역 상태 관리란?

### 상태 관리
- 리액트는 `useState`와 `useReducer` 훅을 사용해 컴포넌트 내부의 상태를 관리할 수 있음.
- 상태가 변경되면 해당 컴포넌트가 다시 렌더링되며 화면이 업데이트됨.
- 하지만 `useState`와 `useReducer`는 컴포넌트 내부 상태만 관리하므로, 다른 컴포넌트와 상태를 공유할 수 없음.

### 전역 상태 관리
- 애플리케이션 전반에 걸쳐 사용되는 데이터를 관리하거나, 여러 컴포넌트가 상태를 공유해야 하고 특정 컴포넌트에서 상태를 변경하면 공유된 모든 컴포넌트가 리렌더링 되도록 하는 상태 관리를 전역 상태 관리라고 함.
- 전역 상태 관리를 직접 구현하고 관리하기가 어렵기 때문에 주로 라이브러리를 사용함.

### 전역 상태 관리 라이브러리
- 대표적인 라이브러리:
  - Redux, MobX, Context API, Recoil, Zustand, Jotai, Valtio 등.
- 각 라이브러리는 상태 관리 방식, 성능 최적화, 사용 편의성에서 차이를 가짐.

### 전역 상태 관리 사용 사례
#### 인증 상태 관리
- 사용자 로그인 여부와 사용자 정보를 전역 상태로 관리.
- 로그인 여부에 따라 UI 렌더링(예: 로그인/로그아웃 버튼, 프로필 이미지).
- API 호출 시 인증 토큰을 전역에서 참조.

#### 테마 및 환경 설정
- 다크모드, 폰트 크기, 언어와 같은 전역 설정.
- 모든 컴포넌트에서 접근 가능해야 하며, 설정 변경 시 전체 컴포넌트의 UI가 업데이트됨.

#### 쇼핑 카트 관리
- 여러 페이지에서 접근해야 하는 데이터(예: 상품 추가, 삭제).
- 상품의 총 수량과 금액 계산.

#### 알림 및 메시지 관리
- 앱 전역에서 알림/메시지를 관리.
- 읽지 않은 메시지의 수를 보여주거나, 실시간 알림 UI를 구현.

#### API 상태 및 캐싱
- 서버 데이터의 로딩 상태, 성공/실패 상태를 관리.
- 같은 데이터를 여러 컴포넌트에서 재사용(예: 프로필 데이터, 상품 리스트).

#### 멀티스텝 폼 데이터
- 여러 단계로 나뉜 폼 데이터(예: 회원가입, 주문서 작성)를 상태로 관리.
- 각 단계의 입력값을 저장하고, 이전 단계로 돌아가도 데이터가 유지되도록 함.

## Redux

### Redux란?
* Redux는 JavaScript 애플리케이션의 상태를 관리하기 위한 라이브러리로, 주로 React와 함께 사용됨
* 컴포넌트 간 상태 공유를 단순화하고, 상태 관리의 예측 가능성을 높이는 데 초점을 맞춤
* Flux 아키텍처를 바탕으로 만들어졌으며, 복잡한 상태 관리를 단순화
* 핫 리로딩(코드 수정 후 바로 반영)과 시간여행 디버깅(상태 변경을 되돌아보는 기능) 같은 개발 편의 기능 제공
* React에만 국한되지 않고, 모든 자바스크립트 기반 애플리케이션에서 사용 가능

### Redux의 특징
- 중앙 집중식 상태 관리: 애플리케이션 전체 상태를 한 곳(`Store`)에서 관리.
- 예측 가능성: 상태 변경은 항상 순수 함수(`Reducer`)를 통해 이루어지며, 동일한 입력은 동일한 출력을 보장.
- 단방향 데이터 흐름: 데이터는 컴포넌트(이벤트 발생) → 액션(작업 정의) → 리듀서(상태 관리) → 스토어(상태 저장) 순으로 한 방향으로 흐름.

### Redux 사용 사례
- 대규모 애플리케이션에서 전역 상태 관리가 필요한 경우.
- 상태 변경 추적, 디버깅, 테스트가 중요한 프로젝트.

### Flux 아키텍처
* 웹 애플리케이션을 만들 때 사용하는 설계 패턴
* 데이터가 한 방향으로만 흐르도록 관리해 애플리케이션 구조를 단순화
* React와 함께 사용하면, 데이터 흐름을 명확히 하여 UI 컴포넌트를 더 쉽게 관리할 수 있음

#### Flux 구성 요소
![Flux 구성 요소](https://raw.githubusercontent.com/uzoolove/febc11-react/main/images/flux-won2.png)  
[그림 1. Flux 구조] 출처 "원쌤의 리액트 퀵스타트 with 타입스트립트"

* **Stores**
  - 애플리케이션의 상태와 상태를 변경하는 로직을 관리
  - 상태를 직접 수정하지 않고 항상 새 상태를 만들어야 함 (불변성 유지)

* **Views**
  - Store에서 제공하는 상태를 UI로 보여줌
  - 사용자의 액션(클릭, 입력 등)을 통해 Action을 실행할 수 있는 환경 제공

* **ActionCreators**
  - 상태를 변경하기 위한 주요 로직(비즈니스 로직)을 처리
  - 처리 결과를 Action으로 만들어 Dispatcher로 전달

* **Action**
  - Store의 상태를 어떻게 바꿀지에 대한 정보가 담긴 객체
  - Dispatcher를 통해 Store로 전달되어 상태 변경을 유도
  ```js
  { type: 'countDown', payload: { step: 2 } }
  ```

* **Dispatcher**
  - 데이터를 전달하는 중심 역할을 하는 하나의 통로
  - Action에서 받은 메시지를 Store로 전달
  - 모든 데이터 흐름이 여기서 시작됨

### Redux 구성 요소

![Redux 구조](https://raw.githubusercontent.com/uzoolove/febc11-react/main/images/redux-won.png)  
[그림 1. Redux 구조] 출처 "원쌤의 리액트 퀵스타트 with 타입스크립트"

* **Store**
  - 애플리케이션 전체 상태를 한 곳에서 관리하는 중앙 저장소
  - Store를 보면 현재 상태와 상태 변경 기록을 알 수 있음
  - Flux와 달리 상태 변경 작업은 Reducer라는 별도 함수로 나눠서 관리해 복잡성을 줄임

* **ActionCreators**
  - 상태를 변경하기 위해 액션을 만드는 역할
  - 액션을 Store로 전달(dispatch)하면 Store는 이걸 Reducer에 넘김
  - Reducer가 새로운 상태를 만들어 반환하면, 이 상태가 Store에 저장됨

* **Reducers**
  - 상태 변경 로직을 처리하는 순수 함수
  - 기존 상태를 복제한 뒤, Action의 요청에 따라 새로운 상태를 생성해 반환
  - 상태가 변경될 때마다 새로운 상태 객체가 생성되므로, 변경 내역 추적이 쉬워짐

### 설치
```sh
npm i redux react-redux
```

### Redux DevTools 설치
* 리덕스 디버깅에 유용한 개발 도구
* Chrome: 크롬 웹스토어에서 `Redux DevTools`로 검색 후 설치
  - <https://chromewebstore.google.com/search/Redux%20DevTools>
* 설치하면 크롬 개발자 도구에 Redux 탭이 생김

### Redux의 단점
- 초기 설정이 복잡할 수 있음.
- 코드량이 많아질 수 있음.
- 작은 애플리케이션에서는 불필요하게 복잡할 수 있음.

### Redux Toolkit
* Redux의 복잡함을 줄이고 사용을 간편하게 하기 위해 제공되는 도구로, 보일러플레이트 코드 감소와 기본 설정 제공
* Redux의 공식 권장 툴킷

### 설치
```sh
npm i @reduxjs/toolkit
```

## Recoil
* 리액트를 만든 페이스북 팀에서 만든 상태 관리 라이브러리

### 설치
```sh
npm i recoil
```

### RecoilRoot
* RecoilRoot 컴포넌트 하위의 컴포넌트가 recoil을 사용할 수 있으므로 주로 루트 컴포넌트를 RecoilRoot로 감싼다.
* App.jsx
  ```jsx
  import { RecoilRoot } from 'recoil';

  function App() {
    return (
      <RecoilRoot>
        <MyRootComponent />
      </RecoilRoot>
    );
  }
  ```

### atom
* atom은 상태를 정의하는데 사용
* Recoil은 여러 종류의 상태를 관리할 수 있는데 atom은 상태의 일부를 나타냄(로그인 상태, 다크모드 여부 상태 등 상태값 하나)
* atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독하게 됨
* atom이 바뀌면(상태가 바뀌면) 그 atom을 구독하는 모든 컴포넌트가 리렌더링 됨

#### atom을 정의하는 방법
* atom 함수 사용
* atoms.js
  ```js
  import { atom } from "recoil";
  export const countState = atom({
    key: 'count', // atom 식별자. 모든 atom에서 고유해야 함
    default: 10 // 상태 초기값
  });
  ```

#### atom에서 읽기(getter)
* atom에서 읽기 작업을 하는 컴포넌트는 자동으로 atom을 구독하게 되고 구독중인 atom에 변경이 발생하면 리렌더링 됨
* 읽기 작업만 필요할 때는 useRecoilValue 훅 사용
* Left3.jsx
  ```jsx
  import { countState } from '@recoil/atoms.js';
  import { useRecoilValue } from 'recoil';

  function Left3() {
    const count = useRecoilValue(countState);
    return (
      <div>
        <h3>Left3</h3>
        <span>{ count }</span>
      </div>
    );
  }

  export default Left3;
  ```

#### atom을 변경(setter)
* 변경 작업만 필요할 때는 useSetRecoilState 훅 사용
* Right3.jsx
  ```jsx
  import { countState } from '@recoil/atoms.js';
  import { useSetRecoilState } from 'recoil';

  function Right3() {
    const setCount = useSetRecoilState(countState);

    const countUp = function(step){
      setCount((count) => count + step);
    };

    return (
      <div>
        <h3>Right3</h3>
        <button onClick={ () => countUp(1) }>+1</button>
      </div>
    );
  }

  export default Right3;
  ```

#### atom을 읽고 쓰기
* 읽고 쓰는 작업이 다 필요하면 useRecoilState 훅 사용
* Right3.jsx
  ```jsx
  import { countState } from '@recoil/atoms.mjs';
  import { useRecoilState } from 'recoil';

  function Right3() {
    const [count, setCount] = useRecoilState(countState);
    const countUp = function(step){
      setCount(count + step);
    };

    return (
      <div>
        <h1>Right3 : { count }</h1>
        <button onClick={ () => countUp(1) }>+</button>
      </div>
    );
  }

  export default Right3;
  ```

### selector
* atom이나 다른 selector를 통해서 읽은 상태값을 기반으로 가공된 값을 반환
* 컴포넌트가 atom을 읽을 경우는 현재 상태값 그대로 읽게 되지만 selector를 통해서 읽을 경우에는 현재 상태값을 기반으로 파생된 다른 값으로 사용 가능
* selector는 atom 값이 변하지 않으면 언제나 같은 값을 반환하는 순수 함수로 만들어야 함

#### selector를 정의하는 방법
* selector 함수 사용
* selectors.js
  ```js
  import { countState } from "@recoil/atoms.js";
  import { selector } from "recoil";

  export const countStateKor = selector({
    key: 'korCount',
    get: ({ get }) => {
      const count = get(countState); // atom 값 추출
      return numberToKorean(count); // 추출한 atom 값을 기반으로 파생된 값을 반환
    }
  });

  function numberToKorean(number) {
    // 아라비아 숫자 number를 한국식으로 변경
    ......
  }
  ```

#### selector에서 읽기(getter)
* selector에서 읽기 작업을 하는 컴포넌트는 자동으로 selector가 사용하는 atom을 구독하게 되고 구독중인 atom에 변경이 발생하면 리렌더링 됨
* selector는 주로 읽기 전용으로 사용되며 useRecoilValue 훅 사용
* Left3.jsx
  ```jsx
  import { countStateKor } from '@recoil/selectors.js';
  import { useRecoilValue } from 'recoil';

  function Left3() {
    const korCount = useRecoilValue(countStateKor);
    return (
      <div>
        <h1>Left3 : { korCount }</h1>
      </div>
    );
  }

  export default Left3;
  ```

##### Recoil 참고: <https://recoiljs.org/ko>

## Zustand  
* Zustand는 독일어로 "상태"를 의미하며, React를 위한 간단하고 가벼운 상태 관리 라이브러리
* Context API나 Provider 없이 훅 기반 API를 통해 상태를 간편하게 관리 가능
* 직관적인 설계와 빠른 성능으로 소규모 애플리케이션이나 특정 상태 관리에 적합
* Flux 패턴이나 복잡한 설정 없이 사용 가능하며, 서버 상태와 클라이언트 상태를 함께 다룰 때 유용

### 설치
```sh
npm i zustand
```

### Store
* 상태와 상태를 관리하는 함수로 구성되며 커스텀 훅으로 작성
* Zustand.create 함수로 생성하고 create 함수에 인자로 전달하는 함수에서 상태 정의와 상태관리 로직을 구현한 함수를 객체로 반환
* create에 인자로 전달하는 함수의 매개변수
  - set
    + set(newState): 상태를 newState로 업데이트
    + set(state => newState): 이전 상태를 인자로 받고 newState를 반환하면 반환된 상태로 업데이트 됨
  - get: 이전 상태를 반환하는 함수

#### 사용 예시
* counter.js
  ```js
  import { create } from "zustand";

  const useCounterStore = create((set, get) => ({
    count: 10,
    countDown: (step) => set({ count: get().count - step }),
    countUp: (step) => set((state) => ({ count: state.count + step })),
  }));

  export default useCounterStore;
  ```

### Store 사용
* 커스텀 훅 사용과 동일하게 사용
* Store를 사용하는 컴포넌트는 자동으로 Store를 구독하게 되며 Store의 상태가 변경되면 리렌더링 됨

* Right3.jsx
  ```jsx
  import useCounterStore from '@zustand/counter.js';

  function Right3() {
    const countUp = useCounterStore(state => state.countUp);

    return (
      <div>
        <h1>Right3</h1>
        <button onClick={ () => countUp(1) }>+</button>
      </div>
    );
  }

  export default Right3;
  ```

##### Zustand 참고: <https://docs.pmnd.rs/zustand>

