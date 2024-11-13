var item = { no: 1, todo: '두부', done: true };

// 1. 대입 연산자로 newItem 생성
var newItem = item;

// 2. Object.assign() 사용해서 속성 추가
// Object.assign(target, ...source): target 객체에 source 객체들의 속성을 추가해서 target을 반환
var newItem = Object.assign(item, { delete: true });
var newItem = Object.assign({}, item, { delete: true });

// 3. item의 속성으로 새로운 객체 생성
var newItem = { no: item.no, done: item.done, todo: item.todo };

// 4. 전개 연산자를 이용한 복사
var newItem = { ...item, done: false };

// item, newItem 비교
// newItem.done = false;
console.log(item, newItem);
console.log('같은 객체인가?', item === newItem);