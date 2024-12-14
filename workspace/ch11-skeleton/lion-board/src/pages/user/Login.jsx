// 입력 폼에서 발생한 에러를 사용자에게 보여주는 컴포넌트
import InputError from "@components/InputError";
// API 요청에 사용됨. Axios custom hook
import useAxiosInstance from "@hooks/useAxiosInstance";
// react-query에서 비동기 요청(로그인 API 호출)을 다루는 hook
import { useMutation } from "@tanstack/react-query";
// Zustand 사용해서 사용자 상태 관리하는 hook
import useUserStore from "@zustand/userStore";
// 폼 데이터를 관리하고 유효성 검사를 하는 hook
import { useForm } from "react-hook-form";
// useLocation: 현재 위치(페이지) 정보를 가져옴, useNavigate: 다른 페이지로 이동하는데 사용
import { Link, useLocation, useNavigate } from "react-router-dom";

// 1. 사용자 입력 처리: 이메일과 비밀번호를 입력받아 유효성을 검증. 유효하지 않은 입력은 에러 메시지를 표시
// 2. 로그인 요청: 사용자가 입력한 데이터를 API로 보내 로그인 시도. 성공하면 받은 사용자 정보를 저장하고 이전 페이지나 홈 화면으로 이동. 실패하면 서버에서 반환한 에러를 표시
// 3. UI 구성: Tailwind CSS를 사용해서 로그인 폼과 유효성 검사 메시지를 스타일링. 로그인/회원가입 버튼과 비밀번호 재설정 링크를 포함

// #동작 과정
// 1. 사용자가 이메일과 비밀번호를 입력.
// 2. 로그인 버튼 클릭 → onSubmit 호출:
//    -입력 데이터의 유효성을 검사.
//    -login.mutate를 호출하여 로그인 요청.
// 3. 로그인 성공:
//    -서버에서 받은 사용자 정보를 Zustand 상태(useUserStore)에 저장.
//    -이전 페이지 또는 홈 화면으로 이동.
// 4. 로그인 실패:
//    -서버에서 반환한 에러 메시지를 폼 필드에 표시.

export default function Login() {
  // 로그인 성공 시 사용자 정보를 저장하는 함수
  const setUser = useUserStore((store) => store.setUser);

  const location = useLocation();
  const navigate = useNavigate();
  // register: 폼 필드를 useForm과 연결
  // useForm: 입력 필드와 상태를 관리
  // defaultValues: 폼의 기본값을 설정
  // errors: 유효성 검사 실패 시, 에러 메시지를 저장
  // setError: 서버로부터 받은 에러를 특정 입력 필드에 연결
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "yong@gmail.com",
      password: "11111112",
    },
  });
  // Axios 인스턴스 사용
  const axios = useAxiosInstance();
  // React Query로 로그인 요청 처리
  // useMutation: React Query를 사용해 비동기 요청을 처리
  const login = useMutation({
    // mutationFn: 엔드포인트에 사용자 입력 데이터를 전송송
    mutationFn: (formData) => axios.post(`/users/login`, formData),
    onSuccess: (res) => {
      console.log(res);

      // 회원정보 저장
      const user = res.data.item;
      setUser({
        _id: user._id,
        name: user.name,
        profile: user.image?.path,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });
      // 사용자 이름 표시하고 알림창 띄움움
      alert(res.data.item.name + "님, 로그인 되었습니다.");
      // 이전 페이지 또는 홈 화면으로 이동
      navigate(location.state?.from || `/`);
    },
    onError: (err) => {
      console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
      } else {
        alert(err.response?.data.message || "잠시후 다시 요청하세요.");
      }
    },
  });

  return (
    <>
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              로그인
            </h2>
          </div>

          <form onSubmit={handleSubmit(login.mutate)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("email", { required: "이메일은 필수입니다." })}
              />
              <InputError target={errors.email} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("password", {
                  required: "비밀번호는 필수입니다.",
                })}
              />
              <InputError target={errors.password} />
              <Link
                to="#"
                className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <button
                type="submit"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                로그인
              </button>
              <Link
                to="/users/signup"
                className="ml-8 text-gray-800 hover:underline"
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
