# 9장 HTTP 통신과 Ajax
* 코드 실행(GitHub Page): <https://uzoolove.github.io/febc11-react/workspace-ins/index.html#09>

## HTTP

### HTTP란?
HTTP(HyperText Transfer Protocol)는 웹 브라우저와 웹 서버 간 텍스트 기반으로 데이터를 송수신하기 위한 프로토콜

#### 주요 특징
- TCP 기반 프로토콜
  - 클라이언트와 서버가 연결을 수립한 후 메시지를 교환
  - 데이터를 패킷 단위로 전송하며, 수신 측에서 데이터를 검증한 뒤 응답을 보냄
  - 데이터 누락 시 재전송 요청을 처리하여 신뢰성이 높음
  - 주로 HTTP, FTP, SMTP 등 신뢰성이 중요한 통신에서 사용됨

#### 동작 방식
1. 클라이언트 요청 (Request)
   - 클라이언트(주로 웹 브라우저)가 HTTP 요청 메시지를 서버로 전송
   - 요청에는 필요한 자원(URL)이나 작업(GET, POST 등 요청 메서드 포함)이 포함됨

2. 서버 응답 (Response)
   - 서버는 요청을 분석하여 필요한 작업을 수행
     - 파일 읽기, 데이터베이스 조회, 외부 시스템 연동 등
   - 작업 결과를 바탕으로 응답 메시지를 생성하여 클라이언트로 전송

3. 웹 브라우저 처리
   - 클라이언트는 서버 응답 데이터를 받아 파싱한 후 화면에 출력
   - 서버의 응답을 받은 후 클라이언트와 서버 간 연결이 해제됨 (HTTP/1.x의 경우 기본적으로 비연결형(Connectionless) 프로토콜)

#### 장점
- 신뢰성: TCP를 기반으로 하여 데이터 전달의 신뢰성이 높음
- 범용성: 전 세계적으로 가장 널리 사용되는 웹 통신 프로토콜

#### 참고
HTTP/2와 HTTP/3는 기존 HTTP/1.x의 비효율성을 개선하기 위해 다중화, 헤더 압축, UDP 기반 전송 등의 기술을 도입

### HTTP의 특징

#### 비연결성(Connectionless)
- 클라이언트가 요청을 보내고 서버가 응답하면 상호 연결을 해제함
- 서버는 클라이언트가 누구인지 신경 쓰지 않고 요청 정보를 분석해 적절한 응답을 만드는 데만 집중함
- 서버 구현이 단순해져 웹 발전에 큰 역할을 함

#### 무상태(Stateless)
- 서버는 클라이언트의 요청 정보만 가지고 응답을 생성하며, 클라이언트의 상태를 기억하지 않음
- 요청한 사용자가 누구인지, 이전에 어떤 작업을 요청했는지를 관리하지 않음
- 웹이 발전하면서 클라이언트 정보를 저장할 필요가 생겼고, 이를 위해 Cookie, Session, Local Storage 등의 저장 방식이 도입됨


### HTTP 주요 메소드

#### GET
- 서버로부터 자원을 가져올 때 사용
  - 할일 목록 조회
  - 할일 상세 조회
  - 회원 정보 조회

#### POST
- 서버로 데이터를 보낼 때 사용
  - 할일 등록
  - 회원 등록

#### PUT
- 서버의 데이터 한 건을 전체 항목 수정 시 사용
  - 특정 할일의 모든 항목 수정
  - 특정 회원의 회원 정보 전체 수정

#### PATCH
- 서버의 데이터 한 건을 일부 항목 수정 시 사용
  - 특정 할일의 완료 여부 수정
  - 특정 회원의 비밀번호 수정

#### DELETE
- 서버의 데이터 한 건을 삭제할 때 사용
  - 할일 삭제
  - 회원 삭제

## API 테스트
### Postman
* https://www.postman.com/downloads 접속 후 다운로드
- 본인의 OS에 맞는 버전 다운로드 후 기본 설정으로 설치

### Todo List API 테스트
#### Workspace 생성
* Workspaces > Create Workspace
  - Blank Workspace > Next
  - Name: `FEBC11` > Create

#### 환경 변수 추가
- Environments > + 버튼(Create new environment) 
- "New Environment" -> `Todo List`로 수정

