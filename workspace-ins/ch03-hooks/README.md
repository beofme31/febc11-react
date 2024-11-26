# 3장 리액트 훅
- 코드 실행(GitHub Page): <https://uzoolove.github.io/febc11-react/workspace-ins/index.html#03>

## 리액트 훅이란?

- 컴포넌트가 렌더링되는 동안에만 사용할 수 있는 특별한 함수
- React 16.8 버전에 추가됨
- 훅을 사용하면 클래스 컴포넌트에서만 가능했던 상태 관리와 생명 주기 이벤트를 함수형 컴포넌트에서도 사용할 수 있게 됨  
- 이로 인해 함수형 컴포넌트의 활용도가 높아졌으며, 클래스 컴포넌트보다 코드가 간결하고 유지보수가 용이해 함수형 컴포넌트 사용이 일반화됨

## useState
- 상태값(컴포넌트에서 관리하는 데이터)을 추가하기 위한 훅

### API
```jsx
const [state, setState] = useState(initialState);
```

#### 매개변수
- `initialState`: 상태값의 초기값(초기 렌더링 후 무시됨)

#### 리턴값
- `state`: 저장된 상태값
- `setState`: 상태값을 변경하는 setter 함수
  - setter를 통해 상태가 변경되면 해당 컴포넌트는 다시 렌더링됨

## useEffect
- 컴포넌트 생명주기 이벤트를 등록하기 위한 훅
- 클래스 기반 컴포넌트에서는 아래 메소드를 오버라이드해서 구현
  - `componentDidMount()`: 컴포넌트 마운트 완료되고 브라우저 DOM 트리에 반영된 후 호출
  - `componentDidUpdate()`: 브라우저 DOM 업데이트 완료 후 호출
  - `componentWillUnmount()`: 컴포넌트가 삭제되기 직전에 호출
  - ...

### API
```jsx
useEffect(setup, dependencies?);
```

#### 매개변수
- `setup`: 컴포넌트가 마운트(1-4), 업데이트(2-5), 제거(3-1) 될 때 호출되는 함수
  - `setup`이 함수를 리턴하면, 리턴한 함수를 `cleanup`이라고 부르며, 컴포넌트가 업데이트되거나 언마운트 될 때 호출됨 (cleanup이 먼저 실행되고 setup이 뒤에 실행됨)
  
- `dependencies` (선택): 의존 객체 배열
  - 컴포넌트가 업데이트 될 때 `setup` 함수를 호출할지 말지 여부를 결정하는데 사용
  - 컴포넌트가 마운트 될 때는 `dependencies` 여부와 상관 없이 `setup`이 호출됨
  - `dependencies`를 생략하면, 컴포넌트가 업데이트될 때 항상 `setup`이 호출됨
  - `dependencies`에 빈 배열을 지정하면 업데이트에서는 호출되지 않음
  - `dependencies`를 지정하면, 해당 값들이 변경될 때만 `setup` 함수가 호출됨  

## useReducer

- `useState`와 비슷하지만, 상태 관리가 더 복잡한 경우에 사용
- `useState`를 사용할 때 컴포넌트 내부에서 상태 변경 로직을 구현해야 하기 때문에 컴포넌트가 복잡해짐
- 컴포넌트 외부에서 상태 관리를 하고 싶을 때 유용
- 여러 컴포넌트가 유사한 상태 관련 로직을 사용할 경우 기능을 공유할 수 있음
- `state` 값은 불변성이 있어 상태 변경의 내역을 추적할 수 있음
- 리듀서는 순수 함수로 만들어야 함
  - 입력 값이 동일하면 출력 값도 동일
  - 외부 값에 영향을 주거나 받으면 안 됨
- 리듀서를 사용하여 어플리케이션 전역 수준의 상태를 관리하는 라이브러리가 `Redux`

