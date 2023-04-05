import React from "react";
import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import { FaPlus } from "react-icons/fa";
import { TextEnum } from "../../constants/TextEnum";

const AddSubscriberView = (props: {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={TextEnum.H6_SIZE}>Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection={"column"}>
            <Input
              placeholder="First Name"
              size="md"
              htmlSize={30}
              mb={4}
              width={"auto"}
              bg={ColorsEnum.WHITE}
            />
            <Input
              placeholder="Last Name"
              size="md"
              htmlSize={30}
              mb={4}
              width={"auto"}
              bg={ColorsEnum.WHITE}
            />
            <Input
              placeholder="E-Mail"
              size="md"
              htmlSize={30}
              width={"auto"}
              bg={ColorsEnum.WHITE}
            />
          </Flex>
        </ModalBody>

        <ModalFooter gap={4}>
          <OutlineButtonCom
            text={"Close"}
            customClickColor={ColorsEnum.LIGHTEST_PURPLE}
            customContentColor={ColorsEnum.GREY}
            onClickForOpen={props.onClose}
          />
          <OutlineButtonCom
            text={"Add"}
            icon={<FaPlus />}
            customClickColor={ColorsEnum.LIGHTEST_PURPLE}
            customContentColor={ColorsEnum.DARKEST_PURPLE}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSubscriberView;
