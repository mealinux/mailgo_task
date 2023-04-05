import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { ColorsEnum } from "../constants/ColorsEnum";
import { TextEnum } from "../constants/TextEnum";

import { FaRegEnvelope } from "react-icons/fa";

const Navbar = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      bg={ColorsEnum.WHITE}
      padding={"20px 40px 20px 0"}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        textColor={ColorsEnum.DARKEST_PURPLE}
        width={"15%"}
      >
        <FaRegEnvelope style={{ fontSize: "30px" }} />
        <Text ml={1} fontSize={TextEnum.LARGE_SIZE}>
          mailGo
        </Text>
      </Flex>
      <Flex width={"85%"} justifyContent={"space-between"}>
        <Flex>
          <Text fontSize={TextEnum.H4_SIZE}>Dasboard</Text>
        </Flex>
        <Flex>Wednesday, 17 May 2021</Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
