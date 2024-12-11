import { produce } from 'immer';

// state, action을 전달받고 새로운 state를 반환하는 순수 함수
function TodoReducer(state, action){ // ([{}, {}, {}], { type: 'ADD', value: { _id: 1, title: '두부', done: true } })
  const targetIndex = state.findIndex(item => item._id === action.value._id);
  let newState;

  switch(action.type){
    case 'ADD':
      newState = produce(state, draft => {
        draft.push(action.value);
      });
      break;
    case 'TOGGLE':
      newState = produce(state, draft => {
        draft[targetIndex].done = !draft[targetIndex].done;
      });
      break;
    case 'DELETE':
      newState = produce(state, draft => {
        draft.splice(targetIndex, 1);
      });
      break;
    default:
      newState = state;
  }
  return newState;
}

export default TodoReducer;