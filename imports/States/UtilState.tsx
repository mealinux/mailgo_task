import { create } from "zustand";

export const useUtilState = create((set) => ({
  progressBar: false,
  setProgressBar: (progressBar: boolean) => set({ progressBar }),
}));
