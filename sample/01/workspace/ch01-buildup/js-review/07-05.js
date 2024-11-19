// Array.prototype.reduce(callback, initialValue): 배열의 각 요소에 대해 콜백 함수를 실행
// 최종 누적값을 반환
// callback 함수는 누적값(accumulator), 현재값(currentValue), 현재 인덱스(index), 그리고 배열(array)을 매개변수로 받음
// 초기값(initialValue)이 주어지면 누적값의 초기값으로 사용하고 
// 초기값이 주어지지 않으면 배열의 첫번째 요소가 누적값의 초기값으로 사용되고 두번째 요소부터 콜백 함수가 실행

// 배열 요소중 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

console.log(result);