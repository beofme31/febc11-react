# Lion Board 앱

## 샘플 페이지 확인
* sample/07/workspace/ch11-skeleton 폴더를 workspace에 복사
* workspace/ch11-skeleton/sample 폴더에서 다음 명령 실행
```sh
npx serve .
```

* 브라우저에서 페이지 이동 테스트

# 1단계
* HTML 코드를 기반으로 리액트 컴포넌트 생성
* 리액트 라우터 적용

## 프로젝트 생성
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch02-start#vite
* workspace/ch11-skeleton 폴더에서 다음 명령 실행
  ```sh
  npm init vite@latest
  ```
  - Project name: lion-board
  - Select a framework: React
  - Select a variant: JavaScript

  ```sh
  # 생성한 프로젝트 폴더로 이동
  cd lion-board
  # 기본 패키지 설치
  npm i
  # 추가 패키지 설치
  npm i prop-types react-router-dom react-hook-form axios @tanstack/react-query @tanstack/react-query-devtools react-spinners react-toastify zustand
  npm i -D tailwindcss postcss autoprefixer
  # 개발 서버 실행
  npm run dev
  ```

## 프로젝트 설정
### alias 추가
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch02-start#viteconfigjs

#### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@zustand", replacement: "/src/zustand" },
    ],
  },
})
```
#### jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["/*"],
      "@components/*": ["components/*"],
      "@pages/*": ["pages/*"],
      "@hooks/*": ["hooks/*"],
      "@zustand/*": ["zustand/*"],
    }
  }
}
```

### Tailwind CSS 설정
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch08-css#%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EC%83%9D%EC%84%B1

* tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

* src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 정적인 자원 처리
* sample/images 폴더를 lion-board/public 폴더에 복사
* favicon 설정
  - lion-board/index.html 파일의 favicon 설정 수정
  ```html
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
  ```

## UI 컴포넌트 작성
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch02-start#2-4-jsx
* workspace/ch11-skeleton/sample 폴더의 html 코드를 컴포넌트로 이동
  - header 태그는 Header.jsx에서 사용
  - footer 태그는 Footer.jsx에서 사용
  - div id="main" 태그는 각 페이지의 컴포넌트에서 사용
  - JSX 문법에 맞게 수정

### 공통 컴포넌트
* lion-board/src/components/layout 폴더 생성후 파일 작성
* Header.jsx
  - sample/index.html의 `<header>` 영역 복사
  - JSX 문법에 맞게 수정

* Footer.jsx
  - sample/index.html의 `<footer>` 영역 복사
  - JSX 문법에 맞게 수정

### 레이아웃 컴포넌트 작성
* lion-board/src/components/layout/index.jsx 파일 작성
  ```jsx
  import Footer from "@components/Footer";
  import Header from "@components/Header";
  import { Outlet } from 'react-router-dom';

  export default function Layout(){
    return (
      <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
  ```

### 페이지별 컴포넌트
#### 메인 페이지
* sample/index.html 참고해서 lion-board/src/pages/index.jsx 파일 작성

#### 게시판 기능
* lion-board/src/pages/board 폴더 생성후 sample 폴더 html 파일의 `<main>` 태그 복사해서 완성
  - List.jsx
  - ListItem.jsx
  - New.jsx
  - Detail.jsx
  - Edit.jsx
  - CommentList.jsx
  - CommentListItem.jsx
  - CommentNew.jsx

#### 회원 기능
* lion-board/src/pages/user 폴더 생성후 sample 폴더 html 파일의 `<main>` 태그 복사해서 완성
  - Login.jsx
  - Signup.jsx

#### 에러 페이지
* sample/error.html 참고해서 lion-board/src/pages/ErrorPage.jsx 파일 작성
  ```jsx
  import Footer from "@components/Footer";
  import Header from "@components/Header";

  export default function ErrorPage() {
    return (
      <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
        <Header />
        <div className="py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
          <h2 className="text-xl font-semibold mb-2 text-center">🚧 앗, 무언가 잘못됐네요!</h2>
          <h3 className="text-md font-semibold mb-2 text-center">존재하지 않는 페이지입니다.</h3>
          <p className="pt-12 text-center">이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요!</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
            ⚙️ 다시 시도
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  ```

