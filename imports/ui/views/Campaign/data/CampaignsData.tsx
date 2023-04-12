import React, { Dispatch, ReactElement, SetStateAction } from "react";

import { Flex } from "@chakra-ui/react";
import { DeleteButtonCom } from "/imports/ui/components/DataTableCom/Buttons/DeleteButtonCom";
import EditButtonCom from "/imports/ui/components/DataTableCom/Buttons/EditButtonCom";
import { FaTrash, FaUndoAlt } from "react-icons/fa";
import { ActionEnum } from "/imports/ui/constants/ActionEnum";
import CampaignModel from "/imports/models/CampaignModel";

export const CampaignsData = (props: {
  data: Array<CampaignModel>;
  totalCount: number;
  onOpen: VoidFunction;
  handleChangeDataTable?: CallableFunction;
  setModalTitle: Dispatch<SetStateAction<string>>;
  setModalButtonText: Dispatch<SetStateAction<string>>;
  setModalIcon: Dispatch<SetStateAction<ReactElement>>;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setTarget: Dispatch<SetStateAction<string>>;
  setActionType: Dispatch<SetStateAction<ActionEnum>>;
  setSelectedCampaign: Dispatch<SetStateAction<CampaignModel>>;
  setSelectedCategoryId: Dispatch<SetStateAction<string>>;
}) => {
  let dataCampaigns: any = [];

  props!.data.forEach((campaign: CampaignModel) => {
    dataCampaigns.push({
      campaign,
      actions: (
        <Flex gap={4}>
          <EditButtonCom
            onClick={() => {
              props.setName(campaign.name);
              props.setDescription(campaign.description);
              props.setTarget(campaign.target);

              props.setModalTitle("Edit The Campaign");
              props.setModalButtonText("UPDATE");
              props.setModalIcon(<FaUndoAlt />);

              props.setActionType(ActionEnum.UPDATE);

              props.setSelectedCampaign(campaign);

              props.setSelectedCategoryId(campaign.category._id);

              props.onOpen();
            }}
          />
          <DeleteButtonCom
            onClick={() => {
              props.setName(campaign.name);
              props.setDescription(campaign.description!);
              props.setTarget(campaign.target);

              props.setModalTitle("Delete The Campaign");
              props.setModalButtonText("DELETE");
              props.setModalIcon(<FaTrash />);

              props.setActionType(ActionEnum.DELETE);

              props.setSelectedCampaign(campaign);

              props.onOpen();
            }}
          />
        </Flex>
      ),
    });
  });

  return { campaigns: dataCampaigns, totalCount: props.totalCount };
};
