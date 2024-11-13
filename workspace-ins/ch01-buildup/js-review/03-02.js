var item = { no: 1, todo: '두부', done: true };

// 1. 대입 연산자로 newItem 생성
var newItem = item;

// 2. Object.assing() 사용해서 속성 추가
// Object.assign(target, ...source)
var newItem = Object.assign();

// item, newItem 비교
newItem.done = false;
console.log(item, newItem);
console.log('같은 객체인가?', item === newItem);