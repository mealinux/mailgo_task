import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface UtilModel {
  progressBar: boolean;
  setProgressBar: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<UtilModel | null>(null);

export function useModal(): UtilModel {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContext Provider");
  }
  return context;
}

export function ModalProvider(props: PropsWithChildren<{}>) {
  const [progressBar, setProgressBar] = useState<any>({} as UtilModel);

  const value: UtilModel = {
    progressBar,
    setProgressBar,
  };

  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
}