##### url 추가
- Variable: url
- Type: default
- initial value: `https://todo-api.fesp.shop`
- Ctrl + S 눌러서 저장

#### Collection 추가
* Collections > + 버튼(Create new collection) > Blank collection
  - "New Collection" -> `Todo API`로 수정

#### API Server 환경 변수 지정
* 우측 상단의 "No Environment" 클릭 후 Todo List 선택

#### Todo API Collection에 API 요청 추가(할일 목록 조회)
* Collections > Todo API 컬렉션 위에 마우스 올린 후 ··· 클릭해서 Add request 선택
  - "New Request" -> `할일 목록 조회`로 수정
  - "Enter URL or paste text" 항목에 `{{url}}/todolist` 입력 후 Send
  - 응답 결과 확인

#### 할일 등록
* Collections > Todo API 컬렉션 위에 마우스 올린 후 ··· 클릭해서 Add request 선택
  - `Todo API/할일 등록`
  - "GET" -> `POST`로 수정
  - `{{url}}/todolist`
  - Body > raw > "Text" -> "JSON"으로 변경. 데이터 입력 후 Send
  ```json
  {
    "title": "GD의 TodoList - API 테스트",
    "content": "API 테스트 잘되는지 확인"
  }
  ```

#### 할일 상세 조회
- `Todo API/할일 상세 조회`
- `GET`, `{{url}}/todolist/5`

#### 할일 완료
- `Todo API/할일 완료`
- `PATCH`, `{{url}}/todolist/5`
- Body > raw > "Text" -> "JSON"으로 변경. 데이터 입력 후 Send
```json
{
  "done": true
}
```

#### 할일 내용 수정
- `Todo API/할일 내용 수정`
- `PATCH`, `{{url}}/todolist/5`
- Body > raw > "Text" -> "JSON"으로 변경. 데이터 입력 후 Send
```json
{
  "title": "GD의 TodoList - 수정",
  "content": "API 수정 잘되는지 확인"
}
```

#### 할일 삭제
- `Todo API/할일 삭제`
- `DELETE`, `{{url}}/todolist/5`

### Open Market API 테스트

#### 환경 변수 추가
- Environments > + 버튼(Create new environment) 
- "New Environment" -> `Open Market`으로 수정

##### url 추가
- Variable: url
- Type: default
- initial value: `https://11.fesp.shop`
- Ctrl + S 눌러서 저장

##### client-id 추가
- Variable: client-id
- Type: default
- initial value: `00-nike`
- Ctrl + S 눌러서 저장

#### Collection 추가
* Collections > + 버튼(Create new collection) > Blank collection
  - "New Collection" -> `Open Market API`로 수정

#### API Server 환경 변수 지정
* 우측 상단의 "No Environment" 클릭 후 `Open Market` 선택

#### Open Market API Collection에 API 요청 추가(상품 목록 조회)
* Collections > Open Market API 컬렉션 위에 마우스 올린 후 ··· 클릭해서 Add request 선택
  - "New Request" -> `상품 목록 조회`로 수정
  - "Enter URL or paste text" 항목에 `{{url}}/products` 입력 후 Send
  - 응답 결과 확인
  ```json
  {
    "ok": 0,
    "message": "client-id 헤더가 없습니다."
  }
  ```
* client-id 헤더 추가
  - Headers 탭 선택
    - Key: `client-id`
    - Value: `{{client-id}}`

#### 상품 상세 조회
* Collections > Open Market API 컬렉션 위에 마우스 올린 후 ··· 클릭해서 Add request 선택
  - `Open Market API/상품 상세 조회`
  - `{{url}}/products/4`
  - 응답 결과 확인
  ```json
  {
    "ok": 0,
    "message": "client-id 헤더가 없습니다."
  }
  ```
* 컬렉션내의 모든 요청에 client-id 헤더 추가
  - Collections > Open Market API 선택
  - Scripts > Pre-request 선택 후 추가
  ```js
  pm.request.headers.add({
    key: "client-id",
    value: "{{client-id}}"
  });
  ```
  - Ctrl + S 눌러서 저장

#### 회원 정보 조회
- `Open Market API/회원 정보 조회`
- `GET`, `{{url}}/users/4`

