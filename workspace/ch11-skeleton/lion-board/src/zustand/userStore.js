// create: Zustand에서 상태 관리 스토어를 생성하는 함수
import { create } from "zustand";
// persist: Zustand 상태를 브라우저 저장소(로컬/세션)에 저장하거나 복원하는 미들웨어
// 미들웨어: 두 시스템(or 컴포넌트) 중간에서 동작하는 소프트웨어, 데이터를 가공하거나 처리 흐름을 관리하는 역할
// createJSONStorage: 저장소를 JSON 형식으로 관리리
import { persist, createJSONStorage } from "zustand/middleware";

const UserStore = (set) => ({
  // 현재 로그인한 사용자 정보를 저장, 초기값은 null
  user: null,
  // 전달받은 사용자 정보를 상태에 저장하는 함수(로그인 성공 시 호출)
  setUser: (user) => set({ user }),
  // 사용자 정보를 null로 초기화하여 로그아웃 처리
  resetUser: () => set({ user: null }),
});

// 스토리지를 사용하지 않을 경우
// const useUserStore = create(UserStore);

// 스토리지를 사용할 경우
const useUserStore = create(
  persist(UserStore, {
    name: "user",
    storage: createJSONStorage(() => sessionStorage), // 기본은 localStorage
  })
);

export default useUserStore;
