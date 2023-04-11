import React, { Dispatch, ReactElement, SetStateAction } from "react";

import { Flex } from "@chakra-ui/react";
import { DeleteButtonCom } from "/imports/ui/components/DataTableCom/Buttons/DeleteButtonCom";
import EditButtonCom from "/imports/ui/components/DataTableCom/Buttons/EditButtonCom";
import { FaTrash, FaUndoAlt } from "react-icons/fa";
import { ActionEnum } from "/imports/ui/constants/ActionEnum";
import CategoryModel from "/imports/models/CategoryModel";

export const CategoriesData = (props: {
  data: Array<CategoryModel>;
  totalCount: number;
  onOpen: VoidFunction;
  handleChangeDataTable?: CallableFunction;
  setModalTitle: Dispatch<SetStateAction<string>>;
  setModalButtonText: Dispatch<SetStateAction<string>>;
  setModalIcon: Dispatch<SetStateAction<ReactElement>>;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setActionType: Dispatch<SetStateAction<ActionEnum>>;
  setSelectedCategory: Dispatch<SetStateAction<CategoryModel>>;
}) => {
  let dataCategories: any = [];

  props!.data.forEach((category: CategoryModel) => {
    dataCategories.push({
      category,
      actions: (
        <Flex gap={4}>
          <EditButtonCom
            onClick={() => {
              props.setName(category.name);
              props.setDescription(category.description);

              props.setModalTitle("Edit The Category");
              props.setModalButtonText("UPDATE");
              props.setModalIcon(<FaUndoAlt />);

              props.setActionType(ActionEnum.UPDATE);

              props.setSelectedCategory(category);

              props.onOpen();
            }}
          />
          <DeleteButtonCom
            onClick={() => {
              props.setName(category.name);
              props.setDescription(category.description);

              props.setModalTitle("Delete The Category");
              props.setModalButtonText("DELETE");
              props.setModalIcon(<FaTrash />);

              props.setActionType(ActionEnum.DELETE);

              props.setSelectedCategory(category);

              props.onOpen();
            }}
          />
        </Flex>
      ),
    });
  });

  return { categories: dataCategories, totalCount: props.totalCount };
};