#### 회원 정보 수정
- `Open Market API/회원 정보 수정`
- `PATCH`, `{{url}}/users/4`
- Body > raw > "Text" -> "JSON"으로 변경. 데이터 입력 후 Send
```json
{
  "name": "제이미"
}
```
- 응답 결과 확인
```json
{
    "ok": 0,
    "message": "authorization 헤더가 없습니다.",
    "errorName": "EmptyAuthorization"
}
```

#### 로그인
- `Open Market API/로그인`
- `POST`, `{{url}}/users/login`
- Body > raw > "Text" -> "JSON"으로 변경. 데이터 입력 후 Send
```json
{
  "email": "u1@gmail.com",
  "password": "11111111"
}
```

##### 로그인 응답 결과로 받은 토큰을 환경 변수에 세팅
* Collections > Open Market API > 로그인 > Scripts > Post-response
  ```js
  if (pm.response.code === 200) {
    const jsonData = pm.response.json();
    const accessToken = jsonData.item.token.accessToken;
    const refreshToken = jsonData.item.token.refreshToken;
    pm.environment.set("accessToken", accessToken);
    pm.environment.set("refreshToken", refreshToken);
  }
  ```
* Environments > Open Market 환경 변수에 accessToken과 refreshToken 추가 되었는지 확인

##### 회원 정보 수정 요청 헤더에 토큰 인증 정보 추가
* Collections > Open Market API > 회원 정보 수정 > Authorization
  - Auth Type: Bearer Token
  - Token: `{{accessToken}}`
  - Send
  - 정상 응답 결과 확인

##### 컬렉션내의 모든 요청에 토큰 인증 정보 추가
* Collections > Open Market API > Authorization
  - Auth Type: Bearer Token
  - Token: `{{accessToken}}`
  - Ctrl + S 눌러서 저장

## Ajax

### Ajax란?
- Ajax(Asynchronous JavaScript and XML)는 클라이언트와 서버 간 비동기 통신 기법
- 자바스크립트로 HTTP 요청을 보내고 응답을 받아 처리하는 방식
  - 과거에는 XML을 주로 사용했지만, 현재는 JSON이 더 선호됨
- 페이지 이동이나 새로고침 없이 서버에 요청을 보내고 DOM API를 이용해 화면을 갱신

### XMLHttpRequest 객체
- 서버에 HTTP 요청을 만들고 전송할 수 있는 자바스크립트 객체
- 웹 초창기부터 사용되어 구버전 브라우저에서도 동작

#### 사용 예시
```js
function getTodoList(callback){
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = xhr.responseText;
    const jsonData = JSON.parse(data);
    callback(jsonData);
  };
  xhr.open('GET', 'http://example.com/todolist', true);
  xhr.send();
}
```

### fetch API
- ECMAScript 6에서 추가된 HTTP 클라이언트
- 콜백 기반인 XMLHttpRequest와 달리 Promise 기반으로 설계됨
- XMLHttpRequest를 대체할 수 있는 표준 API
- XMLHttpRequest보다 나은 선택이지만 다음과 같은 단점이 있음
  - 응답 객체에서 본문을 바로 꺼낼 수 없으며, JSON이나 다른 데이터 타입으로 파싱이 필요
  - 네트워크 에러를 제외한 HTTP 응답 에러(4xx, 5xx)에 대해 오류가 발생하지 않으므로 별도로 체크 필요
  - 이러한 이유로 axios와 같은 라이브러리에 비해 사용이 다소 불편
  
#### 사용 예시
```js
async function getTodoList() {
  try{
    const response = await fetch('http://example.com/todolist');
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    }else{
      // 404 같은 HTTP 응답 오류에 대한 처리
    }
  }catch(err){
    // 네트워크 에러에 대한 처리
  }
}
```

#### fetch(resource, options?)
* 지정한 resource로 HTTP 요청을 보낸다.
* 자세한 내용: https://developer.mozilla.org/ko/docs/Web/API/Window/fetch#credentials

##### resource
- 문자열, URL 객체, Request 객체
* 사용 사례
  ```js
  const request = new Request('http://example.com/todolist', options);
  const response = await fetch(request);
  ```

