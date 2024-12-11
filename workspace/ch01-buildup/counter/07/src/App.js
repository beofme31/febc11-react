import Yong from '../yong.js';
import Counter from './Counter.js';
import Header from './Header.js';

// 애플리케이션의 시작점
function App(){
  return (
    Yong.createElement('div', { id: 'app' }, Header, Counter)
  );
}

export default App;