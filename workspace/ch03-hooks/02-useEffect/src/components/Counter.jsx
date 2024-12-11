import { useEffect, useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = '0' }){
  
  console.log('Counter 렌더링');

  const initCount = Number(children);
  const [count, setCount] = useState(initCount);
  const [step, setStep] = useState(1);

  const handleDown = () => {
    setCount(count - step);
  };

  const handleUp = () => {
    setCount(count + step);
  };

  const handleReset = event => {
    setCount(initCount);
  };

  // 1초 후에 자동으로 값 한번 증가
  // 시키고 싶었는데 무한 렌더링 발생
  // setTimeout(() => {
  //   handleUp();
  // }, 1000);

  // 마운트 된 후에 값 증가
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('dependencies에 빈배열을 지정하면 컴포넌트가 마운트된 후에 한번만 호출됨(업데이트 후에는 호출되지 않음)');
  // }, []);

  // 마운트 된 후와 업데이트 된 후에 값 증가
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('dependencies를 지정하지 않으면 컴포넌트가 마운트 된 후와 업데이트 된 후에 호출됨');
  // });


  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('dependencies에 값을 지정하면 컴포넌트가 업데이트 될때 지정한 값중 하나라도 수정되었을 경우 호출됨');
  // }, [step]);


  useEffect(() => { // setup
    console.log('setup 함수 호출.');
    const timer = setInterval(() => {
      console.log(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    }; // cleanup
  }, []);

  // useEffect(() => {
  //   console.log(step, 'setup 함수 호출.');
  //   const timer = setInterval(() => {
  //     console.log(step, new Date());
  //   }, 1000);
  //   return () => {
  //     console.log(step, 'cleanup 함수 호출.');
  //     clearInterval(timer);
  //   };
  // }, [step]);

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      {/* 제어 컴포넌트 value, onChange 사용 */}
      <input id="step" type="number" style={{ width: '40px' }} value={ step } 
        onChange={ e => setStep(Number(e.target.value)) } />
      <Button color="red" onClick={ handleDown }>-</Button>
      <Button onClick={ handleReset }>{ initCount }</Button>
      <Button color="blue" onClick={ handleUp }>+</Button>
      <span>{ count }</span>
    </div>
  );
}

export default Counter;