import { useForm } from 'react-hook-form';
import axios from 'axios';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // 2. submit 이벤트 등록
  const onSubmit = async (formData) => {
    try {
      // 3. API 서버 호출
      const res = await axios.post(
        'https://11.fesp.shop/users/login',
        formData,
        {
          headers: { 'client-id': '00-nike' },
        }
      );
      // 4. 로그인 성공 메세지 출력
      console.log(res);
      alert(res.data.item.name + '님 환영합니다.');
    } catch (err) {
      // 5. 로그인 실패 메세지 출력
      console.error(err);
      if (err.response) {
        // API 서버에서 에러 전송(4xx, 5xx)
        alert(err.response.data.errors?.[0].msg || err.response.data.message);
      } else {
        alert(
          '일시적으로 서버에 접속할 수 없습니다.\n잠시 후 다시 이용해 주시기 바랍니다.'
        );
      }
    }
  };

  return (
    // 1. JSX 작성
    <>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          {...register('email', { required: '이메일을 입력하세요.' })}
        />
        <div>{errors.email?.message}</div>
        <br />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: '비밀번호를 입력하세요.' })}
        />
        <br />
        <div>{errors.password?.message}</div>
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default App;
