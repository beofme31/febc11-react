import CounterContext from '@context/CounterContext';
import { useContext, useEffect } from 'react';

function Left3() {
  useEffect(()=>{
    console.log('      # Left3 렌더링.');
  });

  // CounterContext 구독
  const { state: { count } } = useContext(CounterContext);

  return (
    <div>
      <h3>Left3</h3>
      <span>{ count }</span>
    </div>
  );
}

export default Left3;