##### options
- method: 요청을 생성할때 사용되는 메소드(GET, POST 등)
- headers: 사용자 지정 헤더
- body: 요청 바디로 전송될 데이터
- mode: CORS 정책
  - cors: 기본값. CORS 요청 허용. 서버 응답에 `Access-Control-Allow-Origin` 헤더가 추가되어야 함
  - no-cors: CORS 요청은 서버에 전송되지만 응답 본문을 텍스트나 json으로 읽을 수 없음(이미지를 바이너리로 읽는 것은 가능)
  - same-origin: CORS 요청을 허용하지 않음. 다른 서버로 요청을 보내면 요청이 실패함
- credentials: 자격 증명을(쿠키, HTTP 인증, TLS 클라이언트 인증서) 사용하여 사이트 간 액세스 제어 요청을 어떻게 해야 하는지 여부 지정
  - omit: 브라우저가 요청에서 자격증명을 제외하고 Set-Cookie 헤더처럼 응답에 포함된 자격증명도 무시
  - same-origin: 기본값. 동일 출처 요청에 대해서는 자격증명을 보내거나 받음
  - include: CORS 요청에 대해서도 자격증명을 보내거나 받음
- cache: HTTP 캐시와 어떻게 상호작용할지를 지정
  - default | no-store | reload | no-cache | force-cache | only-if-cached
  - 자세한 내용: https://developer.mozilla.org/ko/docs/Web/API/Request/cache
- redirect: 서버의 redirect 응답에 대한 처리
  - follow: 기본값. 자동으로 redirect 됨
  - error: redirect 발생 시 오류와 함께 요청 중단
  - manual: redirect 되지 않고 응답 그대로 Response 객체를 반환함. 개발자가 이후의 작업을 직접 구현
- referrer
- referrerPolicy
- integrity
- keepalive
- signal
- priority

### axios 라이브러리
- Node.js와 브라우저에서 사용 가능한 Promise 기반 HTTP 클라이언트
- XMLHttpRequest 객체를 기반으로 동작하여 Fetch API보다 호환성 좋음
- 요청 및 응답을 가로채는 인터셉터 기능 제공
- JSON 형식의 응답 데이터를 자동으로 객체로 파싱
- timeout 설정 가능

#### 사용 예시
```js
async function getTodoList(){
  try{
    const response = await axios.get('http://example.com/todolist');
    return response.data;
  }catch(err){
    // 네트워크 에러나 HTTP 응답 에러 처리
  }
}
```

#### 설치
```sh
npm i axios
```

#### 요청 API
##### axios(url, config?), axios(config), axios.request(config)
* 지정한 url로 HTTP 요청을 보낸다.(기본 GET 방식)

* 사용 사례
  ```js
  const response = await axios('https://todo-api.fesp.shop/api/todolist'); 
  ```

  ```js
  const response = await axios('https://todo-api.fesp.shop/api/todolist', {
    method: 'post',
    data: {
      title: '할일 1',
      content: '내용 1'
    }
  }); 
  ```

  ```js
  const response = await axios({
    url: 'https://todo-api.fesp.shop/api/todolist/1',
    method: 'patch',
    data: {
      title: '할일 1 수정',
      content: '내용 1 수정'
    }
  }); 
  ```

  ```js
  const response = await axios.request({
    url: 'https://todo-api.fesp.shop/api/todolist/1',
    method: 'delete'
  });
  ```

##### config 객체의 주요 속성
```js
{
  // 요청에 사용될 서버 URL
  url: '/todolist',

  // 요청을 생성할때 사용되는 메소드
  method: 'get', // 기본값

  // `url`이 절대값이 아닌 경우 `baseURL`이 url 앞에 붙음
  baseURL: 'https://todo-api.fesp.shop/api',
  
  // 사용자 지정 헤더
  headers: {'Authrization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'},

  // `params`은 요청과 함께 전송되는 URL 파라미터(pathname? 뒤에 추가되는 name=value 쌍의 문자열)
  // 반드시 일반 객체나 URLSearchParams 객체여야 함
  // 참고: null이나 undefined는 URL에 렌더링되지 않음
  params: {
    page: 3,
    limit: 10
  },

  // 요청 바디로 전송될 데이터
  // 'PUT', 'POST', 'PATCH', 'DELETE' 메소드에서만 적용 가능
  // 다음 타입 중 하나여야 함
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 브라우저 전용: FormData, File, Blob
  data: {
    title: '10시간 푹자기',
    content: '이번 주말에 도전해야지'
  },

  // 응답이 `timeout(밀리초)`보다 오래 걸리면 요청이 중단되고 timeout 에러 발생
  timeout: 1000, // 기본값은 `0` (타임아웃 없음)

  // 자격 증명을(쿠키, HTTP 인증, TLS 클라이언트 인증서) 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부 지정
  // 다른 도메인으로 CORS 요청시 쿠키(Cookie, Set-Cookie)가 기본으로 포함되지 않으므로 이를 사용하기 위해서는 true로 설정해야 함
  // 서버에서도 응답헤더 Access-Control-Allow-Credentials: true 설정이 필요
  withCredentials: false, // 기본값
}
```

