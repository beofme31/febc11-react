import { create } from "zustand";
import { persist } from "zustand/middleware";

// set: Zustand에서 상태를 업데이트하는 함수
const ThemeStore = (set) => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
});

const useThemeStore = create(
  persist(ThemeStore, {
    name: "themeStore",
  })
);

export default useThemeStore;
