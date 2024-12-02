function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="input" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="input" required />
        </div>
        <button type="button">회원가입</button>
        <button type="button">카카오 로그인</button>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;