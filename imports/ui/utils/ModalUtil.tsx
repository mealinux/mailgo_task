import React, { ReactElement, useContext, useReducer } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import OutlineButtonCom from "../components/OutlineButtonCom";
import { ColorsEnum } from "../constants/ColorsEnum";
import { TextEnum } from "../constants/TextEnum";

const ModalUtil = (props: {
  children: ReactElement;
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  onClick: CallableFunction;
  title: string;
  icon: ReactElement;
  buttonText: string;
}) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={TextEnum.H6_SIZE}>{props.title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{props.children}</ModalBody>

        <ModalFooter gap={4}>
          <OutlineButtonCom
            text={"Close"}
            customClickColor={ColorsEnum.LIGHTEST_PURPLE}
            customContentColor={ColorsEnum.GREY}
            onClick={props.onClose}
          />
          <OutlineButtonCom
            text={props.buttonText}
            icon={props.icon}
            onClick={() => props.onClick()}
            customClickColor={ColorsEnum.LIGHTEST_PURPLE}
            customContentColor={ColorsEnum.DARKEST_PURPLE}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUtil;
