# 4장 클래스 컴포넌트와 컴포넌트의 라이프 사이클
* 코드 실행(GitHub Page): <https://uzoolove.github.io/febc11-react/workspace-ins/index.html#04>

## 컴포넌트 생명 주기

<img src="https://raw.githubusercontent.com/uzoolove/febc11-react/main/images/lifecycle.png">

### 1 mounting
* 컴포넌트가 처음으로 DOM에 추가되고 렌더링 되는 단계
* 상태(state)와 속성(props)이 초기화 됨

#### 1-1 constructor()
* 컴포넌트 생성시 호출
* super(props)를 호출하지 않으면 this를 사용하지 못하므로 this.state, this.props 사용 불가
* 상태를 초기화하는 코드 작성
* 상태를 초기화할 필요가 없으면 생성자를 작성할 필요 없음
  ```js
  constructor(props){
    super(props);
    this.state = { count: props.level };
  }
  ```

#### 1-2 static getDerivedStateFromProps(props, state)
* 부모 컴포넌트로부터 전달받은 props를 기반으로 상태를 없데이트 하고 싶을 때 사용
* props나 state 값에 의해서 업데이트되는 새로운 state를 리턴하도록 작성
* 일반적으로 props가 state에 영향을 주는 경우가 많지 않기 때문에 사용할 일은 거의 없음

#### 1-3 render()
* 주로 JSX를 이용해서 UI를 리턴하도록 작성함

#### 1-4 componentDidMount() (함수형 컴포넌트에서는 useEffect로 사용 가능)
* 컴포넌트 마운트가 완료되고 브라우저 DOM 트리에 반영된 후 호출됨
  - 컴포넌트가 화면에 보이기 직전에 호출

### 2 updating
* 마운트 된 컴포넌트의 상태(state)나 속성(props)이 변경되어 리렌더링 되는 단계

#### 2-1 static getDerivedStateFromProps(props, state)
* 1-2와 동일

#### 2-2 shouldComponentUpdate(nextProps, nextState)
* 렌더링을 계속할지 말지 여부를 결정
* true를 리턴하면 이어서 render 가 호출되고, false를 리턴하면 render를 호출하지 않음
* 인자로 전달되는 nextProps, nextState와 이전값 this.props, this.state를 비교해서 렌더링 여부를 결정할 수 있음
* Component 대신 PureComponent를 상속 받을 경우 이 메서드가 이전과 현재의 props, state를 얕은 비교를 통해 바뀌지 않았다면 렌더링 하지 않도록 이미 구현되어 있음

#### 2-3 render()
* 1-3과 동일

#### 2-4 getSnapshotBeforeUpdate(prevProps, prevState)
* render() 메서드가 호출되어 가상 DOM으로 쓰기 완료되고 브라우저 DOM에 업데이트 되기 전에 호출
* 이 메서드의 리턴값이 2.5 componentDidUpdate()의 세번째 인자로 전달됨

#### 2-5 componentDidUpdate(prevProps, prevState, snapshot) (함수형 컴포넌트에서는 useEffect로 사용 가능)
* 브라우저 DOM 업데이트 완료 후
* 현재 속성 this.props, this.state와 이전 값 prevProps, prevState가 다르다면 외부 API 호출 등의 작업 수행
* 2-4 에서 리턴한 값이 세번째 인자 snapshot으로 전달되므로 보통 2-4와 같이 사용됨

### 3 unmounting
* 컴포넌트가 DOM에서 제거되는 단계

#### 3-1 componentWillUnmount() (함수형 컴포넌트에서는 useEffect로 사용 가능)
* 컴포넌트가 애플리케이션의 컴포넌트 트리에서 삭제되기 직전에 실행
* 주로 1-4 componentDidMount()와 짝으로 사용
  - 웹소켓을 사용할 경우 1-4에서 연결하고 3-1에서 연결 해제
  - setTimeout()을 해제하기 위해 clearTimeout() 호출

## 라이프 사이클 메소드가 두번씩 호출되는 이유
* Vite로 프로젝트 생성 시 만들어지는 main.jsx의 <StrictMode>에 의해서 strict 모드로 동작하며 개발 모드에서만 동작
* 라이프사이클 메소드 내에서 발생할 수 있는 상태 관련 버그를 체크 할 수 있도록 의도적으로 strict 모드에서 두번씩 렌더링함
  - 순수 함수 여부 확인을 위해 컴포넌트를 추가 렌더링
  - 클린업 누락 여부를 체크하기 위해 Effect 추가 실행
  - 더이상 사용되지 않는 API를 사용할 경우 경고 표시
* 리액트의 모든 컴포넌트는 순수 함수임을 가정하기 때문에 동일한 입력에 대해(props, state, context) 동일한 출력(JSX)을 반환해야 함

* <https://ko.react.dev/reference/react/StrictMode>