### 라우터 작성
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch05-router#5%EC%9E%A5-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9A%B0%ED%84%B0
* lion-board/src/routes.jsx 파일 생성
* BrowserRouter 사용
  ```jsx
  import Layout from "@components/layout";
  import Detail from "@pages/board/Detail";
  import Edit from "@pages/board/Edit";
  import List from "@pages/board/List";
  import New from "@pages/board/New";
  import ErrorPage from "@pages/ErrorPage";
  import MainPage from "@pages/index";
  import Login from "@pages/user/Login";
  import Signup from "@pages/user/Signup";

  import { createBrowserRouter } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: ":type", element: <List /> },
        { path: ":type/new", element: <New /> },
        { path: ":type/:_id", element: <Detail /> },
        { path: ":type/:_id/edit", element: <Edit /> },
        { path: "users/login", element: <Login /> },
        { path: "users/signup", element: <Signup /> },
      ]
    },
  ]);

  export default router;
  ```

### App.jsx 수정
* 리액트 라우터 추가
  ```jsx
  import { RouterProvider } from "react-router-dom";
  import router from "@/routes";

  function App() {
    return (
      <RouterProvider router={ router } />
    );
  }

  export default App;
  ```

### 링크 확인
* 링크가 제대로 동작하지 않는 부분 수정
  - a 태그 대신 Link로 수정
  - href 속성을 to로 수정
  - 링크를 라우터에 등록한 URL로 수정
* Header.jsx 예시
  ```jsx
  <Link to="/info">정보공유</Link>
  <Link to="/free">자유게시판</Link>
  <Link to="/qna">질문게시판</Link>
  ```

# 2단계
* API 서버 호출
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch09-ajax#axios-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC

## React Query 설정
* QueryClient 지정
* 참고: https://github.com/uzoolove/febc11-react/tree/main/workspace-ins/ch09-ajax#%EC%82%AC%EC%9A%A9-%EC%84%A4%EC%A0%95
* main.jsx
  ```jsx
  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css';
  import App from './App.jsx'
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  const client = new QueryClient();

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <QueryClientProvider client={ client }>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  )
  ```

## axios 커스텀 훅 작성
* hooks/useAxiosInstance.jsx 작성
  ```jsx
  import axios from "axios";

  function useAxiosInstance() {
    const instance = axios.create({
      baseURL: 'https://11.fesp.shop',
      timeout: 1000*15,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'client-id': '00-board',
      }
    });

    instance.interceptors.request.use((config) => {
      config.params = {
        delay: 500,
        ...config.params,
      };
      return config;
    });

    instance.interceptors.response.use((response) => {

      return response;
    }, (error) => {

      return Promise.reject(error);
    });

    return instance;
  }

  export default useAxiosInstance;
  ```

## API 서버 호출
### 게시물 목록 조회
* pages/List.jsx
  ```jsx
  ...
  export default function List() {
    const axios = useAxiosInstance();
    const { type } = useParams();

    const { data } = useQuery({
      queryKey: ['posts', type],
      queryFn: () => axios.get('/posts', { params: { type } }),
      select: res => res.data,
      staleTime: 1000*10,
    });

    if(!data){
      return <div>로딩중...</div>;
    }

    const list = data.item.map(item => <ListItem key={item._id} item={ item } />);

    return (
      ...
      <tbody>{ list }</tbody>
      ...
    );
  }
  ```

* pages/board/ListItem.jsx
  ```jsx
  import PropTypes from "prop-types";
  import { Link } from "react-router-dom";

  ListItem.propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      writer: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      views: PropTypes.number,
      repliesCount: PropTypes.number,
      createdAt: PropTypes.string.isRequired,
    }).isRequired,

  };
  export default function ListItem({ item }) {
    return (
      <>
        <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
          <td className="p-2 text-center">{ item._id }</td>
          <td className="p-2 truncate indent-4"><Link to={`${ item._id }`} className="cursor-pointer">{ item.title }</Link></td>
          <td className="p-2 text-center truncate">{ item.user.name }</td>
          <td className="p-2 text-center hidden sm:table-cell">{ item.views }</td>
          <td className="p-2 text-center hidden sm:table-cell">{ item.repliesCount }</td>
          <td className="p-2 truncate text-center hidden sm:table-cell">{ item.createdAt }</td>
        </tr>
      </>
    );
  }
  ```