##### HTTP 메소드별로 제공되는 함수
* axios.get(url, config?)
  ```js
  const response = await axios.get('/todolist');
  setItems(response.data.items);
  ```

* axios.post(url, data, config?)
  ```js
  try{
    await axios.post('/todolist', {
      title: '할일 1',
      content: '내용 1'
    });
    alert('할일이 추가 되었습니다.');
  }catch(err){
    console.error(err);
    alert('할일 추가에 실패했습니다.');
  }
  ```

* axios.delete(url, config?)
  ```js
  try{
    await axios.delete(`/todolist/${_id}`);
    alert('할일이 삭제 되었습니다.');
  }catch(err){
    console.error(err);
    alert('할일 삭제에 실패했습니다.');
  }
  ```

* axios.patch(url, data, config?)
  ```js
  try{
    await axios.patch(`/todolist/${_id}`, {
      content: '수정된 내용'
    });
    alert('할일을 수정했습니다.');
  }catch(err){
    console.error(err);
    alert('할일 수정에 실패했습니다.');
  }
  ```

* axios.put(url, data, config?)
* axios.head(url, config?)
* axios.options(url, config?)

#### Axios 인스턴스
* 지정한 config 정보로 새로운 Axios 인스턴스 생성

* axios.create(config?)

##### 사용 예시
```js
const instance = axios.create({
  baseURL: 'https://todo-api.fesp.shop/api', // 기본 URL
  timeout: 3000, // 지정한 시간이 지나도록 응답이 완료되지 않으면 timeout 에러 발생
  headers: {
    'content-type': 'application/json', // request의 데이터 타입
    accept: 'application/json'  // response의 데이터 타입
  },
});

instance.get('/list', {
  params: {
    page: 3,
    limit: 10
  },
});
```

#### 인터셉터
* axios로 서버에 HTTP 요청을 보내기 직전이나 응답이 도착해서 리턴되기 전에 요청과 응답을 가로채서 추가적인 작업 수행 가능

##### 사용 사례
```js
// 요청 인터셉터 추가하기
axios.interceptors.request.use((config) => {
  // 요청이 전달되기 전에 필요한 공통 작업 수행

  return config;
}, (error) => {
  // 공통 에러 처리

  return Promise.reject(error);
});

// 응답 인터셉터 추가하기
axios.interceptors.response.use((response) => {
  // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
  // 응답 데이터를 이용해서 필요한 공통 작업 수행

  return response;
}, (error) => {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
  // 공통 에러 처리

  return Promise.reject(error);
});
```

### React Query(TanStack Query)
* 참고: https://tanstack.com/query
* React에서 Axios 같은 비동기 데이터 처리 작업을 손쉽게 사용할 수 있도록 지원하는 라이브러리
* API 서버로부터 받아온 데이터를 캐시하거나 폴링하는 작업을 자동으로 수행해서 서버의 상태를 클라이언트와 동기화
* Pagination, Infinite Scroll 같은 성능 최적화에 필요한 기능 제공

#### 설치
* React Query
  ```sh
  npm i @tanstack/react-query
  ```

* 개발자 도구
  ```sh
  npm i @tanstack/react-query-devtools
  ```
  - 개발자 도구 사용 방법 참고: https://tanstack.com/query/latest/docs/framework/react/devtools

#### 사용 설정
* App.jsx에 추가
  ```jsx
  ......
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
  const queryClient = new QueryClient();

  function App() {
    return (
      <QueryClientProvider client={ queryClient }>    
        ......
        <ReactQueryDevtools initialIsOpen={ false } />
      </QueryClientProvider>
    );
  }
  ```

