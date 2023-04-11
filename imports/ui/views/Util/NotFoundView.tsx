import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { ColorsEnum } from "../../constants/ColorsEnum";

export const NotFoundView = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
      <Text fontSize={50} color={ColorsEnum.DARKEST_PURPLE}>
        404 Not Found
      </Text>
    </Flex>
  );
};
