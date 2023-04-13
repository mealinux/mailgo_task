import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import SubscriberModel from "../models/SubscriberModel";

export interface UtilModel {
  progressBar: boolean;
  setProgressBar: Dispatch<SetStateAction<boolean>>;

  selectedSubscriber: SubscriberModel;
  setSelectedSubscriber: Dispatch<SetStateAction<SubscriberModel>>;
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

  const [selectedSubscriber, setSelectedSubscriber] = useState<SubscriberModel>(
    {} as SubscriberModel
  );

  const value: UtilModel = {
    progressBar,
    setProgressBar,
    selectedSubscriber,
    setSelectedSubscriber,
  };

  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
}
