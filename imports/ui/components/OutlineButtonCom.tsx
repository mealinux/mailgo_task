import React, { ReactElement } from "react";

import { Box, Text } from "@chakra-ui/react";

const OutlineButtonCom = (props: {
  text?: string;
  icon?: ReactElement;
  customContentColor: string;
  customClickColor?: string;
  onClickForOpen?: any;
}) => {
  return (
    <Box
      as="button"
      borderColor={props.customContentColor}
      fontWeight={"bold"}
      border={"1px"}
      borderRadius={5}
      color={props.customContentColor}
      onClick={props.onClickForOpen}
      _active={{
        backgroundColor: props.customClickColor,
      }}
      padding={"15px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      h={5}
    >
      {props.icon}
      <Text ml={props.text ? 1 : 0}> {props.text}</Text>
    </Box>
  );
};

export default OutlineButtonCom;
