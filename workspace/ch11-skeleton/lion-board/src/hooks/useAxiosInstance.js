import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// accessToken을 헤더에 포함해서 API 요청에 전달
// accessToken이 만료된 경우 refreshToken으로 새로운 토큰을 발급받아 요청을 재시도
// 인증 실패 시, 로그인 페이지로 리다이렉트

// access token 재발급 URL
const REFRESH_URL = "/auth/refresh";

function useAxiosInstance() {
  const { user, setUser } = useUserStore();

  // React Router에서 페이지 이동을 처리
  const navigate = useNavigate();
  // 현재 위치 정보를 가져옴(로그인 후 이전 페이지로 돌아가기 위해 사용)
  const location = useLocation();

  // Axios의 인스턴스를 생성해서 기본 설정(baseURL, timeout, headers)을 적용
  const instance = axios.create({
    // 모든 요청의 기본 URL을 설정
    baseURL: "https://11.fesp.shop",
    // 요청이 15초 내에 완료되지 않으면 자동으로 중단
    // 1000 * 15는 직관적인 표기
    timeout: 1000 * 15,
    // 모든 요청에 공통적으로 추가되는 헤더 ex)데이터 타입(JSON) 지정 및 클라이언트 ID 제공
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      "client-id": "00-board",
    },
  });

  // 요청 인터셉터 추가하기 (모든 요청이 서버로 전달되기 전에 실행행)
  instance.interceptors.request.use((config) => {
    // refresh 요청일 경우 Authorization 헤더는 이미 refresh token으로 지정되어 있음
    if (user && config.url !== REFRESH_URL) {
      // Authorization 헤더: accessToken을 가져와 요청 헤더에 추가
      // 단, REFRESH_URL 요청에는 refreshToken을 사용해야 하므로 제외
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    // 요청의 쿼리 파라미터에 delay: 500을 기본 추가
    config.params = {
      delay: 500,
      ...config.params, // 기존 쿼리스트링 복사
    };
    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행
      // 요청이 성공했으니 response를 그대로 반환
      return response;
    },
    // 요청이 실패하면 error 객체를처리
    async (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("인터셉터", error);
      const { config, response } = error;

      // 401코드(Unauthorized)일 때때
      if (response?.status === 401) {
        // 인증 실패
        // refresh token 만료
        if (config.url === REFRESH_URL) {
          // 로그인 페이지로 이동
          navigateLogin();
        } else if (user) {
          // 로그인 했으나 accessToken 만료된 경우
          // refreshToken으로 accessToken 재발급 요청
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });
          setUser({ ...user, accessToken });
          // 갱신된 accessToken으로 재요청
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        } else {
          // 로그인 안한 경우, 로그인 페이지로 이동
          navigateLogin();
        }
      }
      return Promise.reject(error);
    }
  );

  function navigateLogin() {
    const gotoLogin = confirm(
      "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
    );
    // 로그인 후 현재 페이지로 돌아올 수 있도록 현재 페이지 경로(location.pathname)를 저장
    gotoLogin &&
      navigate("/users/login", { state: { from: location.pathname } });
  }

  return instance;
}

export default useAxiosInstance;
