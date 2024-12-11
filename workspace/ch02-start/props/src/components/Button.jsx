import './Button.css';

export default function Button({ children, type="button", onClick: clickHandler, color }){
  return <button className="rounded-button" style={{ backgroundColor: color }} type={ type } onClick={ clickHandler }>{ children }</button>
}