### API
```jsx
function reducer(state, action){ ... }
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

#### 매개변수
- `reducer`: `state`와 `action`을 인자로 받아 새로운 `state`를 반환하는 함수  
  - `state`: 리듀서에 전달되는 상태값  
  - `action`: `dispatch`에 전달한 인자값으로, 수행할 작업의 종류와 필요한 인자값을 포함한 객체
- `initialArg`: 초기 상태로 지정할 값
- `init`(선택): `initialArg`를 인자로 받고, 리턴한 값이 초기 상태로 지정되는 함수

#### 리턴값
- `state`: 상태값이 저장된 getter
- `dispatch`: 상태값을 변경하는 setter 함수. `dispatch`에 전달한 인자값이 `reducer`의 두번째 인자값(`action`)으로 전달됨

### 상태 관리: useState vs. useReducer

#### 코드 크기
- `useReducer`를 사용하면 `reducer` 함수와 `dispatch` 액션을 작성해야 하기 때문에 기본적으로 코드 크기가 `useState`를 사용할 때보다 많아짐
  ```jsx
  const TodoReducer = function(state, action) {
    // 상태 변경 로직
  };
  itemListDispatch({ type: 'TOGGLE', item: { _id }});
  ```

* 여러 이벤트 핸들러가 비슷한 상태 관리 로직을 가지고 있다면 `reducer` 함수에 공통으로 작성해서 코드를 줄일 수 있음
  ```jsx
  const TodoReducer = function(state, action){
    const index = state.findIndex(item => item._id === action.item._id);
    switch(action.type){
      case 'TOGGLE':
        return produce(state, draft => {
          draft[index].done = !draft[index].done;
        });
      default:
      case 'DELETE':
        return produce(state, draft => {
          draft.splice(index, 1);
        });
    }
  };
  ```

#### 가독성
- 상태 변경 로직이 복잡하고 여러 이벤트 핸들러에서 비슷한 로직을 사용해야 한다면, `useState`로 상태를 직접 관리하기보다는 `useReducer`에 상태 변경 로직을 집중시키고 컴포넌트와 분리하면 컴포넌트를 단순화할 수 있음

#### 디버깅
- `useState`는 상태 변경 도중 오류가 발생하면 여러 이벤트 핸들러를 확인해야 하지만, `useReducer`는 상태 변경 로직이 한 곳에 있기 때문에 디버깅이 편함

#### 테스트
- `reducer` 함수는 컴포넌트와 독립적인 순수 함수이기 때문에 따로 테스트가 가능함

#### 개인 선호도에 따름

## useRef

- 컴포넌트가 다시 렌더링되더라도 기존 상태값을 유지하는 변수를 생성
- 함수 내부에 정의하는 지역 변수는 컴포넌트가 다시 렌더링되면(함수 재호출) 값이 초기화 됨
- `useState`는 값이 변경되면 컴포넌트가 다시 렌더링되지만 `useRef`는 값이 변경되어도 컴포넌트가 다시 렌더링되지 않음
- 태그에 `ref` 속성을 추가하면 브라우저 DOM 엘리먼트에 직접 접근 가능
  - 포커스, 미디어 재생, 애니메이션 실행 등과 같은 작업은 `useRef`를 사용해 브라우저 DOM에 직접 접근하여 제어해야 함

### API
```jsx
const ref = useRef(initialValue);
```

#### 매개변수
* `initialValue`: 초기값

#### 리턴값
* `current`라는 상태값 또는 DOM 요소가 있는 속성 하나가 정의된 객체

### input 요소의 값 지정: useState vs. useRef
#### useState 사용
* value 속성으로 상태값 지정
* 리액트에서 직접 상태관리를 하는 제어 컴포넌트를 구현
* input 값이 변경되는 즉시 리렌더링 되어야 할때
  - 리렌더링이 자주 되므로 오버헤드 발생

##### 예시
```jsx
function App(){
  const [msg, setMsg] = useState('');
  return (
    <>
      <h1>01 useState - 상태 관리</h1>
      <div>
        <input type="text" value={ msg } onChange={ e => setMsg(e.target.value) } />
        <br/>
        <span>입력 메세지: { msg }</span>
      </div>
    </>
  );
}
```

#### useRef 사용
* defaultValue 속성으로 초기값 지정
* 브라우저에서 입력값을 관리하는 비제어 컴포넌트를 구현
* input 값이 변경 되어도 리렌더링 될 필요가 없을때
  - 리렌더링이 되지 않으므로 성능 최적화

##### 예시
```jsx
function Counter() {
  const step = useRef(1);

  return (
    <div id="counter">
      <input type="number" defaultValue={ step.current } onChange={ e => step.current = Number(e.target.value) } />
      <Button color="red">-</Button>
      <Button>0</Button>
      <Button color="blue">+</Button>
      <span>0</span>
    </div>
  );
}
```

## useMemo
- 지정한 함수를 호출하여 반환받은 결과값을 내부에 저장(캐싱)하는 함수

### API
```jsx
const calculateValue = function(){ ... };
const cachedValue = useMemo(calculateValue, dependencies);
```

#### 매개변수
- `calculateValue`: 캐싱할 값을 계산하여 반환하는 순수 함수
- `dependencies`: 의존 객체 배열
  - 계산 결과에 영향을 주는 `calculateValue` 함수의 인자값
  - 이 배열의 값이 하나라도 변경되면 `calculateValue` 함수를 다시 호출하고, 변경되지 않으면 캐시된 값을 반환
  - 빈 배열을 지정하면 의존성이 없으므로 매번 캐시된 값을 반환

#### 리턴값
- `calculateValue` 함수를 호출한 결과값
- 다음 렌더링 중에는 `dependencies`가 변경되지 않으면 캐시된 결과를, 변경되었으면 `calculateValue` 함수를 다시 호출한 결과값

### React.memo

- 컴포넌트를 memoize한 후 리렌더링 될 때 props가 변경되지 않으면 memoize된 컴포넌트를 반환
- 컴포넌트가 리렌더링될 때 props가 변경되지 않으면 최종적으로 브라우저 DOM에 쓰기 작업이 이루어지지 않지만, 가상 DOM 생성과 비교 작업에도 리소스가 사용되므로, memoize된 컴포넌트는 성능 향상에 도움을 줄 수 있음
- 리렌더링 될때 눈에띄게 지연이 발생하는 경우 사용

#### API
```jsx
const MemoizedComponent = React.memo(SomeComponent, arePropsEqual?)
```

##### 매개변수
- `SomeComponent`: memoize할 대상 컴포넌트
- `arePropsEqual`(선택): memoize된 컴포넌트를 반환할지, 컴포넌트를 다시 호출할지를 결정하는 함수
  - 컴포넌트의 이전 props 및 새로운 props를 인자로 받는 함수
  - `true`를 반환하면 memoize된 컴포넌트를 사용하고, `false`를 반환하면 컴포넌트를 다시 호출한 결과값을 사용
  - 생략 시 이전 props와 새로운 props를 얕게 비교하여 같으면 `true`, 다르면 `false`를 반환하는 기본 동작

##### 리턴값
- memoize된 `SomeComponent`

### React.memo 사용 시점

- 컴포넌트 호출 시 시간이 오래 걸리는 연산 작업이 있는 경우  
  - memoize된 컴포넌트를 재사용하면 컴포넌트 호출 횟수를 줄일 수 있음
- 리렌더링될 때 props가 자주 변경되지 않는 컴포넌트
  - props가 자주 변경되는 컴포넌트에는 props를 비교하는 로직이 불필요하게 동작하므로, 오히려 성능에 좋지 않음

---

### 고차 함수 (Higher-Order Function)

#### 정의  
-  함수를 인자로 전달받거나 함수를 반환하는 함수.

#### 예시  
- `Array.prototype.forEach`, `Array.prototype.map`, `Array.prototype.findIndex`, `Array.prototype.filter` 등.  

- 리액트에서의 활용  
  - 컴포넌트(함수)를 인자로 받아 공통 로직을 추가한 새로운 컴포넌트를 반환.
  - 중복되는 로직을 고차 함수에 정의하여 컴포넌트별로 재사용 가능.
  - `React.memo`가 대표적인 고차 함수.

## useCallback

- 컴포넌트 내부에서 정의한 함수를 캐시
- 컴포넌트가 다시 렌더링되더라도 함수가 다시 생성되지 않고 캐시된 함수를 사용
- 부모가 정의한 이벤트 리스너를 자식에게 props로 전달할 때, 부모가 리렌더링되는 경우 자식도 리렌더링되지만, 이때 props가 바뀌지 않으면 자식은 기존 DOM을 재사용하도록 메모이제이션할 수 있음
  - 이벤트 리스너를 컴포넌트 내부에서 정의하면 부모가 리렌더링될 때 리스너 함수도 새로 생성되므로 자식에 전달하는 props가 바뀌어 메모이제이션이 되지 않고 자식도 리렌더링이 발생
  - `useCallback()`을 사용하면 부모 컴포넌트가 재호출되어도 리스너가 수정되지 않고 유지되므로 자식도 기존 DOM을 재사용하여 성능이 향상됨

### API
```jsx
const cachedFn = useCallback(fn, dependencies);
```

#### 매개변수
- `fn`: 캐싱할 함수
- `dependencies`: 의존 객체 배열
  - 캐싱된 함수에서 컴포넌트의 변수를 사용할 경우 함수 생성 당시의 값을 참조하고 있기 때문에 이 값이 바뀌면 함수도 다시 생성해야 함. 이 값을 의존성으로 지정하면 의존성이 바뀔 때마다 새로운 함수를 생성하여 반환
  - 빈 배열을 지정하면 의존성이 없으므로 매번 캐시된 함수를 반환

#### 리턴값
- 최초에는 `fn` 함수를 반환하고, 다음 렌더링부터는 `dependencies`가 변하지 않았다면 이전에 반환한 캐시된 함수를, `dependencies`가 변했다면 새로 생성된 `fn` 함수를 반환

### useMemo vs. React.memo vs. useCallback
* `useMemo`는 함수를 인자로 전달하고, 전달된 함수의 실행 결과(리턴값)를 memoize 함
* `React.memo`는 컴포넌트를 인자로 전달하고, 전달된 컴포넌트를 memoize 함
* `useCallback`은 함수를 인자로 전달하고, 전달된 함수를 memoize 함
* 차이점: 함수의 리턴 값 vs. 컴포넌트 vs. 함수 자체

## Custom Hook
* 개발자가 직접 작성하는 리액트 훅으로, 리액트의 내장 훅(`useState`, `useEffect` 등)을 이용해 특정 로직을 재사용 가능하게 만든 함수
* 여러 컴포넌트에서 공통으로 사용할 수 있는 상태 관리나 사이드 이펙트 로직을 하나의 훅으로 묶을 수 있음
* 리액트의 내장 훅은 일반 함수에서는 사용할 수 없으므로, 내장 훅을 활용하려면 커스텀 훅을 작성해야 함
* 커스텀 훅의 이름은 리액트 훅임을 명시적으로 나타내기 위해 `useXXX` 형태로 작성하는 것이 권장됨
  - 예: `useFetch`, `useLocalStorage` 등

## 훅 사용 시 주의사항
* 클래스 기반 컴포넌트에서는 훅을 사용할 수 없음
  - 훅은 함수형 컴포넌트 전용이며, 상태 관리 및 생명 주기 관련 기능을 함수형 컴포넌트 내에서만 사용할 수 있음
* 훅은 함수 컴포넌트의 최상위에서만 호출해야 함
  - 훅을 반복문, 조건문, 중첩 함수 내에서 호출하면 컴포넌트가 렌더링될 때마다 호출 순서가 달라져서 문제를 일으킬 수 있음
  - 훅의 호출 순서가 바뀌면 리액트는 훅의 상태를 추적할 수 없어서 에러가 발생할 수 있음
* 훅은 항상 동일한 순서로 호출되어야 함
  - 각 렌더링마다 동일한 순서로 훅이 호출되어야 하므로, 조건문이나 반복문 내에서 훅을 호출하는 패턴을 피해야 함

