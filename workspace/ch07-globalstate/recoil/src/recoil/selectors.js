import { counterState } from "@recoil/atoms";
import { selector } from "recoil";

export const counterStateKor = selector({
  key: 'korCount', // atom 식별자로 모든 atom에서 고유해야 함
  get: ({ get }) => {
    const count = get(counterState); // atom 값 추출
    return numberToKorean(count); // 추출한 atom 값을 기반으로 파생된 값을 반환
  },
});

function numberToKorean(number) {
  const koreanNumbers = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const koreanUnits = ['', '십', '백', '천'];

  const result = [];
  let idx = 0;
  let hasNonZero = false; // 0 이외의 숫자가 있는지 체크하기 위한 변수

  while (number > 0) {
      const digit = number % 10;
      const unit = koreanUnits[idx % 4];

      if (digit !== 0) {
          if (digit === 1 && unit !== '') { // 단위가 있고, 현재 자리수가 1인 경우에는 '일'을 생략
              result.unshift(unit);
          } else {
              result.unshift(koreanNumbers[digit] + unit);
          }
          hasNonZero = true; // 0 이외의 숫자가 있는 것을 표시
      } else if (hasNonZero && result[0] !== '백') { // 0 이외의 숫자가 있는 경우에만 일의 자리를 처리하고, '백'일 경우에는 생략
          result.unshift('영');
      }
      
      number = Math.floor(number / 10);
      idx++;
  }

  return result.join('');
}