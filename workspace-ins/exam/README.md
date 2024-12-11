1. 다음중 SPA(Single Page Application)의 특징이 아닌 것은 무엇인가요? 4
    1. 하나의 HTML 페이지에서 애플리케이션의 모든 화면과 기능 제공
    2. 모든 기능을 한 페이지에서 다 구현하다 보니 상태(데이터) 관리가 어려움
    3. React, Angular, Vue.js 같은 대표적인 라이브러리/프레임워크에서 SPA 개발을 지원
    4. 브라우저의 DOM을 자주 갱신해도 성능 저하가 발생하지 않음
    - https://uzoolove.github.io/febc11-react/workspace-ins/ch02-start/#react%EC%9D%98-%ED%8A%B9%EC%A7%95
  
2. 다음중 리액트의 특징이 아닌 것은 무엇인가요? 2
    1) 화면의 일부 UI를 만드는 컴포넌트 단위로 개발
    2) State <-> View 양방향 데이터 바인딩
    3) 각각의 컴포넌트 내부에서 상태 관리 기능 제공
    4) 상태가 변경되면 뷰(UI, HTML)를 자동으로 렌더링
    - https://uzoolove.github.io/febc11-react/workspace-ins/ch02-start/#react%EC%9D%98-%ED%8A%B9%EC%A7%95


3. Vite로 리액트 개발환경을 구축했을 때 package.json 파일의 scripts 명령어와 그 의미가 올바르게 설명된 것은 무엇인가요? 1
    1) npm run dev - 개발 서버 구동
    2) npm preview - dist 폴더내의 파일을 대상으로 웹서버 구동
    3) npx run build - dist 폴더에 배포
    4) npm init build - init 폴더에 배포
    - https://uzoolove.github.io/febc11-react/workspace-ins/ch02-start/#vite

4. 리액트 프로젝트를 빌드할 때 일어나는 작업이 아닌 것은 무엇인가요? 1
    1) 오류가 발생한 소스코드를 자동으로 수정
    2) JSX 문법을 Javascript 코드로 변환
    3) 압축: 주석 제거, 변수명 축약, 화이트 스페이스 제거
    4) 번들링: 여러 자바스크립트 파일을 하나 또는 몇개의 파일로 묶는 작업 (Webpack, Rollup, Parcel, Esbuild 등)
    - https://uzoolove.github.io/febc11-react/workspace-ins/ch02-start/#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B9%8C%EB%93%9C

5. 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 때 사용하는 리액트의 개념은 무엇인가요? 4
    1) Callback
    2) Ref
    3) State
    4) Props
    - https://uzoolove.github.io/febc11-react/workspace-ins/ch02-start/#2-5-%EC%86%8D%EC%84%B1-props

6. 리액트 컴포넌트의 상태를 관리하기 위해 사용하는 훅은 무엇인가요? 1
    1) useState
    2) useRef
    3) useCallback
    4) initialState
    - https://uzoolove.github.io/febc11-react/workspace-ins/ch02-start/#2-6-%EC%83%81%ED%83%9C-state

7. 배열의 불변성을 위해 가능한 사용하지 말아야 할 메서드는 무엇인가요? 3
    1) filter
    2) map
    3) splice
    4) concat
    - https://uzoolove.github.io/febc11-react/workspace-ins/ch02-start/#%EC%83%81%ED%83%9C%EC%9D%98-%EB%B6%88%EB%B3%80%EC%84%B1-immutability

8. 컴포넌트가 업데이트(리렌더링) 될 때마다 로그를 출력하고 싶어서 useEffect 훅에 console.log('리렌더링')를 작성했는데 이때 dependencies 값으로 알맞은 것은 무엇인가요? 3
    1) []
    2) [log]
    3) 생략한다.
    4) [console]
    - https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch03-hooks#%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98-1

9. 다음 중 리액트 라우터가 제공하는 유형의 라우터가 아닌 것은 무엇인가요? 4
    1) MemoryRouter
    2) HashRouter
    3) BrowserRouter
    4) ReactRouter
    - https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch05-router#%EC%A0%9C%EA%B3%B5%EB%90%98%EB%8A%94-%EB%9D%BC%EC%9A%B0%ED%84%B0

10. RESTFul 방식의 API 서버를 호출하는 axios 라이브러리의 사용 사례 중 적절하지 않은 것은 무엇인가요? (메세지 body는 생략함) 3
    1) 목록 조회: axios.get('/list')
    2) 삭제: axios.delete('/list/3');
    3) 수정: axios.update('/list/3');
    4) 등록: axios('/list', { method: 'post' });
    - https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch09-ajax#http-%EB%A9%94%EC%86%8C%EB%93%9C%EB%B3%84%EB%A1%9C-%EC%A0%9C%EA%B3%B5%EB%90%98%EB%8A%94-%ED%95%A8%EC%88%98

11. 주관식
    * 하단에 제공되는 로그인 페이지를 완성해서 샘플 앱과 동일하게 동작하는 리액트 앱을 만들고 App.jsx 파일의 코드를 제출하세요.(App.jsx 파일 하나로 구현합니다.)

    * === 완성할 프로젝트 ===
      - 링크: https://stackblitz.com/edit/febc11-03?file=src%2FApp.jsx

    * === 구현할 기능 ===
      - 로그인 성공시: 하단의 로그인 가능한 계정으로 로그인을 성공하면 API 서버로 부터 사용자 정보가 반환되고 그중에서 name 속성값을 이용해 사용자 이름과 환영 메세지를 alert 함수로 출력합니다.
      - 로그인 실패시: API 서버로부터 에러 정보가 반환되고 message 값을 alert 함수로 출력합니다.

      - API 서버 URL: https://11.fesp.shop/users/login
      - 서버에 보낼 헤더: {'client-id': '00-nike'}
      - method: post
      - 바디로 전송할 데이터: email, password

      - 로그인 가능한 계정 1: u1@gmail.com / 11111111
      - 로그인 가능한 계정 2: s1@gmail.com / 11111111
      - postman으로 먼저 테스트 해보세요.

    * === 샘플 앱 ===
      - 링크: https://todo.fesp.shop/login.html
      - 샘플 앱으로 접속하면 테스트 할 수 있습니다.
      - 샘플 앱은 jQuery를 이용해서 로그인 기능을 구현한 앱 입니다.

    * === 배점(60점 만점) ===
      - email, password 입력 양식 작성(10점)
      - 이벤트 등록(10점)
      - API 서버 호출(10점)
      - API 서버 호출시 헤더, 바디 전달(10점)
      - API 서버의 응답 메세지 처리(10점)
      - 기타(10점)