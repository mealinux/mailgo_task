import React, { useState } from "react";
import { Flex, Input, useToast } from "@chakra-ui/react";
import { ColorsEnum } from "../../constants/ColorsEnum";

import { Meteor } from "meteor/meteor";
import SubscriberModel from "/imports/models/SubscriberModel";
import ModalUtil from "../../utils/ModalUtil";

const AddSubscriberView = (props: {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  setSubscribeData: any;
  handleChangeDataTable: VoidFunction;
}) => {
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");

  const toast = useToast();

  const handleAddSubscriber = () => {
    const subscriber: SubscriberModel = { name, last_name, email };

    Meteor.call("add-subscriber", subscriber, (err: Meteor.Error, res: any) => {
      if (err) {
        toast({
          title: "Oops!",
          description: err.reason,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        props.handleChangeDataTable();
        props.onClose();
      }
    });
  };

  return (
    <ModalUtil
      onClick={() => handleAddSubscriber()}
      title={"Add New Category"}
      isOpen={props.isOpen}
      onClose={() => {
        console.log(55555);
        props.onClose();
      }}
      onOpen={props.onOpen}
    >
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
    </ModalUtil>
  );
};

export default AddSubscriberView;
