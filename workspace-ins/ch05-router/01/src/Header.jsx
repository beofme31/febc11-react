import Link from "./Link";

function Header() {
  return (
    <>
      <header>
        <h1>리액트 라우터 - 01 라우터 직접 구현</h1>
        <Link to="home.html">home</Link>
        <br/>
        <Link to="page1.html">page1</Link>
        <br/>
        <Link to="page2.html">page2</Link>
      </header>
    </>
  );
}

export default Header;