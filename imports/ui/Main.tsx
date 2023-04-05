import React from "react";

import { Body } from "./layouts/Body";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import { Flex } from "@chakra-ui/react";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

const Main = (props: any) => {
  const { children, ...style } = props;

  return (
    <Flex flexDirection={"column"}>
      <Flex>
        <Navbar />
      </Flex>
      <Flex width={"100%"}>
        <Sidebar />
        <Body {...style}>{children}</Body>
      </Flex>
    </Flex>
  );
};

export default Main;
