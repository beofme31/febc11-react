import { useState } from "react";

function App() {
  // 상태 관리
  const [message, setMessage] = useState('');

  return (
    <>
      <h1>01 useState - 상태 관리</h1>
      <div>
        <input type="text" value={ message } onChange={ (event) => setMessage(event.target.value) }/>
        <br/>
        <span>입력 메세지: { message }</span>
      </div>
    </>
  );
}

export default App
