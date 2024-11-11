function TodoItem({ item }){
  return (
    <li>
      <span>{ item._id }</span>
      <span>{ item.done ? <s>{ item.title }</s> : item.title }</span>
      <button type="button">삭제</button>
    </li>
  );
}

export default TodoItem;