### 게시물 등록
#### 입력값 검증 실패 메세지 출력용 컴포넌트 작성
* components/InputError.jsx 생성
  ```jsx
  export default function InputError({ target }){
    if(!target) return;
    return (
      <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
        { target.message }
      </p>
    );
  }
  ```

#### 폼 데이터 관리
* pages/board/New.jsx
  - react-hook-form 사용
    ```jsx
    import { useForm } from 'react-hook-form';
    ...
    export default function New() {
      const { register, handleSubmit, formState: { errors } } = useForm();
      ...
    }
    ```

  - react-hook-form의 register 함수로 입력 요소 등록 및 검증 실패 메세지 출력
    ```jsx
    <input
      id="title"
      type="text"
      placeholder="제목을 입력하세요." 
      className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      { ...register('title', { required: '제목을 입력하세요.' }) }
    />
    <InputError target={ errors.title } />
    ```

    ```jsx
    <textarea 
      id="content"
      rows="15" 
      placeholder="내용을 입력하세요."
      className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      { ...register('content', { required: '내용을 입력하세요' }) }
    />
    <InputError target={ errors.content } />
    ```

#### 게시물 등록 API 호출
* pages/board/New.jsx
* API 호출
  ```jsx
  const { type } = useParams();
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  const queryClient = useQueryClient();

  const addItem = useMutation({
    mutationFn: formData => {
      formData.type = type;
      return axios.post('/posts', formData);
    },
    onSuccess: () => {
      alert('새로운 글이 등록 되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      navigate(`/${type}`);
    },
  });
  ```

* form의 onSubmit 이벤트 등록
  ```jsx
  <form onSubmit={ handleSubmit(addItem.mutate) }>
  ```

