import Button from '@components/Button';
import Login from './Login';

function App(){
  return (
    <>
      <h1>04 TailWind CSS 사용</h1>

      <div className="w-52 mt-2 mx-auto">
        <Button>그냥 버튼</Button>
        <Button bg="blue" color="red">파란 배경의 빨간 글자</Button>
        <Button bg="yellow" color="red">노란 배경의 빨간 글자</Button>
        <Button bg="gray" color="blue">회색 배경의 파란 글자</Button>
        <button className="btn">일반 버튼</button>
        <button className="btn btn-primary">등록</button>
        <button className="btn btn-warn">삭제</button>
      </div>
      
      <Login />

    </>
  );
}

export default App;