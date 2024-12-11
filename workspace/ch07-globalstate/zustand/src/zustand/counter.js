import { create } from "zustand";

const useCounterState = create((set, get) => ({
  count: 6,

  countUp: (step) => {
    const newState = { count: get().count + step };
    set(newState);
  },

}));

export default useCounterState;