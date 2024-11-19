var item = { no: 1, todo: '두부', done: true };

// 1. 대입 연산자
var newItem = item;

// 2. Object.assign 사용해서 속성 추가
// Object.assign(target, ...source): target 객체에 source 객체들의 속성을 추가함


// 3. item의 속성으로 새로운 객체 생성


// 4. 전개 연산자를 이용한 복사


// item, newItem 비교
newItem.done = false;
console.log(item, newItem);
console.log('같은 객체인가?', item === newItem);