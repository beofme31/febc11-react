import { counterAtom } from '@jotai/atoms';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

function Right3() {
  useEffect(()=>{
    console.log('      # Right3 렌더링.');
  });

  // getter/setter 모두 사용(구독)
  // const [count, setCount] = useAtom(counterAtom);
  // const countUp = function(step){
  //   setCount(count + step);
  // };

  // setter만 사용(구독하지 않음)
  const setCount = useSetAtom(counterAtom);

  const countUp = function(step){
    setCount((count) => count + step);
  };
  const countDown = function(step){
    setCount((count) => count - step);
  };
  const reset = function(){
    setCount(0);
  };

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={ () => countDown(1) }>-1</button>
      <button onClick={ () => reset() }>0</button>
      <button onClick={ () => countUp(2) }>+2</button>
    </div>
  );
}

export default Right3;