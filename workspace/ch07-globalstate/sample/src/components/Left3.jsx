import { useEffect } from 'react';

function Left3() {
  useEffect(()=>{
    console.log('      # Left3 렌더링.');
  });
  return (
    <div>
      <h3>Left3</h3>
      <span>0</span>
    </div>
  );
}

export default Left3;