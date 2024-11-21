import Todo from "@pages/Todo";
import TodoReducer from "@pages/TodoReducer";
import { useReducer, useRef, useState } from "react";

function TodoContainer(){
  // 샘플 목록
  const sampleItemList = [
    { _id: 1, title: '두부', done: true} ,
    { _id: 2, title: '계란', done: false },
    { _id: 3, title: '라면', done: true },
    { _id: 4, title: '김치', done: true },
  ];

  const [itemList, itemListDispatch] = useReducer(TodoReducer, sampleItemList);
  // const [nextId, setNextId] = useState(sampleItemList.length+1);
  // useRef 수정
  const nextId = useRef(sampleItemList.length+1);

  // 할일 추가
  const addItem = (title) => {
    itemListDispatch({ type: 'ADD', value: { _id: nextId.current, title, done: false } });
    // setNextId(nextId + 1);
    nextId.current += 1;
  };

  // 할일 완료/미완료 처리
  const toggleDone = (_id) => {
    itemListDispatch({ type: 'TOGGLE', value: { _id } });
  };

  // 할일 삭제
  const deleteItem = (_id) => {
    itemListDispatch({ type: 'DELETE', value: { _id } });
  };

  return (
    <Todo itemList={ itemList } addItem={ addItem } toggleDone={ toggleDone } deleteItem={ deleteItem } />
  );

}

export default TodoContainer;