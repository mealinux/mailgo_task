import { Dispatch, ReactElement } from "react";

export default interface UtilModel {
  modalTitle: string;
  setModalTitle: Dispatch<string>;
  modalMessage: string;
  setModalMessage: Dispatch<string>;
  modalIcon: ReactElement;
  setModalIcon: Dispatch<ReactElement>;
}
