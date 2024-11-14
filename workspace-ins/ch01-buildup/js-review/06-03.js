// 06-02.js 복사
function f1(callback){
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);

  setTimeout(() => {
    // ......
    console.log(`4. f1 작업 종료.`);
    callback(`f1의 결과물`);
  }, 1000);
  
}

function f2(f1Result, callback){
  console.log(`5. ${f1Result}로 f2 작업 시작.`);
  console.log(`6. f2 작업중...`);

  setTimeout(() => {
    // ......
    console.log(`7. f2 작업 종료.`);
    callback(`최종 결과물`);
  }, Math.random() * 2000);
}

function test(){
  f1((f1Result) => {
    f2(f1Result, (result) => {
      console.log('8.', result);
    });
  });
}

console.log('1. 테스트 시작.');
test();
console.log('9. 테스트 완료.');
