import yong from "../../../yong.js";

// 입력창 구성
function TodoInput({ handleAdd, handleAddKeyup }){
  return (
    yong.createElement('div', { class: 'todoinput' }, 
      yong.createElement('input', { type: 'text', autofocus: '', onkeyup: event => handleAddKeyup(event) }), 
      yong.createElement('button', { type: 'button', onclick: handleAdd }, '추가'))
  );
}

export default TodoInput;