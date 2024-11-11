import yong from "../../../yong.js";
import Header from "../components/Header.js";
import Todo from "./Todo.js";
import Footer from '../components/Footer.js';

// Application 루트 컴포넌트
function App(){
  // 샘플 목록
  // let itemList = [
  //   { no: 1, title: '두부', done: true} ,
  //   { no: 2, title: '계란', done: false },
  //   { no: 3, title: '라면', done: true },
  // ];

  const [itemList, setItemList] = yong.useState([
    { no: 1, title: '두부', done: true} ,
    { no: 2, title: '계란', done: false },
    { no: 3, title: '라면', done: true },
  ]);

  // "추가" 클릭 이벤트 핸들러
  const handleAdd = () => {
    const inputElem = document.querySelector('.todoinput > input');
    if(inputElem.value.trim() !== ''){
      addItem(inputElem.value);
      inputElem.value = '';
      inputElem.focus();
    }
  };

  // 엔터 이벤트 핸들러
  const handleAddKeyup = (event) => {
    if(event.key === 'Enter') handleAdd();
  };

  // 할일 추가
  function addItem(title){
    const item = {
      no: itemList[itemList.length-1].no + 1,
      title,
      done: false,
    };

    // TODO: 데이터 갱신
    const newItemList = [ ...itemList, item ];
    setItemList(newItemList);
  }

  // 완료/미완료 처리
  function toggleDone(no){
    // TODO: 데이터 갱신
    const newItemList = [ ...itemList ];

    let selectedItem = newItemList.find(item => item.no === no);
    selectedItem.done = !selectedItem.done;

    setItemList(newItemList);
  }

  // 할일 삭제
  function deleteItem(no){
    // TODO: 데이터 갱신
    const newItemList = itemList.filter(item => item.no !== no);
    setItemList(newItemList);
  }

  return yong.createElement('div', { id: 'todo' }, Header, Todo({ handleAdd, handleAddKeyup, itemList, toggleDone, deleteItem }), Footer);
}

export default App;