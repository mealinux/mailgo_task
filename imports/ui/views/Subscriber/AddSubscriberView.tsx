import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import { FaPlus } from "react-icons/fa";
import { TextEnum } from "../../constants/TextEnum";
import { Meteor } from "meteor/meteor";
import SubscriberModel from "/imports/models/SubscriberModel";

const AddSubscriberView = (props: {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}) => {
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");

  const toast = useToast();

  const handleAddSubscriber = () => {
    const subscriber: SubscriberModel = { name, last_name, email };

    Meteor.call("add-subscriber", subscriber, (err: any, res: any) => {
      if (err) {
        console.log(err);

        toast({
          title: "Oops!",
          description: err.reason,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        props.onClose();
      }
    });
  };

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
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              placeholder="Last Name"
              size="md"
              htmlSize={30}
              mb={4}
              width={"auto"}
              bg={ColorsEnum.WHITE}
              onChange={(event) => setLast_name(event.target.value)}
            />
            <Input
              placeholder="E-Mail"
              size="md"
              htmlSize={30}
              width={"auto"}
              bg={ColorsEnum.WHITE}
              onChange={(event) => setEmail(event.target.value)}
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
            onClick={() => handleAddSubscriber()}
            customClickColor={ColorsEnum.LIGHTEST_PURPLE}
            customContentColor={ColorsEnum.DARKEST_PURPLE}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSubscriberView;
function toast(arg0: {
  title: string;
  description: any;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
