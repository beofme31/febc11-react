# 6장 Context API
* 코드 실행(GitHub Page): <https://uzoolove.github.io/febc11-react/workspace-ins/index.html#06>

## Context API란?
* 컴포넌트 트리에서 부모 컴포넌트의 상태나 데이터를 자식 컴포넌트에 전달할 때 보통 props를 사용하지만, 컴포넌트 트리가 깊어질수록 불편해짐.
  - 트리가 깊어지면 상위 컴포넌트의 데이터를 하위 컴포넌트로 전달하기 위해 많은 중간 컴포넌트를 거쳐야 하므로 코드가 복잡해짐.
  - prop 이름이 변경되거나 새로운 props가 추가되면 모든 중간 컴포넌트를 수정해야 하는 번거로움이 있음.
  - 데이터 변경 시 중간 컴포넌트들이 불필요하게 리렌더링되는 문제가 발생.
* 동일한 데이터를 여러 자식 컴포넌트에 전달할 경우 번거롭고 불편해짐.
* Context API는 컴포넌트 트리에서 데이터를 효율적으로 전달하기 위해 리엑트에서 기본으로 제공하는 API
* Context API를 사용하면 매번 자식 컴포넌트에 prop을 전달하지 않고, 필요한 데이터를 직접 전달할 수 있어 불필요한 리렌더링과 코드 복잡성을 줄일 수 있음.
* Context API를 이용해서 하위 컴포넌트에 상태와 이를 수정하는 함수를 전달하면 간단한 상태 관리 도구로 사용할 수 있지만 Context API 자체적으로 상태를 관리하거나 복잡한 상태 변경 로직을 처리할 수 있는 기능은 없으므로 복잡한 상태관리가 필요하다면 글로벌 상태관리 라이브러리를 사용하는게 편함

### 상태 끌어올리기
* 여러 컴포넌트가 상태를 공유해야 한다면 공통의 부모 컴포넌트에서 상태를 관리해야 함.

<img src="https://raw.githubusercontent.com/uzoolove/febc11-react/main/images/context-lifting.webp">
[그림 1. 상태 끌어올리기]

<img src="https://raw.githubusercontent.com/uzoolove/febc11-react/main/images/context-lifting2.webp">
[그림 2. Context API]

### prop drilling
<img src="https://raw.githubusercontent.com/uzoolove/febc11-react/main/images/context-propdrilling.webp">
[그림 3. props]

<img src="https://raw.githubusercontent.com/uzoolove/febc11-react/main/images/context-propdrilling2.webp">
[그림 4. Context API]

## 사용 방법
### Context 객체 생성
* React.createContext() 함수로 생성

### Provider 컴포넌트 작성
* 상태와 상태 변경 함수를 관리할 컴포넌트 작성
* Context 객체가 제공하는 Provider 컴포넌트를 사용해서 자식 컴포넌트를 렌더링하고 이때 Provider의 value 속성으로 전달할 Context를 지정
  ```jsx
  import { createContext, useState } from "react";

  // Context 객체 생성
  const CounterContext = createContext();

  // Provider 컴포넌트 작성
  export function CounterProvider({ children }){
    // 상태
    const [count, setCount] = useState(10);
    
    // 상태 변경 함수
    const countUp = function(step){
      setCount(count + step);
    };

    // 하위 컴포넌트에 전달할 Context
    const values = {
      state: { count },
      actions: { countUp }
    };

    return (
      <CounterContext.Provider value={ values }>
        { children }
      </CounterContext.Provider>
    );
  }

  export default CounterContext;
  ```

### 자식 컴포넌트에 Context 제공
```jsx
import { CounterProvider } from '@context/CounterContext';
```
```jsx
<CounterProvider>
  <Left1 />
  <Right1 />
</CounterProvider>
```

### 자식 컴포넌트에서 Context 사용
* React.useContext 훅을 이용해 Context를 꺼내서 사용
  ```jsx
  import CounterContext from '@context/CounterContext';
  import { useContext } from 'react';
  ```

  ```jsx
  const { state: { count } } = useContext(CounterContext);
  ```

## Context 남용 주의
* props 전달
  - props를 사용하면 어떤 컴포넌트가 어떤 데이터를 사용하는지 쉽게 파악이 가능해서 데이터 흐름을 명확히 파악할 수 있음
* Context 사용
  - 데이터 흐름 파악이 힘듬

## Context API 사용 사례
* 테마 지정
  - 다크 모드, 라이트 모드 등의 테마를 사용자가 수정할수 있게 제공할 경우 컴포넌트 트리 상단에서 Context를 제공하고 선택한 테마를 하위 컴포넌트에서 사용
* 로그인 상태 관리
  - 사용자의 로그인 상태(로그인/비로그인) 여부를 Context로 제공하고 하위 컴포넌트에서 사용
* 전역 상태 관리
  - 여러 컴포넌트가 공통으로 관리해야 하는 상태를 Context로 제공하고 하위 컴포넌트에서 상태를 수정하면 필요한 모든 컴포넌트에서 수정된 상태를 사용해서 리렌더링

## Context API의 단점
* useContext()를 사용하는 컴포넌트는 재활용이 어려울 수 있음
  - Context를 제공하는 Provider에 의존하게 되므로 Provider를 벗어난 곳에서는 사용할 수 없음.
* 하나의 Context에는 하나의 상태만 저장할 수 있다.
  - 여러 상태를 관리하기 위해서 객체를 상태로 지정할 수 있지만 객체의 속성 하나만 변경되어도 구독하는 모든 컴포넌트가 리렌더링 됨
  - Context를 여러개 만들어서 각각의 Context에 상태를 분리할 수는 있지만 상태가 복잡하고 규모가 큰 경우에 Context가 중첩되면 관리가 어려워짐
* 전역 상태 관리를 위한 간단한 도구
  - 복잡한 대규모 상태 관리에 적합하지 않음