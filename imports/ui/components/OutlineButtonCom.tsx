import React, { ReactElement } from "react";

import { Button, Text } from "@chakra-ui/react";
import { useUtilState } from "/imports/States/UtilState";

const OutlineButtonCom = (props: {
  text?: string;
  icon?: ReactElement;
  customContentColor: string;
  customClickColor?: string;
  isLoading?: boolean;
  onClick?: VoidFunction;
}) => {
  const progressBar = useUtilState((state: any) => state.progressBar);

  return (
    <Button
      disabled={progressBar}
      isLoading={props.isLoading}
      borderColor={props.customContentColor}
      fontWeight={"bold"}
      border={"1px"}
      borderRadius={5}
      color={props.customContentColor}
      onClick={() => props.onClick!()}
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
    </Button>
  );
};

export default OutlineButtonCom;
