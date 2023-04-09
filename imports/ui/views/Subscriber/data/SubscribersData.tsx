import React, { Dispatch, ReactElement, SetStateAction } from "react";

import { Flex } from "@chakra-ui/react";
import { DeleteButtonCom } from "/imports/ui/components/DataTableCom/Buttons/DeleteButtonCom";
import EditButtonCom from "/imports/ui/components/DataTableCom/Buttons/EditButtonCom";
import SubscriberModel from "/imports/models/SubscriberModel";
import { FaTrash, FaUndoAlt } from "react-icons/fa";
import { ActionEnum } from "/imports/ui/constants/ActionEnum";

export const SubscribersData = (props: {
  data: Array<SubscriberModel>;
  totalCount: number;
  onOpen: VoidFunction;
  handleChangeDataTable?: CallableFunction;
  setModalTitle: Dispatch<SetStateAction<string>>;
  setModalButtonText: Dispatch<SetStateAction<string>>;
  setModalIcon: Dispatch<SetStateAction<ReactElement>>;
  setName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setActionType: Dispatch<SetStateAction<ActionEnum>>;
  setSelectedSubscriber: Dispatch<SetStateAction<SubscriberModel>>;
}) => {
  let dataSubscribers: any = [];

  props!.data.forEach((subscribe: SubscriberModel) => {
    dataSubscribers.push({
      subscribe,
      actions: (
        <Flex gap={4}>
          <EditButtonCom
            onClick={() => {
              props.setName(subscribe.name);
              props.setLastName(subscribe.last_name);
              props.setEmail(subscribe.email);

              props.setModalTitle("Edit The Subscriber");
              props.setModalButtonText("UPDATE");
              props.setModalIcon(<FaUndoAlt />);

              props.setActionType(ActionEnum.UPDATE);

              props.setSelectedSubscriber(subscribe);

              props.onOpen();
            }}
          />
          <DeleteButtonCom
            onClick={() => {
              props.setName(subscribe.name);
              props.setLastName(subscribe.last_name);
              props.setEmail(subscribe.email);

              props.setModalTitle("Delete The Subscriber");
              props.setModalButtonText("DELETE");
              props.setModalIcon(<FaTrash />);

              props.setActionType(ActionEnum.DELETE);

              props.setSelectedSubscriber(subscribe);

              props.onOpen();
            }}
          />
        </Flex>
      ),
    });
  });

  return { subscribers: dataSubscribers, totalCount: props.totalCount };
};
