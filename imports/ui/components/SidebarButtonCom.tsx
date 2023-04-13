import React, { ReactElement } from "react";

import { Button, Flex, Text } from "@chakra-ui/react";
import { ColorsEnum } from "../constants/ColorsEnum";
import { TextEnum } from "../constants/TextEnum";

const SidebarButtonCom = (props: {
  text?: string;
  icon?: ReactElement;
  isActive: boolean;
  onClick?: VoidFunction;
}) => {
  return (
    <Button
      isActive={props.isActive}
      textColor={ColorsEnum.GREY}
      bg={ColorsEnum.WHITE}
      _hover={{
        textColor: ColorsEnum.DARKEST_PURPLE,
      }}
      _active={{
        bg: ColorsEnum.LIGHTEST_PURPLE,
        textColor: ColorsEnum.DARKEST_PURPLE,
      }}
      _focus={{
        textColor: ColorsEnum.DARKEST_PURPLE,
        bg: ColorsEnum.WHITE,
      }}
      onClick={() => props.onClick!()}
      padding={3}
      borderRadius={30}
      width={130}
      display={"flex"}
      justifyContent={"start"}
    >
      <Flex justifyContent={"start"} alignItems={"start"}>
        {props.icon}
        <Text ml={2} fontSize={TextEnum.TINY_SIZE} fontWeight={"light"}>
          {props.text}
        </Text>
      </Flex>
    </Button>
  );
};

export default SidebarButtonCom;
