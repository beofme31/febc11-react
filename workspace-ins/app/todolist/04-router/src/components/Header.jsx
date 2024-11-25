import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Todo List</h1>
      <nav>
        <div>
          <ul>
            <li><NavLink to="home" className={ ({ isActive }) => isActive ? 'menu-dark' : 'menu' }>Home</NavLink></li>
            <li><NavLink to="about" className={ ({ isActive }) => isActive ? 'menu-dark' : 'menu' }>About</NavLink></li>
            <li><NavLink to="list" className={ ({ isActive }) => isActive ? 'menu-dark' : 'menu' }>TodoList</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;