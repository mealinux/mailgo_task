import React from "react";

import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ColorsEnum } from "../constants/ColorsEnum";
import { TextEnum } from "../constants/TextEnum";

import { FaRegEnvelope, FaRegCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";
import { RoutesEnum } from "../constants/RoutesEnum";

const Navbar = (props: { title: string }) => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    Meteor.logout((error) => {
      if (error) {
        console.log(error.message);
      } else {
        navigate(RoutesEnum.LOGIN);
      }
    });
  };

  const getDateString = () => {
    var today = new Date();

    const dateDayString =
      today.toLocaleDateString("en-US", {
        weekday: "long",
      }) +
      ", " +
      today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

    return dateDayString;
  };

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
          <Text fontSize={TextEnum.H4_SIZE}>{props.title}</Text>
        </Flex>
        <Flex>
          <Menu>
            <MenuButton w={200}>
              <Flex alignItems={"center"}>
                <FaRegCalendarAlt /> <Text ml={1}>{getDateString()}</Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem as="button" onClick={() => logoutHandle()}>
                <FaSignOutAlt />
                <Text ml={1}> Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
