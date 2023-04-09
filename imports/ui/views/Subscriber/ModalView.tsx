import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import { ColorsEnum } from "../../constants/ColorsEnum";

import ModalUtil from "../../utils/ModalUtil";
import { ActionEnum } from "../../constants/ActionEnum";
import { Actions } from "./Actions";
import SubscriberModel from "/imports/models/SubscriberModel";

const ModalView = (props: {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  handleChangeDataTable: VoidFunction;
  actionType: ActionEnum;
  name: string;
  last_name: string;
  email: string;
  modalTitle: string;
  modalButtonText: string;
  modalIcon: ReactElement;
  setName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  selectedSubscriber: SubscriberModel;
}) => {
  return props.actionType != ActionEnum.DELETE ? (
    <ModalUtil
      onClick={() =>
        Actions({
          data: props,
          subscriber: props.selectedSubscriber,
          newSubscriberData: {
            name: props.name,
            last_name: props.last_name,
            email: props.email,
          },
        })
      }
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      onOpen={props.onOpen}
      title={props.modalTitle}
      buttonText={props.modalButtonText}
      icon={props.modalIcon}
    >
      <Flex flexDirection={"column"}>
        <Input
          value={props.name}
          placeholder="First Name"
          size="md"
          htmlSize={30}
          mb={4}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setName(event.target.value)}
        />
        <Input
          value={props.last_name}
          placeholder="Last Name"
          size="md"
          htmlSize={30}
          mb={4}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setLastName(event.target.value)}
        />
        <Input
          value={props.email}
          placeholder="E-Mail"
          size="md"
          htmlSize={30}
          width={"auto"}
          bg={ColorsEnum.WHITE}
          onChange={(event) => props.setEmail(event.target.value)}
        />
      </Flex>
    </ModalUtil>
  ) : (
    <ModalUtil
      onClick={() =>
        Actions({
          subscriber: props.selectedSubscriber,
          data: props,
        })
      }
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      onOpen={props.onOpen}
      title={props.modalTitle}
      buttonText={props.modalButtonText}
      icon={props.modalIcon}
    >
      <Flex flexDirection={"column"}>
        <Text color={ColorsEnum.BLUE}>
          {props.selectedSubscriber.name +
            " " +
            props.selectedSubscriber.last_name}
        </Text>
        <Text>named user will delete, Are you sure?</Text>
      </Flex>
    </ModalUtil>
  );
};

export default ModalView;
