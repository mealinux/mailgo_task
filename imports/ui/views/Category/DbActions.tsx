import { Dispatch, SetStateAction } from "react";
import { ActionEnum } from "../../constants/ActionEnum";
import { AddOperation } from "./DbOperations/AddOperation";
import { DeleteOperation } from "./DbOperations/DeleteOperation";
import { UpdateOperation } from "./DbOperations/UpdateOperation";
import CategoryModel from "/imports/models/CategoryModel";

export const DbActions = (props: {
  data: {
    isOpen: boolean;
    onOpen: any;
    onClose: any;
    handleChangeDataTable: VoidFunction;
    actionType: ActionEnum;
  };
  category?: CategoryModel;
  newCategoryData?: {
    name: string;
    description: string;
  };
  setName?: Dispatch<SetStateAction<string>>;
  setDescription?: Dispatch<SetStateAction<string>>;
}): any => {
  switch (props.data.actionType) {
    case ActionEnum.ADD:
      AddOperation({
        onClose: props.data.onClose,
        newCategoryData: props.newCategoryData!,
        handleChangeDataTable: props.data.handleChangeDataTable,
      });
      break;
    case ActionEnum.UPDATE:
      UpdateOperation({
        onClose: props.data.onClose,
        handleChangeDataTable: props.data.handleChangeDataTable,
        category: props.category!,
        newCategoryData: props.newCategoryData!,
      });
      break;
    case ActionEnum.DELETE:
      DeleteOperation({
        onClose: props.data.onClose,
        handleChangeDataTable: props.data.handleChangeDataTable,
        category: props.category!,
      });
      break;
    default:
      break;
  }
};
