import { useRef } from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import useCounter from "@hooks/useCounter";

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = '0' }){
  const initCount = Number(children);
  const step = useRef(1); // { current: 1 } 반환
  const { count, up, down, reset } = useCounter(initCount);

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      {/* 비제어 컴포넌트 value, onChange 사용 */}
      <input id="step" type="number" style={{ width: '40px' }} defaultValue={ step.current }
        onChange={ e => step.current = Number(e.target.value) } />
      <Button color="red" onClick={ () => down(step.current) }>-</Button>
      <Button onClick={ () => reset(initCount) }>{ initCount }</Button>
      <Button color="blue" onClick={ () => up(step.current) }>+</Button>
      <span>{ count }</span>
    </div>
  );
}

export default Counter;