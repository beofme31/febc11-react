import Yong from '../yong.js';

function Counter(){
  // let count = 0;
  const [count, setCount] = Yong.useState(10);

  const handleDown = () => {
    setCount(count - 1);
  };
  const handleUp = () => {
    setCount(count + 1);
  };
  const handleReset = event => {
    setCount(0);
  };

  return (
    Yong.createElement('div', { id: 'counter' }, 
      Yong.createElement('button', { type: 'button', onclick: handleDown }, '-'), 
      Yong.createElement('button', { type: 'button', onclick: (event) => handleReset(event) }, 0), 
      Yong.createElement('button', { type: 'button', onclick: handleUp }, '+'), 
      Yong.createElement('span', null, count))
  );
}

export default Counter;