import React, { ReactElement } from "react";
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
import { ActionEnum } from "../constants/ActionEnum";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RoutesEnum } from "../constants/RoutesEnum";
import { useSubscriberState } from "/imports/States/SubsribersState";

const ModalUtil = (props: {
  children: ReactElement;
  isOpen: boolean;
  onClose?: VoidFunction;
  onClickAdd?: CallableFunction;
  onClickAddAndSend?: CallableFunction;
  title: string;
  icon: ReactElement;
  buttonText: string;
  actionType?: ActionEnum;
}) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose!}>
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
          {props.actionType != ActionEnum.DETAIL ? (
            <OutlineButtonCom
              text={props.buttonText}
              icon={props.icon}
              onClick={() => props.onClickAdd!()}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.DARKEST_PURPLE}
            />
          ) : (
            <></>
          )}

          {props.actionType == ActionEnum.ADD &&
          window.location.pathname == RoutesEnum.CAMPAIGN ? (
            <OutlineButtonCom
              text="ADD AND SEND"
              icon={<FaArrowAltCircleRight />}
              onClick={() => props.onClickAddAndSend!()}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.DARKEST_PURPLE}
            />
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUtil;
