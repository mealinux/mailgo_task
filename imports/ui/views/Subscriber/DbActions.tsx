import { Dispatch, SetStateAction } from "react";
import { ActionEnum } from "../../constants/ActionEnum";
import { AddOperation } from "./DbOperations/AddOperation";
import { DeleteOperation } from "./DbOperations/DeleteOperation";
import { UpdateOperation } from "./DbOperations/UpdateOperation";
import SubscriberModel from "/imports/models/SubscriberModel";

export const DbActions = (props: {
  data: {
    isOpen: boolean;
    onOpen: any;
    onClose: any;
    handleChangeDataTable: VoidFunction;
    actionType: ActionEnum;
  };
  subscriber?: SubscriberModel;
  newSubscriberData?: {
    name: string;
    last_name: string;
    email: string;
  };
  setName?: Dispatch<SetStateAction<string>>;
  setLastName?: Dispatch<SetStateAction<string>>;
  setEmail?: Dispatch<SetStateAction<string>>;
}): any => {
  switch (props.data.actionType) {
    case ActionEnum.ADD:
      AddOperation({
        onClose: props.data.onClose,
        newSubscriberData: props.newSubscriberData!,
        handleChangeDataTable: props.data.handleChangeDataTable,
      });
      break;
    case ActionEnum.UPDATE:
      UpdateOperation({
        onClose: props.data.onClose,
        handleChangeDataTable: props.data.handleChangeDataTable,
        subscriber: props.subscriber!,
        newSubscriberData: props.newSubscriberData!,
      });
      break;
    case ActionEnum.DELETE:
      DeleteOperation({
        onClose: props.data.onClose,
        handleChangeDataTable: props.data.handleChangeDataTable,
        subscriber: props.subscriber!,
      });
      break;
    default:
      break;
  }
};
