import { Dispatch } from "react";

export default interface UtilModel {
  progressBar: boolean;
  setProgressBar: Dispatch<boolean>;
  /* authViewCenter: SetStateAction<boolean>;
  setAuthViewCenter: Dispatch<SetStateAction<boolean>>; */
}
