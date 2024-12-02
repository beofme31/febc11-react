import { counterState } from '@recoil/atoms';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

function Right3() {
  useEffect(()=>{
    console.log('      # Right3 렌더링.');
  });

  // getter/setter 모두 사용(구독)
  // const [count, setCount] = useRecoilState(counterState);
  // const countUp = (step) => {
  //   setCount(count + step);
  // };

  // setter 사용(구독하지 않음)
  const setCount = useSetRecoilState(counterState);
  const countUp = (step) => {
    setCount((count) => count + step);
  };

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={ () => countUp(1) }>+1</button>
    </div>
  );
}

export default Right3;