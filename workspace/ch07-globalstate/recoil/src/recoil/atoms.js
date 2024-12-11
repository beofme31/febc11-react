import { atom } from "recoil";

export const counterState = atom({
  key: 'count', // atom 식별자로 모든 atom에서 고유해야 함
  default: 8,
});

export const loginState = atom({
  key: 'loginUser', // atom 식별자로 모든 atom에서 고유해야 함
  default: null,
});