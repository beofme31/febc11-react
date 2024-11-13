var itemList = [
  { no: 1, todo: '두부', done: false },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: false },
];

// 1. 대입 연산자
var newItemList = itemList;

// 2. 전개 연산자를 이용한 복사(얕은 복사)
var newItemList = [ ...itemList ];

// 3. 객체를 속성으로 가질 경우 깊은 복사를 위해서는 속성도 새로운 객체로 복사해야 함(불변성을 지키기 위해서)
newItemList[1] = { ...itemList[1] };

// itemList, newItemList 비교
newItemList[1].done = true;
console.log(itemList, newItemList);
console.log(itemList === newItemList);
console.log(itemList[1] === newItemList[1]);