#### useQuery
* 서버의 데이터를 조회할 때 사용(GET)
* 응답 받은 데이터는 캐시되며 다음번 요청시 서버에 요청하지 않고 캐시된 데이터를 반환
* 캐시 상태
  - fresh
    + 쿼리 실행 후 캐시된 데이터가 오래되지 않은 상태
    + 이때 동일한 쿼리가 다시 실행되면 서버에 요청하지 않고 캐시된 데이터를 반환
    + staleTime 속성으로 fresh 상태를 얼마나 유지할지 설정 가능(default 0)
  - stale
    + fresh 상태가 지나면 캐시는 stale 상태가 됨
    + 이때 동일한 쿼리가 다시 실행되면 일단 캐시된 데이터를 반환하고 서버에 새로운 데이터를 요청함
    + 서버에서 데이터가 도착하면 캐시된 데이터를 교체하고 컴포넌트를 다시 렌더링 함

##### API
```jsx
useQuery(options)
```

###### options
* queryKey
  - useQuery에 부여되는 고유한 Key 값(배열)
  - 같은 queryKey로 요청한 useQuery는 동일한 요청으로 인식하며 캐시된 결과를 반환
    
* queryFn
  - useQuery가 호출 되었을 때 실행될 함수이며 Promise를 반환해야 함
  - 함수 내부에서 axios.get() 같은 함수의 호출 결과를(Promise) 리턴하도록 작성

  - 사용 예시
  ```jsx
  // 게시물 목록 조회
  useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('/posts'),
  });
  // 3번 게시물 상세 조회
  useQuery({
    queryKey: ['posts', '3'],
    queryFn: () => axios.get('/posts/3'),
  });
  // 3번 게시물 댓글 목록 조회
   useQuery({
    queryKey: ['posts', '3', 'replies'],
    queryFn: () => axios.get('/posts/3/replies'),
  });
  ```

* staleTime: 조회한 데이터가 fresh에서 stale 상태로 변경되는데 걸리는 시간(default 0). fresh 상태에서는 동일한 요청에 대해 서버에 요청을 보내지 않고 캐시된 데이터를 반환
* gcTime: 캐시된 데이터가 얼마동안 사용되지 않으면 제거할지 지정(default 5분)
* refetchOnMount: 데이터가 stale 상태일 경우 마운트 시 마다 재요청을 할지 여부(default true). "always"로 지정할 경우 fresh 상태일때도 마운트 시 마다 재요청 함.
* refetchOnWindowFocus: 브라우저가 화면에서 보이지 않다가 다시 보이는 경우 재요청을 할 것인지 여부(default true). "always"로 지정하면 fresh 상태에서도 윈도우 포커싱이 될 때마다 재요청
* enabled: false일 경우 쿼리를 실행하지 않음(default true)
* retry: 실패한 쿼리를 재시도 할지 여부나 횟수(default 3)
  - true: 무한 재시도
  - false: 재시도 하지 않음
  - 정수: 재시도 횟수
* suspense: suspense mode 활성화 여부(default false). suspense mode가 활성화 될 경우 React의 Suspense와 함께 사용 가능
* 그밖의 옵션 참고: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

###### 리턴값
* 다음의 속성을 가진 객체
  - isLoading: queryFn이 반환한 Promise가 pending 상태일때 true. queryFn이 axios를 사용한 함수라면 데이터 로딩중일때 true
  - error: queryFn이 반환한 Promise가 rejected 상태일때 에러 메세지. queryFn이 axios를 사용한 함수라면 에러가 발생했을때 에러 메세지
  - data: queryFn이 반환한 Promise가 fulfilled 상태일때 응답 데이터. queryFn이 axios를 사용한 함수라면 요청에 성공했을때 응답 데이터
  - 그밖의 속성 참고: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

#### useMutation
* 서버의 데이터를 변경할 때 사용(POST, PUT, PATCH, DELETE)
* useMutation은 React Hook이므로 컴포넌트 루트에서만 사용할 수 있고 대부분의 경우 서버의 데이터를 변경하는 작업은(등록, 수정, 삭제) 사용자의 액션에 의해서 실행 되기 때문에 mutationFn이 호출되는 위치는 이벤트 핸들러 내부이므로 컴포넌트 루트가 아님
* useMutation은 쿼리를 바로 실행하지 않고 쿼리를 실행 할때 사용할 함수를 반환하므로 이벤트 핸들러 내에서 useMutation이 반환한 함수를 통해 쿼리 실행

