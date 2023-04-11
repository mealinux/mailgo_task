import { Dispatch, SetStateAction } from "react";
import { ActionEnum } from "../../constants/ActionEnum";
import { AddOperation } from "./DbOperations/AddOperation";
import { DeleteOperation } from "./DbOperations/DeleteOperation";
import { UpdateOperation } from "./DbOperations/UpdateOperation";
import CampaignModel from "/imports/models/CampaignModel";

export const Actions = (props: {
  actionData: {
    data: {
      isOpen: boolean;
      onOpen: any;
      onClose: any;
      handleChangeDataTable: VoidFunction;
      actionType: ActionEnum;
    };
    campaign?: CampaignModel;
    newCampaignData?: {
      name: string;
      description?: string;
      target: string;
    };
    selectedCategoryId?: string;
    setName?: Dispatch<SetStateAction<string>>;
    setDescription?: Dispatch<SetStateAction<string>>;
    setTarget?: Dispatch<SetStateAction<string>>;
  };
  mailSend?: boolean;
}): any => {
  switch (props.actionData.data.actionType) {
    case ActionEnum.ADD:
      AddOperation({
        onClose: props.actionData.data.onClose,
        newCampaignData: props.actionData.newCampaignData!,
        handleChangeDataTable: props.actionData.data.handleChangeDataTable,
        selectedCategoryId: props.actionData.selectedCategoryId!,
      });
      break;
    case ActionEnum.UPDATE:
      UpdateOperation({
        onClose: props.actionData.data.onClose,
        handleChangeDataTable: props.actionData.data.handleChangeDataTable,
        campaign: props.actionData.campaign!,
        newCampaignData: props.actionData.newCampaignData!,
        selectedCategoryId: props.actionData.selectedCategoryId!,
      });
      break;
    case ActionEnum.DELETE:
      DeleteOperation({
        onClose: props.actionData.data.onClose,
        handleChangeDataTable: props.actionData.data.handleChangeDataTable,
        campaign: props.actionData.campaign!,
      });
      break;
    default:
      break;
  }
};
