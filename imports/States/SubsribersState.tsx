import { create } from "zustand";

export const useSubscriberState = create((set) => ({
  /* 
  -----------------------------------------------------
  start importModal states
  -----------------------------------------------------
  */
  importModalIsOpen: false,
  importModalOnOpen: false,
  setImportModalIsOpen: (importModalIsOpen: boolean) =>
    set({ importModalIsOpen }),
  setImportModalOnOpen: (importModalOnOpen: boolean) =>
    set({ importModalOnOpen }),

  importFile: "",
  setImportFile: (importFile: any) => set({ importFile }),
  importFileAlertMessage: false,
  setImportFileAlertMessage: (importFileAlertMessage: any) =>
    set({ importFileAlertMessage }),

  progressBarForDetailModal: false,
  setProgressBarForDetailModal: (setProgressBarForDetailModal: Boolean) =>
    set({ setProgressBarForDetailModal }),
  /* 
  -----------------------------------------------------
  end importModal states
  -----------------------------------------------------
  */
}));
