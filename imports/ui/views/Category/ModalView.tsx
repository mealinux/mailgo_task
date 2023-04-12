import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import { ColorsEnum } from "../../constants/ColorsEnum";

import ModalUtil from "../../utils/ModalUtil";
import { ActionEnum } from "../../constants/ActionEnum";
import { DbActions } from "./DbActions";

import CategoryModel from "/imports/models/CategoryModel";

const ModalView = (props: {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  handleChangeDataTable: VoidFunction;
  actionType: ActionEnum;
  name: string;
  description: string;
  modalTitle: string;
  modalButtonText: string;
  modalIcon: ReactElement;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  selectedCategory: CategoryModel;
}) => {
  return props.actionType != ActionEnum.DELETE ? (
    <ModalUtil
      onClickAdd={() =>
        DbActions({
          data: props,
          category: props.selectedCategory,
          newCategoryData: {
            name: props.name,
            description: props.description,
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
        <Input
          value={props.name}
          placeholder="Category Name"
          size="md"
          htmlSize={30}
          mb={4}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setName(event.target.value)}
        />
        <Input
          value={props.description}
          placeholder="Description"
          size="md"
          htmlSize={30}
          mb={4}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setDescription(event.target.value)}
        />
      </Flex>
    </ModalUtil>
  ) : (
    <ModalUtil
      onClickAdd={() =>
        DbActions({
          category: props.selectedCategory,
          data: props,
        })
      }
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      title={props.modalTitle}
      buttonText={props.modalButtonText}
      icon={props.modalIcon}
    >
      <Flex flexDirection={"column"}>
        <Text color={ColorsEnum.BLUE}>
          {props.selectedCategory.name +
            " " +
            props.selectedCategory.description}
        </Text>
        <Text>named category will delete, Are you sure?</Text>
      </Flex>
    </ModalUtil>
  );
};

export default ModalView;
