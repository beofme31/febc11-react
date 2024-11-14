import Message from "./components/Message";
function App() {
  return (
    <>
      <h3>01 state 대신 컴포넌트 외부의 변수(모듈 스코프 변수) 사용시 문제점</h3>
      <Message />
      <Message />
    </>
  );
}
export default App
