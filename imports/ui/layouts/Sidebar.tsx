import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ColorsEnum } from "../constants/ColorsEnum";

import {
  FaAlignJustify,
  FaUser,
  FaBuromobelexperte,
  FaTable,
} from "react-icons/fa";
import { TextEnum } from "../constants/TextEnum";

const Sidebar = () => {
  return (
    <Box bg={ColorsEnum.WHITE} width={"15%"}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Flex
          flexDirection={"column"}
          justifyItems={"start"}
          alignItems={"start"}
          gap={2}
        >
          <Button
            isActive
            textColor={ColorsEnum.GREY}
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
            padding={3}
            borderRadius={30}
            width={130}
          >
            <Flex justifyContent={"start"} alignItems={"start"}>
              <FaAlignJustify fontSize={TextEnum.MEDIUM_SIZE} />
              <Text ml={2} fontSize={TextEnum.TINY_SIZE} fontWeight={"light"}>
                Dashboard
              </Text>
            </Flex>
          </Button>
          <Button
            as="button"
            textColor={ColorsEnum.GREY}
            _hover={{
              textColor: ColorsEnum.DARKEST_PURPLE,
            }}
            _active={{
              bg: ColorsEnum.LIGHT_PURPLE,
              textColor: ColorsEnum.MEDIUM_PURPLE,
            }}
            _focus={{
              textColor: ColorsEnum.DARKEST_PURPLE,
              bg: ColorsEnum.WHITE,
            }}
            padding={3}
            borderRadius={30}
            width={130}
          >
            <Flex justifyContent={"start"} alignItems={"start"}>
              <FaUser fontSize={TextEnum.MEDIUM_SIZE} />
              <Text ml={2} fontSize={TextEnum.TINY_SIZE} fontWeight={"light"}>
                Subscribers
              </Text>
            </Flex>
          </Button>
          <Button
            as="button"
            textColor={ColorsEnum.GREY}
            _hover={{
              textColor: ColorsEnum.DARKEST_PURPLE,
            }}
            _active={{
              bg: ColorsEnum.LIGHT_PURPLE,
              textColor: ColorsEnum.MEDIUM_PURPLE,
            }}
            _focus={{
              textColor: ColorsEnum.DARKEST_PURPLE,
              bg: ColorsEnum.WHITE,
            }}
            padding={3}
            borderRadius={30}
            width={130}
          >
            <Flex justifyContent={"start"} alignItems={"start"}>
              <FaBuromobelexperte fontSize={TextEnum.MEDIUM_SIZE} />
              <Text ml={2} fontSize={TextEnum.TINY_SIZE} fontWeight={"light"}>
                Categories
              </Text>
            </Flex>
          </Button>
          <Button
            as="button"
            textColor={ColorsEnum.GREY}
            _hover={{
              textColor: ColorsEnum.DARKEST_PURPLE,
            }}
            _active={{
              bg: ColorsEnum.LIGHT_PURPLE,
              textColor: ColorsEnum.MEDIUM_PURPLE,
            }}
            _focus={{
              textColor: ColorsEnum.DARKEST_PURPLE,
              bg: ColorsEnum.WHITE,
            }}
            padding={3}
            borderRadius={30}
            width={130}
          >
            <Flex justifyContent={"start"} alignItems={"start"}>
              <FaTable fontSize={TextEnum.MEDIUM_SIZE} />
              <Text ml={2} fontSize={TextEnum.TINY_SIZE} fontWeight={"light"}>
                Campaigns
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
