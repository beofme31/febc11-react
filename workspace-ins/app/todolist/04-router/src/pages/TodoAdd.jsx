import { Link } from "react-router-dom";

function TodoAdd() {
  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <form>
          <label htmlFor="title">제목 :</label>
          <input type="text" id="title" autoFocus />
          <br/>
          <label htmlFor="content">내용 :</label>
          <textarea id="content" cols="23" rows="5"></textarea>
          <br/>
          <Link to="/list/1">추가</Link>
          <Link to="/list">취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;