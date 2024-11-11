import yong from "../../../yong.js";
import TodoItem from './TodoItem.js';

// 할일 목록 구성
function TodoList(props){
  const list = props.itemList.map((item) => TodoItem({ item, toggleDone: props.toggleDone, deleteItem: props.deleteItem }));
  return yong.createElement('ul', { class: 'todolist' }, list);
}

export default TodoList;