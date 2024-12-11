import yong from "../../../yong.js";
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

// 할일 구성
function Todo(props){
  return (
    yong.createElement('div', { id: 'main' }, 
      yong.createElement('div', { id: 'container' }, 
        yong.createElement('ul', null, 
          yong.createElement('li', null, 
            yong.createElement('h2', null, '쇼핑 목록'), 
            TodoInput({ handleAdd: props.handleAdd, handleAddKeyup: props.handleAddKeyup }),
            TodoList({ itemList: props.itemList, toggleDone: props.toggleDone, deleteItem: props.deleteItem })))))
  );
}

export default Todo;