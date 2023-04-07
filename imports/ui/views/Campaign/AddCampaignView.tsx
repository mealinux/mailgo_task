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
  Textarea,
} from "@chakra-ui/react";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import { FaPlus } from "react-icons/fa";
import { TextEnum } from "../../constants/TextEnum";

const AddCampaignView = (props: {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={TextEnum.H6_SIZE}>Add New Campaign</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection={"column"}>
            <Input
              placeholder="Name"
              size="md"
              htmlSize={30}
              mb={4}
              width={"auto"}
              bg={ColorsEnum.WHITE}
            />
            <Input
              placeholder="Target"
              size="md"
              htmlSize={30}
              mb={4}
              width={"auto"}
              bg={ColorsEnum.WHITE}
            />
            <Textarea
              placeholder="Description"
              size="md"
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
            onClick={props.onClose}
          />
          <OutlineButtonCom
            text={"Add"}
            icon={<FaPlus />}
            onClick={props.onClose}
            customClickColor={ColorsEnum.LIGHTEST_PURPLE}
            customContentColor={ColorsEnum.DARKEST_PURPLE}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCampaignView;
