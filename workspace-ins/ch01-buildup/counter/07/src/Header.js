import Yong from '../yong.js';

function Header(){
  return (
    Yong.createElement('header', null, 
      Yong.createElement('h1', null, 'Counter - 컴포넌트 모듈화'), 
      Yong.createElement('p', null, '파일 경로: ', 
        Yong.createElement('span', { id: 'filepath' }, `ch${document.URL.split('/ch')[1]}index.html`))) 
  );
}

export default Header;