### 게시물 상세 보기
* pages/board/Detail.jsx
  ```jsx
  import useAxiosInstance from "@hooks/useAxiosInstance";
  import CommentList from "@pages/board/CommentList";
  import { useQuery } from "@tanstack/react-query";
  import { Link, useParams } from "react-router-dom";

  export default function Detail() {

    const { type, _id } = useParams();
    const axios = useAxiosInstance();

    const { data } = useQuery({
      queryKey: ['posts', _id],
      queryFn: () => axios.get(`/posts/${_id}`),
      select: res => res.data,
      staleTime: 1000*10,
    });

    if(!data){
      return <div>로딩중...</div>;
    }
    
    return (
      <>
        <main className="container mx-auto mt-4 px-4">

          <section className="mb-8 p-4">
            <form action="/info">
            <div className="font-semibold text-xl">제목 : { data.item.title }</div>
              <div className="text-right text-gray-400">작성자 : { data.item.user.name }</div>
              <div className="mb-4">
                <div>
                  <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{ data.item.content }</pre>
                </div>
                <hr/>
              </div>
              <div className="flex justify-end my-4">
                <Link to={`/${type}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>
                <Link to={`/${type}/${_id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
                <button type="submit" className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
              </div>
            </form>
          </section>

          <CommentList data={ data.item.replies } />

          </main>
      </>
    );
  }
  ```

#### 댓글 목록 조회
* pages/board/CommentList.jsx
  ```jsx
  import CommentListItem from "@pages/board/CommentListItem";
  import CommentNew from "@pages/board/CommentNew";
  import PropTypes from "prop-types";

  CommentList.propTypes = {
    data: PropTypes.array.isRequired,
  };

  export default function CommentList({ data=[] }) {

    const list = data.map(item => <CommentListItem key={ item._id } item={ item } />);
    return (
      <>
        <section className="mb-8">
          <h4 className="mt-8 mb-4 ml-2">댓글 { data.length }개</h4>

          { list }

          <CommentNew />

        </section>
      </>
    );
  }
  ```

* pages/board/CommentListItem.jsx
  ```jsx
  import PropTypes from "prop-types";
  import { Link } from "react-router-dom";

  CommentListItem.propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
      }).isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired,
  };
  export default function CommentListItem({ item }) {
    return (
      <>
        <div className="shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            { item.user.image && 
              <img
                className="w-8 mr-2 rounded-full"
                src={`https://11.fesp.shop${ item.user.image }`}
                alt={`${ item.user.name } 프로필 이미지`}
              />
            }
            <Link to="" className="text-orange-400">${ item.user.name }</Link>
            <time className="ml-auto text-gray-500" dateTime={ item.user.createdAt }>{ item.user.createdAt }</time>
          </div>
          <div className="flex justify-between items-center mb-2">
            <form action="#">
              <pre className="whitespace-pre-wrap text-sm">{ item.content }</pre>
              <button type="submit" className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
            </form>
          </div>  
        </div>
      </>
    );
  }
  ```

### 회원 가입
* 남은 기능인 게시물 수정, 게시물 삭제, 댓글 등록, 댓글 삭제는 로그인 한 회원만 사용 가능한 기능

* pages/user/Signup.jsx
  - react-hook-form으로 입력 요소 관리
    ```jsx
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    ```

    ```jsx
    <input
      type="text"
      id="name"
      placeholder="이름을 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('name', { required: '이름은 필수입니다.' }) }
    />
    <InputError target={ errors.name } />
    ```

    ```jsx
    <input
      type="email"
      id="email"
      placeholder="이메일을 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('email', { required: '이메일은 필수입니다.' }) }
    />
    <InputError target={ errors.email } />
    ```

    ```jsx
    <input
      type="password"
      id="password"
      placeholder="비밀번호를 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('password', { required: '비밀번호는 필수입니다.' }) }
    />
    <InputError target={ errors.password } />
    ```

    ```jsx
    <input
      type="file"
      id="attach"
      accept="image/*"
      placeholder="이미지를 선택하세요"
      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
      { ...register('attach') }
    />
    ```

  - 회원 가입 이벤트 추가
  ```jsx
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const addUser = useMutation({
    mutationFn: userInfo => {
      userInfo.type = 'user';
      return axios.post(`/users`, userInfo);
    },
    onSuccess: () => {
      alert('회원가입 완료');
      navigate(`/`);
    },
    onError: (err) => {
      console.error(err);
      if(err.response?.data.errors){
        err.response?.data.errors.forEach(error => setError(error.path, { message: error.msg }));
      }else{
        alert(err.response?.data.message || '잠시후 다시 요청하세요.');
      }
    },
  });
  ```

  - form에 submit 이벤트 추가
    ```jsx
    <form onSubmit={ handleSubmit(addUser.mutate) }>
    ```

### 로그인
* pages/user/Login.jsx
  - react-hook-form으로 입력 요소 관리
    ```jsx
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    ```

    ```jsx
    <input
      id="email"
      type="email"
      placeholder="이메일을 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('email', { required: '이메일은 필수입니다.' }) }
    />
    <InputError target={ errors.email } />
    ```

    ```jsx
    <input
      id="password"
      type="password"
      placeholder="비밀번호를 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('password', { required: '비밀번호는 필수입니다.' }) }
    />
    <InputError target={ errors.password } />
    ```

  - 로그인 이벤트 추가
  ```jsx
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const login = useMutation({
    mutationFn: formData => axios.post(`/users/login`, formData),
    onSuccess: (res) => {
      alert(res.data.item.name + '님, 로그인 되었습니다.');
      navigate(`/`);
    },
    onError: (err) => {
      if(err.response?.data.errors){
        err.response?.data.errors.forEach(error => setError(error.path, { message: error.msg }));
      }else{
        alert(err.response?.data.message || '잠시후 다시 요청하세요.');
      }
    },
  });
  ```

  - form에 submit 이벤트 추가
    ```jsx
    <form onSubmit={ handleSubmit(login.mutate) }>
    ```

### 요청 헤더에 Authorization 추가
* hooks/useAxiosInstance.jsx 수정
  - 임시로 access token 지정
  - [Access Token]은 로그인 완료후 받은 응답 데이터의 accessToken값 사용
  ```js
  config.headers.Authorization = `Bearer [access Token]`;
  ```

### 게시물 수정
* Edit.jsx 수정
  - 게시물 상세 정보 조회
    ```jsx
    const { type, _id } = useParams();
    const axios = useAxiosInstance();

    const { data } = useQuery({
      queryKey: ['posts', _id],
      queryFn: () => axios.get(`/posts/${_id}`),
      select: res => res.data,
      staleTime: 1000*10,
    });
    ```

  - react-hook-form으로 form 요소 관리
    ```jsx
      const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        title: data?.item.title,
        content: data?.item.content,
      }
    });
    ```

    ```jsx
    <input
      id="title"
      type="text"
      placeholder="제목을 입력하세요." 
      className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      { ...register('title', { required: '제목은 필수입니다.' }) }
    />
    <InputError target={ errors.title } />
    ```

    ```jsx
    <textarea 
      id="content"
      rows="15" 
      placeholder="내용을 입력하세요."
      className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      { ...register('content', { required: '내용은 필수입니다.' }) }
    />
    <InputError target={ errors.content } />
    ```
    
  - submit 이벤트 추가
    ```jsx
    <form onSubmit={ handleSubmit(onSubmit) }>
    ```

    ```jsx
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const updateItem = useMutation({
      mutationFn: formData => axios.patch(`/posts/${_id}`, formData),
      onSuccess: () => {
        alert('게시물이 수정되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['posts', _id] });
        navigate(`/${type}/${_id}`);
      }
    });
    ```

### 게시물 삭제
* pages/board/Detail.jsx 수정
  - 삭제 이벤트 추가
    ```jsx
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const removeItem = useMutation({
      mutationFn: () => axios.delete(`/posts/${_id}`),
      onSuccess: () => {
        alert('게시글이 삭제 되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['posts', type] });
        navigate(`/${type}`);
      }
    });

    const onSubmit = (event) => {
      event.preventDefault();
      removeItem.mutate();
    };
    ```

    - form의 submit 이벤트 추가
    ```jsx
    <form onSubmit={ onSubmit }>
    ```

### 댓글 등록
* pages/board/CommentNew.jsx
  ```jsx
  import InputError from "@components/InputError";
  import useAxiosInstance from "@hooks/useAxiosInstance";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { useForm } from "react-hook-form";
  import { useNavigate, useParams } from "react-router-dom";

  export default function CommentNew() {
    const { type, _id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const axios = useAxiosInstance();

    const queryClient = useQueryClient();

    const addItem = useMutation({
      mutationFn: formData => {
        return axios.post(`/posts/${_id}/replies`, formData);
      },
      onSuccess: () => {
        alert('댓글이 등록 되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['posts', _id] });
        navigate(`/${type}/${_id}`);
      },
    });
    return (
      <>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
          <form onSubmit={ handleSubmit(addItem.mutate) }>
            <input type="hidden" { ...register('name') } value={'무지'} />
            <div className="mb-4">
              <textarea
                rows="3"
                cols="40"
                className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="내용을 입력하세요."
                { ...register('content', { required: '내용을 입력하세요.' }) }
              />
              <InputError target={ errors.content } />
              
            </div>
            <button type="submit" className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">댓글 등록</button>
          </form>
        </div>
      </>
    );
  }
  ```

### 댓글 삭제
* pages/board/CommentListItem.jsx
  - 삭제 이벤트 처리
    ```jsx
    const { _id } = useParams();
    const axios = useAxiosInstance();
    const queryClient = useQueryClient();
    const removeItem = useMutation({
      mutationFn: () => axios.delete(`/posts/${_id}/replies/${item._id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts', _id] });
      }
    });

    const onSubmit = (event) => {
      event.preventDefault();
      removeItem.mutate();
    };
    ```

  - form에 삭제 이벤트 등록
    ```jsx
    <form onSubmit={ onSubmit }>
    ```

### 회원 가입시 프로필 이미지 추가
* Signup.jsx
  - mutationFn 수정
    ```jsx
    mutationFn: async userInfo => {
      // 이미지 먼저 업로드
      if(userInfo.attach.length > 0){
        const imageFormData = new FormData();
        imageFormData.append('attach', userInfo.attach[0]);

        const fileRes = await axios.post('/files', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        userInfo.image = fileRes.data.item[0];
        delete userInfo.attach;
      }

      userInfo.type = 'user';
      return axios.post(`/users`, userInfo);
    },
    onSuccess: () => {
      alert('회원가입 완료');
      navigate(`/`);
    },
    onError: (err) => {
      console.error(err);
      if(err.response?.data.errors){
        err.response?.data.errors.forEach(error => setError(error.path, { message: error.msg }));
      }else{
        alert(err.response?.data.message || '잠시후 다시 요청하세요.');
      }
    },
    ```