##### API
* useMutation(options)

###### options
* mutationFn
  - useMutation이 반환한 mutate 함수가 호출 되었을 때 실행될 함수이며 Promise를 반환해야 함
  - 함수 내부에서 axios.post() 같은 함수를 리턴하도록 작성
* gcTime, retry: useQuery 설명 참조
* onSuccess: 쿼리 성공 시 실행되는 함수. 매개변수로 서버의 응답값이 전달됨
* onError: 쿼리 실패 시 실행되는 함수. 매개변수로 에러값이 전달됨
* onSettled: 쿼리 성공, 실패와 상관 없이 실행되는 함수. 매개변수는 data, error
  - onSuccess, onError, onSettled는 useMutation 뿐만 아니라 mutate 함수의 옵션으로도 사용 가능
* 그밖의 옵션 참고: https://tanstack.com/query/latest/docs/react/reference/useMutation

###### 리턴값
* 다음의 속성을 가진 객체
  - mutate: 이벤트 핸들러 내부에서 mutate를 호출하면 mutationFn이 호출되면서 실제 비동기 요청이 발생함
  - isLoading, error, data: useQuery 설명 참조
  - 그밖의 속성 참고: https://tanstack.com/query/latest/docs/react/reference/useMutation

###### invalidateQueries
* useQuery에서 사용된 queryKey를 지정해서 해당 쿼리를 무효화 시키고 데이터를 다시 가져옴
* 사용 예시
  ```jsx
  const queryClient = useQueryClient();
  // 새로운 댓글 작성시 3번 게시물의 댓글 목록을 무효화 시키고 서버에서 다시 가져옴
  queryClient.invalidateQueries({ queryKey: ['posts', 3, 'comments'] })
  ```

* 참고: https://tanstack.com/query/latest/docs/reference/QueryClient/#queryclientinvalidatequeries

## 데이터 패칭 패턴
* 컴포넌트 렌더링과 비동기 데이터 로드 간의 관계를 정의하는 패턴으로 각 패턴은 데이터 요청과 UI 렌더링의 타이밍을 다르게 처리함

### Fetch-on-render
* 컴포넌트가 렌더링 된 후 데이터 패칭

#### 흐름
1. 컴포넌트가 처음 렌더링될 때 데이터가 보여질 영역을 비운채로 렌더링
2. useEffect 훅에서 데이터 패칭 요청
3. 데이터가 도착하면 상태를 업데이트해서 응답 받은 데이터를 가지고 리렌더링
4. 자식 컴포넌트가 있다면 자식 컴포넌트도 1 ~ 3 순서로 작업

#### 장점
* 코드가 간결하고 직관적
* 각 컴포넌트가 독립적으로 동작해서 재사용성이 높음

#### 단점
* 페이지 렌더링과 데이터 요청이 순차적으로 발생하여 폭포수 현상 발생
* 부모와 자식이 동일한 데이터를 요청할 경우 네트워크 요청이 중복될 수 있음

#### 샘플 코드
```jsx
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get('https://11.fesp.shop/posts/1?delay=3000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPost().then(res => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>1번 게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{data.item.title}</h4>
      <Comments />
    </>
  );
}

// 댓글 목록 조회 화면
function fetchComments() {
  return axios.get('https://11.fesp.shop/posts/1/replies?delay=2000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 댓글 목록 조회 API 호출
export function Comments() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchComments().then(res => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>댓글 로딩중...</div>;
  }

  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchOnRender;
```

### Fetch-then-render
* 필요한 데이터를 모두 패칭한 후 컴포넌트 렌더링

#### 흐름
1. 컴포넌트가 처음 렌더링될 때 데이터가 보여질 영역을 비운채로 렌더링
2. useEffect 훅에서 데이터 패칭 요청(자식 컴포넌트에서 필요한 데이터도 동시에 패칭)
3. 데이터가 도착하면 상태를 업데이트해서 응답 받은 데이터를 가지고 리렌더링
4. 자식 컴포넌트가 있다면 Props로 데이터 전달. 자식 컴포넌트는 데이터 패칭 없이 바로 렌더링

