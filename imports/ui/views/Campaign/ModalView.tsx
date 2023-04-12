import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { ColorsEnum } from "../../constants/ColorsEnum";

import ModalUtil from "../../utils/ModalUtil";
import { ActionEnum } from "../../constants/ActionEnum";
import { DbActions } from "./DbActions";

import CampaignModel from "/imports/models/CampaignModel";
import CategoryModel from "/imports/models/CategoryModel";
import { Categories } from "./data/Categories";

const ModalView = (props: {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  handleChangeDataTable: VoidFunction;
  actionType: ActionEnum;
  name: string;
  description: string;
  target: string;
  modalTitle: string;
  modalButtonText: string;
  modalIcon: ReactElement;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setTarget: Dispatch<SetStateAction<string>>;
  selectedCampaign: CampaignModel;
  categories: Array<CategoryModel>;
  setSelectedCategoryId: Dispatch<SetStateAction<string>>;
  selectedCategoryId: string;
}) => {
  const actionData = {
    data: props,
    campaign: props.selectedCampaign,
    newCampaignData: {
      name: props.name,
      description: props.description,
      target: props.target,
    },
    selectedCategoryId: props.selectedCategoryId,
  };

  return props.actionType != ActionEnum.DELETE ? (
    <ModalUtil
      onClickAdd={() => DbActions({ actionData })}
      onClickAddAndSend={() => {
        DbActions({ actionData: actionData, mailSend: true });
      }}
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      title={props.modalTitle}
      buttonText={props.modalButtonText}
      icon={props.modalIcon}
      actionType={props.actionType}
    >
      <Flex flexDirection={"column"}>
        <Input
          value={props.name}
          placeholder="Campaign Name"
          size="md"
          htmlSize={30}
          mb={4}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setName(event.target.value)}
        />
        <Textarea
          value={props.description}
          placeholder="Description"
          size="md"
          mb={4}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setDescription(event.target.value)}
        />
        <Input
          value={props.target}
          placeholder="Target"
          size="md"
          htmlSize={30}
          mb={4}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setTarget(event.target.value)}
        />
        {props.categories ? (
          <Categories
            categories={props.categories}
            campaign={props.selectedCampaign}
            setSelectedCategoryId={props.setSelectedCategoryId}
          />
        ) : (
          <></>
        )}
      </Flex>
    </ModalUtil>
  ) : (
    <ModalUtil
      onClickAdd={() =>
        DbActions({
          actionData: {
            campaign: props.selectedCampaign,
            data: props,
          },
        })
      }
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      title={props.modalTitle}
      buttonText={props.modalButtonText}
      icon={props.modalIcon}
    >
      <Flex flexDirection={"column"}>
        <Text color={ColorsEnum.BLUE}>{props.selectedCampaign.name}</Text>
        <Text>named campaign will delete, Are you sure?</Text>
      </Flex>
    </ModalUtil>
  );
};

export default ModalView;
