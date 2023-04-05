import { Dispatch, SetStateAction } from "react";

export default interface UtilModel {
  progressBar: SetStateAction<boolean>;
  setProgressBar: Dispatch<SetStateAction<boolean>>;
  /* authViewCenter: SetStateAction<boolean>;
  setAuthViewCenter: Dispatch<SetStateAction<boolean>>; */
}
