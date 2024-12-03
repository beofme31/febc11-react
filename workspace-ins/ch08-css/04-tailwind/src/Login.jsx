import Button from '@components/Button';

function Login() {
  return (
    <div className="w-72 mt-[50px] mx-auto p-5 border border-gray-300 rounded-lg shadow-md text-center">
      <h2 className="mb-5 text-xl font-bold">Login</h2>
      <form className="flex flex-col">
        <div className="mb-4 text-left">
          <label className="block mb-1" htmlFor="email">Email:</label>
          <input type="email" id="email" className="w-full p-2 border rounded-md text-red-500 bg-blue-500" required />
        </div>
        <div className="mb-4 text-left">
          <label className="block mb-1" htmlFor="password">Password:</label>
          <input type="password" id="password" className="w-full p-2 border rounded-md text-blue-500 bg-red-500" required />
        </div>
        <Button bg="gray" color="blue">회원가입</Button>
        <Button bg="yellow" color="red">카카오 로그인</Button>
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
};

export default Login;