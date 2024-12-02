import './App.css';

function App(){
  return (
    <>
      <h1>CSS import 사용</h1>
      <button type="button" className="button">그냥 버튼</button>
      <button type="button" className="button color-blue-red">파란 배경의 빨간 글자</button>
      <button type="button" className="button color-yellow-red">노란 배경의 빨간 글자</button>
      <button type="button" className="button color-gray-blue">회색 배경의 파란 글자</button>
    </>
  );
}

export default App;