#### 장점
* 데이터를 미리 패칭하여 컴포넌트가 렌더링 되는 시점에 로딩 상태가 없거나 짧음
* 부모가 데이터를 미리 가져와서 자식에게 전달하므로 네트워크 중복 요청 방지

#### 단점
* 렌더링 전에 데이터를 요청하기 때문에 초기 로딩이 길어질 수 있음
* 부모 컴포넌트가 자식 컴포넌트의 의존성을 모두 관리해야 하므로 복잡성이 증가

#### 샘플 코드
```jsx
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글과 댓글 목록 조회를 동시에
function fetchData(){
  return Promise.all([
    fetchPost(),
    fetchComments(),
  ]).then(([ post, comments ]) => {
    return { post: post.data, comments: comments.data };
  });
}

// 데이터 패칭 시작(렌더링 전에 부모 컴포넌트에서 import하는 순간에 실행)
const promise = fetchData();

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get('https://11.fesp.shop/posts/1?delay=3000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchThenRender() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    promise.then(res => {
      setPost(res.post);
      setComments(res.comments);
    });
  }, []);

  if(!post){
    return <div>1번 게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{post.item.title}</h4>
      <Comments comments={comments}/>
    </>
  );
}

// 댓글 목록 조회 화면
function fetchComments() {
  return axios.get('https://11.fesp.shop/posts/1/replies?delay=2000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 댓글 목록 조회 API 호출
export function Comments({ comments }) {
  if(!comments){
    return <div>댓글 로딩중...</div>;
  }

  const list = comments.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchThenRender;
```

### Render-as-you-fetch
* React의 Suspense 컴포넌트를 사용
* 데이터 패칭과 동시에 컴포넌트 렌더링

#### Suspense
* React에서 비동기 작업이 끝날 때까지 기다렸다가 컴포넌트를 화면에 보여주는 기능
* 기다리는 동안에는 "로딩 중..." 같은 대체 화면(fallback)을 대신 보여줌

#### 동작 원리(사용 방법)
1. 비동기 통신을 사용하는 컴포넌트를 Suspense 컴포넌트로 감싼다.
2. Suspense 컴포넌트의 fallback 속성으로 대체 UI를 지정한다.
    ```js
    <Suspense fallback={<div>로딩중...</div>}>
      <AsyncComponent />
    </Suspense>
    ```
3. 자식 컴포넌트(AsyncComponent)는 데이터를 로드하거나 비동기 작업을 수행하는 동안, Promise를 throw 한다.
  - React Query, SWR 등의 라이브러리에는 이미 이 동작이 구현되어 있음
4. Suspense는 이 Promise를 감지하고, 자식 컴포넌트의 렌더링을 중지한 후 Suspense의 fallback UI를 렌더링한다.
5. Suspense는 자식 컴포넌트에서 반환받은 Promise가 Fulfilled 상태로 전환되면, 자식 컴포넌트를 리렌더링한다.

#### 장점
* 데이터 요청과 컴포넌트 렌더링이 병렬로 진행되어 성능 최적화
* Suspense를 사용해 비동기 로직이 간결해짐

#### 단점
* Suspense 컴포넌트를 추가적으로 감싸는 부분이 복잡해 질 수 있음
* Suspense와 함께 동작하는 비동기 로직을 직접 작성하기가 복잡해서 외부 라이브러리(React Query, SWR 등)를 사용해야 할 수 있음
  - React 18 버전에 실험적 기능인 use() 훅으로 사용 가능

#### 코드 샘플
```jsx
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get('https://11.fesp.shop/posts/1?delay=3000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchAsYouRender() {
  // React Query 사용
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1],
    queryFn: () => fetchPost(),
    select: res => res.data,
    staleTime: 1000*10,
  });

  return (
    <>
      <h4>{data.item.title}</h4>
    </>
  );
}

// 댓글 조회 API 호출
function fetchComments() {
  return axios.get('https://11.fesp.shop/posts/1/replies?delay=2000', {
    headers: {
      'client-id': '00-brunch'
    }
  });
}

// 댓글 목록 조회 화면
export function Comments() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1, 'replies'],
    queryFn: () => fetchComments(),
    select: res => res.data,
    staleTime: 1000*10,
  });
  
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchAsYouRender;
```


