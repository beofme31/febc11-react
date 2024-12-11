import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(persist((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}), {
  name: 'user',
  storage: createJSONStorage(() => sessionStorage) // 기본은 localStorage
}));

export default useUserStore;