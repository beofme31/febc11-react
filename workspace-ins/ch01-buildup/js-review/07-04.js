// Array.prototype.filter(callback): 배열의 각 요소에 대해 콜백 함수를 실행
// callback(elem, index)
// true를 반환하는 콜백 함수에 전달된 요소를 배열로 모아서 반환
// true를 반환하는 콜백 함수가 없을 경우 빈 배열을 반환

// 배열 요소중 홀수의 합계 구하기
var array = [6,7,8,1,4,5,2,3,9,10];

var result = 0;

array.filter(num => num % 2 !== 0).forEach(num => result += num);

console.log(result); // 25